/*
socket.emit('message', 'check this');   // send to particular client
io.emit('message', 'check this');   // send to all listeners
socket.broadcast.to('chatroom').emit('message', 'this is the message to all');  // send to a room.
*/
var Room = require('../models/room');
var Player = require('../models/player');
const models = require('../models/models');
var utils = require('../utils.js');

//var gb = utils.createAndAssignGameboard(5, 4);
//console.log(gb);

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
        
        //If player belonged to a room, send playersUpdate to room player belongs to.
        var RoomId = player.RoomId;
        var playerIsReady = player.is_ready;
        
        player.destroy().then(() => {
          console.log("Deleted Player Successfully");
          
          if(RoomId){
            models.Room.findOne({
              where: {'id': RoomId },
              include: models.Player
            }).then((room, err) => {
              if(err){
                console.error("ERROR: Error has occured while finding room by id. (Room Id: " + RoomId + ")");
                return;
              } else if(!room){
                console.error("ERROR: Cannot find room by id (Room Id: " + RoomId + ")");
                return;
              };
                            
              if(playerIsReady){
                room.updateAttributes({
                    ready_count: --room.ready_count
                }).then(()=>{
                    console.log("updated room's ready_count to " + room.ready_count);
                    if(room.ready_count == 0){
                      deleteRoomIfEmpty(room.id, io);
                    }
                });
              }
              
              io.to(RoomId).emit('playersUpdate', room.Players);
            });
          }
        });
      });
    });
    
    // Chat
    socket.on('globalChat', function (username, message) {
      console.log("globalChat message Received: username: " + username + ", msg: " + message);
      io.emit('globalChat', {'username': username, 'message': message});
    });
    
    socket.on('roomChat', function(username, roomName, message){
      console.log(username + " wants to speak to " + roomName + ": " + message);
      io.to(roomName).emit('roomChat', {'username':username, 'roomName': roomName, 'message': message});
    });
    
    // Room
    socket.on('getRooms', function () {
      utils.emitRoomsList(models, io);
    });
    
    socket.on('joinRoom', function (nickname, roomId) {
      joinRoom(nickname, roomId, socket, io);
    });
    
    socket.on('leaveRoom', function(roomId){
      console.log(`LOG: A player sent 'leaveRoom' socket msg`);
      leaveRoom(socket, io);      
    });
    
    socket.on('readyStatus', function(roomId, ready){
      readyStatus(roomId, ready, socket, io);
    });

    socket.on('finishGame', function(isWin, roomId) {
      // Get players in this room.
      // For sender, don't need to send any info.
      // For not-sender, send game status to them.
      finishGame(io, socket, isWin, roomId);
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

function prepareGame(io, room){
  console.log("prepare game");
  setRoomStatusToRunning(room);
  let gameBoard = utils.createAndAssignGameboard(room.difficulty);
  io.to(room.id).emit('prepareGame', gameBoard);
}

function finishGame(io, socket, isWin, roomId){
  console.log("Got message - finish game.")
  // set room status to default
  setRoomStatusToDefault(roomId)
  
  console.log("Emit onFinishGame message")
  io.to(roomId).emit('onFinishGame', isWin);
}

// TODO: combine following 2 methods to one.
function setRoomStatusToRunning(room){
  console.log("update room status to running");
  room.updateAttributes({state: 5}) // state = 'running'
    .then(()=> console.log(`Room (id = ${room.id}) started the game.`));
}

function setRoomStatusToDefault(roomId){
  models.Room.findOne({
    where: { id: roomId }
  }).then((room, err) => {
    console.log("update room status to default");
    if(room != null){
      room.updateAttributes({state: 2}) // state = 'default'
        .then(()=> console.log(`Room (id = ${room.id}) - someone finished the game.`));  
      }
  })
}

function joinRoom(nickname, roomId, socket, io){
  console.log("LOG: " + nickname + " has joined socket chat for " + roomId + ". Socket id: " + socket.id);
    
  models.Player.create({
    "username": nickname,
    "socket_id": socket.id,
    "RoomId": roomId
  }).then((player, err) => {
    if(err){
      console.log("ERROR: cannot create player to join room.");
      return;
    };
    
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
}

function readyStatus(roomId, ready, socket, io){
  console.log("ready status from socket id, " + socket.id);      
      
  models.Player.findOne({
    where: {
      RoomId: roomId,
      socket_id: socket.id
    }
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
    }).then(()=>{
      // Find Room and send socket message update for list of players
      models.Room.findOne({
        where: { id: roomId },
        include: models.Player
      }).then(function(room, err){
        //console.log(room);
        if(err || !room.Players){
          console.error("ERROR");
          return;
        }
        
        io.to(roomId).emit('playersUpdate', room.Players);

        // Update room's ready_count.
        var updatedReadyCount = ready? room.ready_count+1 : room.ready_count-1;
        room.updateAttributes({
            ready_count: updatedReadyCount
        }).then((room, err)=>{
            console.log("updated room's ready_count to " + updatedReadyCount);
            if(updatedReadyCount == 2){  // todo, should change to total players in the room instead of 2 later.
              prepareGame(io, room);
            }
        });
      });
    });
  });
}

function leaveRoom(socket, io){
  console.log("start");
  let roomId = -1;
  models.Player.findOne({
    where: {socket_id: socket.id},
    include: models.Room
  }).then((player, err) => {
    roomId = player.RoomId;
    console.log("player.Room.state:" + player.Room.state);
    if(player.Room.state == 'default'){
      console.log("destroy player");
      player.destroy();

      if(roomId == -1){
        console.error("RoomId == -1");
        return;
      }

      socket.leave(roomId); // socket leave room.
      console.log(`LOG: A player is leaving room id ${roomId} on socket id: ${socket.id}`);
      deleteRoomIfEmpty(roomId, io);
    } else {
      console.log("player not destroyed");
    }
  })
}

function deleteRoomIfEmpty(roomId, io){
  models.Room.findOne({
    where: {
      id: roomId
    },
    include: models.Player
  }).then((room, err) => {
    if(err){
      console.error("ERROR: Error occured while finding room by RoomId (RoomId: " + roomId + ")");
      return;
    } else if(!room){
      console.error("ERROR: Cannot find room (room Id: " + roomId + ")");
      return;
    } else if(!room.Players){
      console.error("ERROR: Room.Players is undefined. (Should be empty if there is none, but not null). (Room Id: " + roomId + ")");
      return;
    }
    // if no players are left in the room, then destroy the room.
    else if(room.Players.length == 0){
      console.log("LOG: There are no more players in the room. Deleting the room. (Room Id: " + roomId + ")");

      models.Room.destroy({ where: { id: roomId }}).then(()=>{
        console.log("Deleted Room Successfully");
        utils.emitRoomsList(models, io);
      });
    }
    // if there are players left, then send playersUpdate.
    else {
      io.to(room.id).emit('playersUpdate', room.Players);
    }
  });
}

function startGame(){
  console.log("start game");
  /*
  // when user clicks on board, start Game.
  startGame() {
    console.log("start game");
    this.state = GameState.RUNNING;
    this.timerService.reset();
    this.timerService.run();
    this.gameboardService.triggerMsgByTitle('clickToStartMsg', false);
  }
  */
}
