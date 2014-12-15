//required npm packets
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var pg = require('pg');

var app = express();

app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


// the root route
app.get('/', function (req, res) {
  res.render('home');
});

//the about route
app.get('/about', function (req, res) {
	res.render('about');
});

//the login route
app.get('/login', function (req, res) {
	res.render('login');
});

//the signup route
app.get('/signup', function (req, res) {
	res.render('signup');
});

//checks to if server is listening to requests
app.listen(3000, function () {
  console.log("Listening");
});