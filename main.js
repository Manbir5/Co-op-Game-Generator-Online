/*
    This is the main page that helps determine which script file should be used on which request or item. Uses express, dbcon for database connection, 
    body parser to parse form data handlebars for HTML templates. This file is always run through node first.
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');


var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });


app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));   // Means that static can be used in place of public.
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/games', require('./games.js'));
app.use('/', require('./index.js'));        // Makes index the home page. 
app.use('/', express.static('public'));


app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express starts on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
