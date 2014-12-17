//required npm packets
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var pg = require('pg');
var request = require('request');
var db = require('./models/');
// var lodash = require ('lodash');
// var bcrypt = require('bcrypt');
// var cookieSession = require('cookie-session');
// var cookieParser = require('cookie-parser');
// var passport = require('passport');
// var passportLocal = require('passport-local');
// var db = require('/.models');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


//root route
app.get('/', function (req, res) {
  res.render('site/home');
});

//makes request to worldbank, parses, renders to results page
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

app.post('/site/user_profile', function(req, res){
  console.log(req.body);
  var user = req.body.user;
  db.user.create({email: user.email,
                  firstName: user.name,
                  password_digest: user.password})
         .then(function(user){  
          res.redirect('/user_profile');
         });
});

app.post('/login', function(req, res){
  console.log(req.body);
  res.redirect('/');
});

//posts new user information
// app.post("/site", function (req, res) {
//   console.log("POST /user_profile");
//   var newUser = req.body.user_profile;
//   console.log("New User:", newUser);
//   db.user.create(newUser.email, newUser.password, newUser.name,
//     function () {
//       res.redirect("site/signup");
//     },
//     function (user) {
//       res.redirect("site/users/" + user.id);
//     }
//   )
// });

// app.post('/site', function (req, res) {
//   db.users.create({
//     email: req.body.user.email,
//     username: req.body.user.name,
//     password_digest: req.body.user.password

//   })
//   .then(function (user) {
//      res.redirect("/site/user_profile/" + user.id);
//    });
// });

//route to something user
// app.get("/users/:id", function (req, res) {
//   var id = req.params.id;
//   db.user.find(id)
//     .then(function (user) {
//       res.render("users/show", {user: user});
//     })
//     .error(function () {
//       res.redirect("/sign_up");
//     })
// });

//user_profile route
app.get('/user_profile', function (req, res) {
  res.render('site/user_profile');
});


// checks to if server is listening to requests
 app.listen(3000, function () {
   console.log(new Array('*').join());
   console.log("Listening");
 });
