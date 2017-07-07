var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var clientNum = 0;

/*
socket.emit('message', 'check this');   // send to particular client
io.emit('message', 'check this');   // send to all listeners
socket.broadcast.to('chatroom').emit('message', 'this is the message to all');  // send to a room.
*/
io.on('connection', function (socket) {
    console.log('a user connected.');
//    socket.on('createClient', function(){
//        clientNum++;
//    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    
    // Global Chat
    socket.on('globalChat', function (username, message) {
        console.log("globalChat message Received: username: " + username + ", msg: " + message);
        io.emit('globalChat', {'username': username, 'message': message});
    });
    
    // Send Highscore
    socket.on('sendHighscore', function (name, time) {
        console.log('sendHighscore msg received. name: ' + name + ', time: ' + time);
        // todo: store in db.
    });
    
    /* MULTIPLAYER */
    // socket.io('getRooms', 'difficulty');
    // socket.io('startGame'). generate board -> send back boardData... 
    // updateGame(flags, gameData)
    // restartGame(status)
    // agreeRestartGame(status)
    // finishGame(status)
    
    
    //
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});