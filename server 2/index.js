//var app = require('express')();
/* Module Dependencies */
var app = require('./app');

// Create HTTP server.
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var file1 = require('./socket/socket1.js')(io);


server.listen(3000, function () {
    console.log('listening on *:3000');
});