//required npm packets
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var pg = require('pg');

var app = express();

app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

