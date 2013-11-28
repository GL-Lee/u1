
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
var data={};
data.video = JSON.parse(fs.readFileSync('video.json', 'utf8'));

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/video', function(req, res){
  res.render("video",data.video);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

http.get("http://www.youku.com", function(res) {
  console.log("Got response: " + res.statusCode);
    var st = fs.open("test.txt","w",0644); 
    res.on('data', function (chunk) {
		    fs.write(st,chunk,0,'utf8',function(e){
		        if(e) throw e;
		        // fs.closeSync(fd);
		    })
  }).on('end', function(){
  	if(st){
  		fs.closeSync(st);
  	}
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});