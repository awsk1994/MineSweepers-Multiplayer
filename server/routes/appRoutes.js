var express = require('express');
var router = express.Router();
//var Score = require('../models/score');
//var Room = require ('../models/room');
//var Player = require('../models/player');
const models = require('../models/models');

var returnRouter = function(io){
  router.get('/', function (req, res) {
      console.log("get /");
      res.sendFile(__dirname + '/index.html');
  });

  router.get('/highscore', function(req, res, next){
      models.Score.findAll({
        where: {'difficulty': 0},
        order: [
          ['time_taken', 'ASC']
        ]
      }).then(function(easyScores, err){
        if(err){
            return res.status(500).json({
                error: 'An error has occured.',
                detail: err
            });
        };
        models.Score.findAll({
          where: {'difficulty': 1},
          order: [
            ['time_taken', 'ASC']
          ]
        }).then(function(mediumScores, err){
          if(err){
              return res.status(500).json({
                  error: 'An error has occured.',
                  detail: err
              });
          };
          models.Score.findAll({
            where: {'difficulty': 2},
            order: [
              ['time_taken', 'ASC']
            ]
          }).then(function(hardScores, err){
            if(err){
                return res.status(500).json({
                    error: 'An error has occured.',
                    detail: err
                });
            };
            return res.status(200).json({
                'easy': easyScores,
                'medium': mediumScores,
                'hard': hardScores
            });
          })
        })
      })
  });

  router.post('/highscore', function(req, res, next){
      //console.log(req.body);
      models.Score.create({
          username: req.body.username,
          time_taken: req.body.time_taken,
          difficulty: req.body.difficulty
      }).then((score, err) => {
          if(err){
            console.error("ERROR: Error has occured while creating a score. (username: " + req.body.username + ")");
            return res.status(500).json({
              error: 'An error has occured while creating a score',
              detail: err
            });
          }

          console.log("LOG: Score created. (username: " + score.username + ")");
          res.status(201).json({
            message: 'Score created and saved successfully!',
            detail: score
          });
      });
  });

  router.post('/createRoom', function(req, res, next){
      models.Room.create({
        room_name: req.body.room_name,
        difficulty: req.body.difficulty,
        created_by: req.body.created_by
      }).then((room, err) => {
        if(err){
          console.error("ERROR: Error has occured while creating a room. (Room name: " + req.body.room_name + ")");
          return res.status(500).json({
            error: 'An error has occured while creating a room',
            detail: err
          });
        }

        console.log("LOG: Room created. (room_name: " + room.room_name + ")");
        res.status(201).json({
          message: 'Room created and saved successfully!',
          detail: room
        });
        emitRoomsList();
      });
  });

  router.post('/deleteRooms', function(req, res, next){
      models.Room.destroy({
        where: {}
      }).then(()=>{
        console.log("LOG: Deleted all rooms.");
        res.status(201).json({
          message: 'All rooms are deleted.',
          detail: ''
        });
        emitRoomsList();
      });
  });
 
  // ========= Helper Functions =========
  function emitRoomsList(){
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
  }

  return router;
}

module.exports = returnRouter;