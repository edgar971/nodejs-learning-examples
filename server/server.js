var http = require('http');

function handleRequest(req,resp) {
    resp.writeHead(200,{'Content-Type':'text/plain'});
    console.log("New Connection");
    resp.end("Hello World");
}

var server = http.createServer(handleRequest);

server.listen(3000,'localhost');