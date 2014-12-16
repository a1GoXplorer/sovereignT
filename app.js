//required npm packets
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var pg = require('pg');
var request = require('request');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


//root route
app.get('/', function (req, res) {
  res.render('site/home');
});

app.get('/results', function (req, res) {
  request('http://api.worldbank.org/countries/br/indicators/NY.GDP.MKTP.PP.CD?format=JSON', function(err,resp,body) {
    var data = JSON.parse(body)[1];
    res.render('site/results', {comparisonList: data});
    });
});

//about route
app.get('/about', function (req, res) {
  res.render('site/about');
});

//login route
app.get('/login', function (req, res) {
  res.render('site/login');
});

//signup route
app.get('/signup', function (req, res) {
  res.render('site/signup');
});

//user_profile route
app.get('/user-profile', function (req, res) {
  res.render('site/user_profile');
});


// checks to if server is listening to requests
 app.listen(3000, function () {
   console.log(new Array('*').join());
   console.log("Listening");
 });
