/*
socket.emit('message', 'check this');   // send to particular client
io.emit('message', 'check this');   // send to all listeners
socket.broadcast.to('chatroom').emit('message', 'this is the message to all');  // send to a room.
*/



/* responses:
 - globalChat
 - roomsUpdate
*/
var rooms = [];

exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected.');

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        // Global Chat
        socket.on('globalChat', function (username, message) {
            //console.log("globalChat message Received: username: " + username + ", msg: " + message);
            io.emit('globalChat', {
                'username': username,
                'message': message
            });
        });
        
        // Create Room
        socket.on('createRoom', function(roomName, difficulty){
            console.log("createRoom | roomName: " + roomName + ", difficulty: " + difficulty);
            var id = 123;
            var room = {'id': id, 'name': roomName, 'difficulty': difficulty};
            rooms.push(room);
            // todo: add room in db, and fetch room
            io.emit('roomsUpdate', rooms);
        });
        
        // Get Rooms
        socket.on('getRooms', function(difficulty){
            console.log("getRoom | difficulty: " + difficulty);
            // todo: fetch rooms from db.
            socket.emit('roomsUpdate', rooms);
        });
        
        // Update Game
        socket.on('updateGame', function(data){
            console.log("updateGame | data: " + data);
            // todo. 
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
}