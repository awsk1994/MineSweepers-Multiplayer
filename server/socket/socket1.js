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
    console.log('>>> a user connected. (socketId: ' + socket.id + ', clientsConnected: ' + clientsConnected + ')');

    socket.on('disconnect', function () {
      clientsConnected--;
      console.log('<<< a user disconnected (socketId: ' + socket.id + ', clientsConnected: ' + clientsConnected + ')');
      
      // Find player by socketId
      Player.findOne({'socketId': socket.id}, function(err, player){
        if(err || player==null){
          console.log("Error: cannot find player");
          return;
        }
                
        // Find room by Id retrieved from player
        Room.findById(player.roomId, function(err, room){
          if(err || room==null){
            console.log("Error: cannot find room.");
            return;
          }
                    
          // Remove player from room.
          var playerIdxToRemove = -1;
          for(var i=0;i<room.players.length;i++){
            if(room.players[i].socketId == socket.id){
              playerIdxToRemove = i;
              break;
            }  
          }
          if(playerIdxToRemove != -1){
            room.players.splice(playerIdxToRemove, 1);
          } else {
            console.log("Error: Cannot find player to remove from this room.");
            return;
          }
          
          // save/update room
          room.save(function(err, savedRoom){
            if(err){
              console.log("Error: cannot save room");
              return;
            }
            io.to(room.id).emit('playersUpdate', savedRoom.players);

            Player.remove({'socketId': socket.id}, function(err, result){
              if(err){
                console.log("Error: Failed to delete player.");
                return;
              }
              console.log("Disconnect in socket - remove player: DONE");
            });
          })
        });
      })
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
      //Create player
      var newPlayer = new Player({
        username: nickname,
        socketId: socket.id,
        roomId: roomId
      });

      //Save player
      newPlayer.save(function (err, createdPlayer) {
        if (err) {
          console.log('An error has occured while saving the player.');
          return;
        }

        // Find room by id.
        Room.findById(roomId, function(err, room){
          if(room == null || err){
            console.log('An error has occured while getting room by id.');
          };

//          // Add player to players list if not already there.
//          var playerIsUnique = true;
//          for(var i=0;i<room.players.length;i++){        
//            if(room.players[i].username == createdPlayer.username){
//              playerIsUnique = false;
//            }
//          }
          //if(playerIsUnique){
            room.players.push(createdPlayer.toJSON());
          //}

          // Save Room
          room.save(function(err, updatedRoom){
            if(err){
              console.log('An error has occured while updating the room.');
            };

            console.log('Joined room successfully!');
            socket.join(roomId);
            io.to(roomId).emit('playersUpdate', room.players);
          });
        });
      });
      
      //      
//      Room.findById(roomId, function(err, room){
//        if(room == null || err){
//          console.log("Room cannot be found");
//          return;
//        };
//        socket.join(roomId);
//        io.to(roomId).emit('playersUpdate', room.players);
//      });
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
      console.log(nickname + " is leaving " + roomId + " on socket id: " + socket.id);
      
      //Find Room
      Room.findById(roomId, function(err, room){
        if(room == null || err){
          console.log("Error: Room cannot be found");
          return;
        };

        // Find index of player that needs to be removed.
        var playerIdxToRemove = -1;
        for(var i=0;i<room.players.length;i++){        
          if(room.players[i].socketId == socket.id){
            playerIdxToRemove = i;
            break;
          }
        }        
        if(playerIdxToRemove != -1){
          room.players.splice(playerIdxToRemove, 1);
        } else {
          console.log("Error: Cannot find player to remove from this room.");
          return;
        }

        // Save room
        room.save(function(err, savedRoom){
          if(savedRoom == null || err){
            console.log("Error: room cannot be saved with updated players list.");
            return;
          };
          
          //remove player from db
          Player.remove({'socketId': socket.id}, function(err, res){
            if(err){
              console.log("Error: Failed to remove player with socket id: " + socket.id);
              return;
            }
            // Leave the room (socket level) and send playersUpdate socket msg to room
            socket.leave(roomId);
            io.to(roomId).emit('playersUpdate', savedRoom.players);
          })
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