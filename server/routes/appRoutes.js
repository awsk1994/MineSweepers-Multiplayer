var express = require('express');
var router = express.Router();
var Score = require('../models/score');
var Room = require ('../models/room');
var Player = require('../models/player');

router.get('/', function (req, res) {
    console.log("get /");
    res.sendFile(__dirname + '/index.html');
});

router.get('/highscore', function(req, res, next){
    Score.find({'difficulty': 0}).sort('timeTaken').exec(function(err, easyScores){
        if(err){
            return res.status(500).json({
                error: 'An error has occured.',
                detail: err
            });
        }
        
        Score.find({'difficulty': 1}).sort('timeTaken').exec(function(err, mediumScores){
            if(err){
                return res.status(500).json({
                    error: 'An error has occured.',
                    detail: err
                });
            };
            
            Score.find({'difficulty': 2}).sort('timeTaken').exec(function(err, hardScores){
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
            });
            
        });
    });    
});

router.post('/highscore', function(req, res, next){
    //console.log(req.body);
    var score = new Score({
        username: req.body.username,
        timeTaken: req.body.timeTaken,
        difficulty: req.body.difficulty
    });
    score.save(function(err, result){
        if(err){
            return res.status(500).json({
                error: 'An error has occured.',
                detail: err
            });
        }
        res.status(201).json({
            message: 'Score saved successfully!',
            detail: result
        });
    });
});

router.post('/createRoom', function(req, res, next){
    var room = new Room({
        difficulty: req.body.difficulty,
        room_name: req.body.room_name,
        created_by: req.body.created_by
    });
    room.save(function(err, result){
        if(err){
            return res.status(500).json({
                error: 'An error has occured.',
                detail: err
            });
        }
        res.status(201).json({
            message: 'Room created and saved successfully!',
            detail: result
        });
    })
});

router.post('/deleteRooms', function(req, res, next){
    Room.remove(function(err, result){
      if(err){
        return res.status(500).json({
            error: 'An error has occured.',
            detail: err
        });
      }
      res.status(201).json({
          message: 'All Rooms are deleted successfully!',
          detail: result
      });
    })
});

router.post('/joinRoom', function(req, res, next){
  console.log(req.body.nickname + " has joined " + req.body.roomId);
  
  var nickname = req.body.nickname;
  var roomId = req.body.roomId;

  var player = new Player({
    username: nickname
  });
  player.save(function (err, player) {
    if (err) {
      return res.status(500).json({
          error: 'An error has occured while saving the player.',
          detail: err
      });
    }
    Room.findById(roomId, function(err, room){
      if(room == null || err){
        return res.status(500).json({
          error: 'An error has occured while getting room by id.',
          detail: err
        })
      };
      room.players.push(player);
      room.save(function(err, updatedRoom){
        if(err){
          return res.status(500).json({
            error: 'An error has occured while updating the room.',
            detail: err
          });
        };
        console.log(updatedRoom);
        
        var result_hash = [];
        updatedRoom.players.forEach(function(newPlayer){
          var player_hash = {'nickname': newPlayer.username,
                             'isReady': newPlayer.isReady};
          console.log(newPlayer);
          result_hash.push(player_hash);
        });
        
        return res.status(201).json({
          message: 'Joined room successfully!',
          detail: result_hash
        });
      });
    });
  });
});

module.exports = router;