const http = require('http');

const hostname = '0.0.0.0';
const port = 4000;

var exec = require('child_process').exec;
function execute(command){
    exec(command);
};


const server = http.createServer( function(req, res) {
	console.dir(req.param);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end("webcam-control");

	if(req.method === "POST") {
		console.log("POST: " + req.url);
		if((req.url).indexOf('on') > -1)
			execute('motion')
		if((req.url).indexOf('off') > -1)
			execute('killall motion')
	}
	else{
		console.log("GET: " + req.url);
		var body = '';
	}

});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});