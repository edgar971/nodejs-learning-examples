var http = require('http'),
    express = require('express');

var app = express();

app.get('/', function(req,resp){
    resp.end('Welcome');
});

http.createServer(app).listen(3000);