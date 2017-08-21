//var app = require('express')();
/* Module Dependencies */
var app = require('./app');

// Create HTTP server.
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var socket = require('./socket/socket1.js')(io);

var appRoutes = require('./routes/appRoutes')(io);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

server.listen(3000, function () {
    console.log('listening on *:3000');
});