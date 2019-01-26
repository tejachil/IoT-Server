var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var exec = require('child_process').exec;

http.listen(4001); //listen to port 8080

function handler (req, res) { //create server

  fs.readFile('../html/servo-slider.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var servoPosition = 0; //static variable for current status
  socket.on('position', function(data) { //get light switch status from client
    servoPosition = data;
    if (servoPosition) {
      console.log(servoPosition); //turn LED on or off, for now we will just show it in console.log
      exec('gpio -g pwm 18 '+ servoPosition);
    }
  });
});