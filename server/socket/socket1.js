/*
socket.emit('message', 'check this');   // send to particular client
io.emit('message', 'check this');   // send to all listeners
socket.broadcast.to('chatroom').emit('message', 'this is the message to all');  // send to a room.
*/

var Room = require('../models/room');

/* responses:
 - globalChat
 - roomsUpdate
*/

exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected.');

        socket.on('disconnect', function () {
            console.log('a user disconnected');
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
        socket.on('createRoom', function (data) {
            var room = new Room({
                difficulty: data.difficulty,
                people_in_it: 0,
                created_by: data.created_by,
                room_name: data.room_name
            });
            room.save(function (err, result) {
                if (err) {
                    console.log("Error has occured on socket message, createRoom");
                    return;
                }
                io.emit('roomsNew', 'Created Room Successfully. : ' + result);
            });
        });

        // Get Rooms
        socket.on('getRooms', function (difficulty) {
            console.log("get rooms: " + difficulty);
            Room.find({'difficulty': difficulty}).exec(function (err, rooms) {
                if (err) {
                    console.log("Error has occured on socket message, getRooms");
                    return;
                }
                io.emit('roomsUpdate', rooms);
            })
        });

        // Update Game
        socket.on('updateGame', function (data) {
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