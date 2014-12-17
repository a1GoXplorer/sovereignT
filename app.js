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

//serves all the files in our public folder
// app.use(express.static(_dirname + "/public"));


//root route
app.get('/', function (req, res) {
  res.render('site/home');
});

// app.post('site/results' function (req, res) {
//   request('http://api.worldbank.org/countries/br/indicators/NY.GDP.MKTP.PP.CD?format=JSON', function(err, resp, body) {
//     var dataPP = JSON.parse(body)[1];
//     res.render('site/results', {comparisonList: data});
//   });


// }) ;

// app.post('/results', function (req, res) {
//   console.log(req.body);
//   res.redirect('/results');
// });

//makes request to worldbank, parses, renders to results page
var countryHash = {
  brazil: 'br',
  Brazil: 'br',
  russia: 'ru',
  Russia: 'ru',
};

app.get('/results', function (req, res) {
  var countries = req.query;
  var home = countryHash[countries['countryHome'].name];
  var target = countryHash[countries['countryTarget'].name];
  var addISO2 = function(x) {
    return 'http://api.worldbank.org/countries/' + x + '/indicators/NY.GDP.MKTP.PP.CD?format=JSON';
  };
  console.log('HOME: ', home);
  console.log('TARGET: ', target);
  var data = [];
  request(addISO2(home), function(err,resp,body) {
    data[0] = JSON.parse(body)[1];
    request(addISO2(target), function(err, resp, body){
      data[1] = JSON.parse(body)[1];
      console.log('DATA[0]: ', data[0]);
      console.log('DATA[1]: ', data[1]);
      res.render('site/results', {comparisonHome: data[0], comparisonTarget: data[1]});
    })
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

app.post('/login', function(req, res){
  console.log(req.body);
  res.redirect('/');
});

//signup route
app.get('/signup', function (req, res) {
    res.render('site/signup');
});

app.post('/signup', function (req, res) {
    console.log(req.body);
    res.redirect('/');
})

//user_profile route
app.get('/user_profile', function (req, res) {
  res.render('site/user_profile');
});

//posts new user information    
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




// checks to if server is listening to requests
 app.listen(3000, function () {
   console.log(new Array('*').join());
   console.log("Listening");
 });
