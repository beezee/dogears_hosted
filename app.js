
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , port = process.env.PORT || 3000
  , dbm = require('./node_modules/dogears_db_mgr/de_dbm');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false })
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.post('/users/new', function(req, res, next) {
  dbm.collection.find({email: req.body.u}).toArray(function(err, results) {
    if (!err && results.length > 0) res.end(JSON.stringify({status: 'Sorry, looks like that email address is already registered.'}));
    else dbm.collection.insert({email: req.body.u, password: req.body.p}, function(err, docs) {
      var response = (err) ? {status: err} : {status: 'success'};
      res.end(JSON.stringify(response));
    });
  });
});

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
