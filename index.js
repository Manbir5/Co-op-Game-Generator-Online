/* 
This is the router page for /index. It will be accessed whenever a get request is made to /index. This app uses express and handlebars to display it's information. 
*/



module.exports = function(){
    /*  This function will be used whenever a get request is made to /index. It will display the index handlebar. 
*/
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res){
    context = {};
    res.render('index', context);
        });

        
            return router;
}();




