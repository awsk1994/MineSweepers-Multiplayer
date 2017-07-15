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
  
  var clientsConnected = 0;
  
  io.on('connection', function (socket) {    
    clientsConnected++;
    console.log('>>> a user connected. (clientsConnected: ' + clientsConnected + ')');

    socket.on('disconnect', function () {
      clientsConnected--;
      console.log('<<< a user disconnected (clientsConnected: ' + clientsConnected + ')');
    });
    
    // Global Chat
    socket.on('globalChat', function (username, message) {
      console.log("globalChat message Received: username: " + username + ", msg: " + message);
      io.emit('globalChat', {
        'username': username,
        'message': message
      });
    });
    
    // Create Room
    socket.on('createRoom', function (data) {
      console.log("createRoom:");
      console.log(data);
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
        io.emit('roomCreatedSuccessfully', result);
      });
    });
    
    // Get Rooms
    socket.on('getRooms', function () {
      Room.find({
        'difficulty': 0
      }).exec(function (err, easyRooms) {
        if (err) {
          console.log("Error has occured on socket message, getRooms");
          return;
        }
        Room.find({
          'difficulty': 1
        }).exec(function (err, mediumRooms) {
          if (err) {
            console.log("Error has occured on socket message, getRooms");
            return;
          }
          Room.find({
            'difficulty': 2
          }).exec(function (err, hardRooms) {
            if (err) {
              console.log("Error has occured on socket message, getRooms");
              return;
            }
            io.emit('roomsUpdate', {
              '0': easyRooms,
              '1': mediumRooms,
              '2': hardRooms
            });
          })
        });
      });
    });
    
    // Join Room. data: {'roomName': BLAH, 'nickname': nickname}
    socket.on('joinRoom', function (nickname, roomname) {
      console.log(nickname + " has joined " + roomname);
      socket.join(roomname);
    });
    
    // Send chat to specific room: {'roomName': BLAH, 'nickname': nickname , 'message': CONTENT }
    socket.on('roomChat', function(username, roomName, message){
      console.log(username + " wants to speak to " + roomName + ": " + message);
      io.to(roomName).emit('roomChat', {'username':username, 'roomName': roomName, 'message': message});
    });
    
    // leave chat: {'roomName': BLAH, 'nickname': nickname}
    socket.on('leaveRoom', function(nickname, roomId){
      console.log(nickname + " is leaving " + roomId);
      io.to(roomId).emit('roomChat', nickname + " is now leaving the room.");
      socket.leave(roomId);
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