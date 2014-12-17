

var repl = require('repl');
var db = require('./models');

var newRepl = repl.start("node console>");
newRepl.context.db = db;