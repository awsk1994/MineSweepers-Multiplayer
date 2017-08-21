/*
socket.emit('message', 'check this');   // send to particular client
io.emit('message', 'check this');   // send to all listeners
socket.broadcast.to('chatroom').emit('message', 'this is the message to all');  // send to a room.
*/
var Room = require('../models/room');
var Player = require('../models/player');
const models = require('../models/models');

/* responses:
 - globalChat
 - roomsUpdate
*/
exports = module.exports = function (io) {
  var clientsConnected = 0;
  io.on('connection', function (socket) {
    clientsConnected++;
    console.log('\t>>> a user connected. (socketId: ' + socket.id + ', clientsConnected: ' + clientsConnected + ')');

    socket.on('disconnect', function () {
      clientsConnected--;
      console.log('\t<<< a user disconnected (socketId: ' + socket.id + ', clientsConnected: ' + clientsConnected + ')');

      // Find player by socketId
      models.Player.findOne({
        where: {'socket_id': socket.id }
      }).then(function(player, err){
        if(err){
          console.error("ERROR: Error has occured while finding player by socket id. (socket_id = " + socket.id + ")");
          return;
        } else if(!player){
          console.log("ERROR: Cannot find player by socket id. (socket_id = " + socket.id + ")");
          return;
        }
        
        player.destroy().then(() => {
          console.log("Deleted Successfully");
        })
      });
    });
    
    socket.on('globalChat', function (username, message) {
      console.log("globalChat message Received: username: " + username + ", msg: " + message);
      io.emit('globalChat', {
        'username': username,
        'message': message
      });
    });
    
    socket.on('roomChat', function(username, roomName, message){
      console.log(username + " wants to speak to " + roomName + ": " + message);
      io.to(roomName).emit('roomChat', {'username':username, 'roomName': roomName, 'message': message});
    });
    
    socket.on('getRooms', function () {
      // Find easy rooms.
      models.Room.findAll({
        where: { difficulty: 0 }
      }).then(function(easyRooms, err){
        if(err){
          console.error("ERROR: Error has occured while getting all rooms with difficulty = 0.")
          return;
        } 
        
        // Find medium rooms.
        models.Room.findAll({
          where: { difficulty: 1 }
        }).then(function(mediumRooms, err){
          if(err){
            console.error("ERROR: Error has occured while getting all rooms with difficulty = 1.")
            return;
          }
          
          // Find hard rooms.
          models.Room.findAll({
            where: { difficulty: 2 }
          }).then(function(hardRooms, err){
            if(err){
              console.error("ERROR: Error has occured while getting all rooms with difficulty = 2.")
              return;
            }

            io.emit('roomsUpdate', {
              '0': easyRooms,
              '1': mediumRooms,
              '2': hardRooms
            });
          });
        });
      });
    });
    
    socket.on('joinRoom', function (nickname, roomId) {
      console.log("LOG: " + nickname + " has joined socket chat for " + roomId + ". Socket id: " + socket.id);
      
      models.Player.findOrCreate({
        where: {
          username: nickname, 
          socket_id: socket.id,
          RoomId: roomId
        }
      }).then(function(player){
        console.log('Joined room successfully!');
        socket.join(roomId);
        
        models.Room.findOne({
          where: { id: roomId },
          include: models.Player
        }).then(function(room, err){
          // catch error.
          if(err || !room){
            console.error("ERROR: cannot find room by id (roomId: " + roomId + ")");
            io.to(roomId).emit('playersUpdate', {});
            return;
          }
          io.to(roomId).emit('playersUpdate', room.Players);
        });
      });
    });
    
    socket.on('leaveRoom', function(nickname, roomId){
      console.log("LOG: " + nickname + " is leaving room id, " + roomId + ", on socket id: " + socket.id);
      
      models.Player.findOne({
        where: {
          username: nickname
        },
        include: models.Room
      }).then(function(player){
        if(!player){
          console.error("ERROR: Cannot find player by username (username = " + nickname + ")");
          return;
        }
        
        // Set player's roomId to null
        player.updateAttributes({
          RoomId: null
        }).then(()=>{
          models.Room.findAll({
            where: {
              id: roomId
            },
            include: models.Player
          }).then((room, err) => {
            if(err){
              console.error("ERROR: Error occured while finding room by RoomId (RoomId: " + roomId + ")");
              return;
            }
            io.to(room.id).emit('playersUpdate', room.Players);
          });
          // Leave the room (socket level) and send playersUpdate socket msg to room
          socket.leave(roomId);
        });
      });
    });
    
    socket.on('readyStatus', function(roomId, ready){
      console.log("ready status from socket id, " + socket.id);      
      
      models.Player.findOne({
        where: {
          RoomId: roomId,
          socket_id: socket.id
        },
        include: models.Room
      }).then(function(player, err){
        if(err){
          console.error("ERROR: Error has occured while finding room. (RoomId: " + roomId + ")");
          return;
        } else if(!player){
          console.error("ERROR: Cannot find player by RoomId and socket_id. (RoomId: " + roomId + ", socket_id: " + socket.id + ")");
          return;
        }
        
        // Update player's is_ready.
        player.updateAttributes({
          is_ready: ready
        });
        
        // Update room's ready_count.
        var updatedRoomCount = ready? player.Room.ready_count++ : player.Room.ready_count--;
        player.Room.updateAttributes({
            ready_count: updatedRoomCount
        }).then(()=>{
          // Find Room and send socket message update for list of players
          models.Room.findOne({
            where: { id: roomId },
            include: models.Player
          }).then(function(room, err){
            if(err || !room.Players){
              console.error("ERROR");
              return;
            }
            io.to(roomId).emit('playersUpdate', room.Players);
          });
        });
      });
    });
    
    // TODO: Update Game
    socket.on('updateGame', function (data) {
      console.log("updateGame | data: " + data);
      // todo. 
    });
    
    // TODO: to be deleted later.
    socket.on('test', function(msg){
      console.log("test: " + msg);
    })
  });
  
  /* MULTIPLAYER */
  // socket.io('getRooms', 'difficulty');
  // socket.io('startGame'). generate board -> send back boardData... 
  // updateGame(flags, gameData)
  // restartGame(status)
  // agreeRestartGame(status)
  // finishGame(status)
  //
}