/*
socket.emit('message', 'check this');   // send to particular client
io.emit('message', 'check this');   // send to all listeners
socket.broadcast.to('chatroom').emit('message', 'this is the message to all');  // send to a room.
*/
var Room = require('../models/room');
var Player = require('../models/player');

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
    socket.on('joinRoom', function (nickname, roomId) {
      console.log(nickname + " has joined socket chat for " + roomId + ". Socket id: " + socket.id);    
      
      Room.findById(roomId, function(err, room){
        if(room == null || err){
          console.log("Room cannot be found");
          return;
        };
        socket.join(roomId);
        io.to(roomId).emit('playersUpdate', room.players);
      });
    });
    
    // Send chat to specific room: {'roomName': BLAH, 'nickname': nickname , 'message': CONTENT }
    socket.on('roomChat', function(username, roomName, message){
      console.log(username + " wants to speak to " + roomName + ": " + message);
      io.to(roomName).emit('roomChat', {'username':username, 'roomName': roomName, 'message': message});
    });
    
    socket.on('test', function(msg){
      console.log("test: " + msg);
    })
    
    socket.on('leaveRoom', function(nickname, roomId){
      console.log(nickname + " is leaving " + roomId);
      
      //Find Room
      Room.findById(roomId, function(err, room){
        if(room == null || err){
          console.log("Room cannot be found");
          return;
        };

        // Find index of player that needs to be removed.
        var playerIdxToRemove = -1;
        for(var i=0;i<room.players.length;i++){        
          if(room.players[i].username == nickname){
            playerIdxToRemove = i;
          }
        }
        if(playerIdxToRemove != -1){
          room.players.splice(playerIdxToRemove, 1);
        }
        
        // Save room
        room.save(function(err, savedRoom){
          if(savedRoom == null || err){
            console.log("savedRoom cannot be found");
            return;
          };
          
          // Leave the room (socket level) and send playersUpdate socket msg to room
          socket.leave(roomId);
          io.to(roomId).emit('playersUpdate', savedRoom.players);
        });
      });
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