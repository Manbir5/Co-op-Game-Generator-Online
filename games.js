/* 
This is the router page for /games. It will be accessed whenever a post request is made to /games. This program uses the req.body elements to make a sql query and then displays the
name of the game that fits the criteria. It also will do input validation and make sure that at least one box was selected for each search criteria. Lastly, it uses the two
microservices to download the image on the wikipedia page associated with the game , resizes it and provides it name to a handlebar. This app uses express and handlebars to
display it's information. 
*/

module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var fs = require('fs');
    const {readLastLinesEnc} = require('read-last-lines-ts');


    function validateInput(req){
        /* This function does input validation. In ensures that at least one box was selected for each search criteria. It returns 0 if a search 
        criteria was left empty. It takes the req as its only parameter.*/
        if (req.body.console == null){
            return 0;
        } else if (req.body.type == null) { 
            return 0;
        } else if (req.body.genre == null)
        {
            return 0;
        }
        else {
            return 1;
        }
            };


    function errorPage(res){
          /* This function renders an error page when called. It takes a res variable as its parameter and uses express and handlebars to 
          generate the page. This is called when no result has been found.*/
        context = {}
        res.render('errorPage', context);
    }


    function writeToImageDownloader(website_url){
        /* This function takes a url as its parameter. It writes the url in the last line of an images.txt file that is associated with the image_downloader microservice.*/
        fs.appendFile("public/images.txt", "\n" + (website_url), (err) => {
            if (err){
                console.log(err);
                res.write(JSON.stringify(error));
                res.end(); 
            };
                });

                    };


    function readLastLineOfImageDownloader(context, complete){
        /*  This function reads the last line of an images.txt file that is associated with the image_downloader microservice. This last line 
        should have the name of latest image file downloaded by this microservice. This program adds the .png extension to the name and does
         a function call for the next step. */
        var last_line = readLastLinesEnc("utf8")("public/images.txt",1);
        last_line_with_ext = last_line + ".png";
        writeToImageTransformer(last_line_with_ext,context, complete);
    };


    function writeToImageTransformer(lines,context, complete){
        /* This function writes the measurements and file name in a single line at the end of a image_transformer .txt file. It does a function call for the next step.*/
        fs.appendFile("public/images/image_transformer_pipe.txt", "\n" + 'IN | 270,380, ' + '"' + lines + '"', (err) => {
            if (err){
                console.log(err);
                res.write(JSON.stringify(error));
                res.end(); 
            }
            setTimeout(readLastLineOfImageDownloaderAndComplete, 1000, context, complete);  
    })
        };


    function readLastLineOfImageDownloaderAndComplete(context, complete){
        /* This function reads the last line of an images_transformer_pipe.txt file that is associated with the image_transformer microservice. This last line
        should have the name of the resized image file that was transformed by this microservice. This program slices out the unnecessary parts of the output and attaches it to
        an object as one of its properties. This object is then set as one of the properties for context. Lastly, it does a function call to complete .*/
        var output = readLastLinesEnc("utf8")("public/images/image_transformer_pipe.txt",1);
        output = output.slice(7);
        output = output.slice(0,-1);
        let obj = new Object();
        obj.url = output;
        final_link = JSON.stringify(obj);
        context.output = output;
        complete();
    }

    function valuesForRetry(req, context){
        /* This function assigns the past request elements to different properties of context. This is to store the values of the 
        request in case the user wants to search again.*/
        context.console_name = req.body.console;
        context.genre_name = req.body.genre;
        context.type_name = req.body.type;
    }

    
    function getGameAndDownloadImage(req, res, mysql, context, complete){
        /* This function creates a mysql statement and runs that query with the database associated with mysql. It gets one row as its result. It then makes 
        function calls to the functions associated with the microservices to download the corresponding image and transform it. It uses setTimeout 
        to deal with a delay in a microservice.*/
        var sql = "SELECT link_for_info, game_title, website FROM ((SELECT game_title, website, id, link_for_info " +
        "FROM ((SELECT link_for_info, game_title, website, id FROM Games INNER JOIN Games_Consoles ON Games_Consoles.con_id " +
        "= Games.id INNER JOIN Consoles ON Consoles.cid = Games_Consoles.con_cid WHERE Consoles.cid = (?)) as console_inquiry) INNER JOIN Games_Genres ON " + 
        "console_inquiry.id = Games_Genres.conn_id INNER JOIN Genres ON Genres.gid = Games_Genres.conn_gid WHERE Genres.gid = (?)) as genre_inquiry) " + 
        "INNER JOIN Games_Types ON Games_Types.conne_id = genre_inquiry.id INNER JOIN Types ON Types.tid = " +
        "Games_Types.conne_tid WHERE Types.tid = (?) ORDER BY RAND() LIMIT 1";
       var inserts = [(req.body.console),(req.body.genre), (req.body.type)];
       mysql.pool.query(sql, inserts, function(error,rows, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            if (rows.length == 0)
            {
                errorPage(res);
            }
            else{
            valuesForRetry(req, context);
            context.red = rows;;
            let website_url = rows[0].website;
            writeToImageDownloader(website_url);
            setTimeout(readLastLineOfImageDownloader, 2000, context, complete); // Need this due to a delay in a microservice.    
            };          
                    });
                
    
                         };
           

    router.post('/', function(req, res){
         /* This function is called whenver a post request is made to /games. It makes function calls to validate the input and to get 
         the requried game and image. It has the definition for the complete function and uses that to render the games handlebar.*/
        check = validateInput(req);
        if (check == 0){
            res.render('error');
        }
        else{
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["transformButtonForRetry.js"];
        var mysql = req.app.get('mysql');
        getGameAndDownloadImage(req, res, mysql, context, complete);
         function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('games', context);
            };

        };   
            };            
                 });


            return router;
}();




