
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var u = require('./routes/u');
var http = require('http');
var path = require('path');
var fs=require('fs');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

rulesDir = __dirname+ '/rules';
dataDir = __dirname+ '/data';
app.set('dataDir', path.join(__dirname, 'data'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
var video = require('./routes/video');
app.get('/video', video.build);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var data = require('./public/javascript/data');
data.saveData();
setTimeout(data.saveData,30*60*1000);