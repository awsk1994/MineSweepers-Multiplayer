var express = require('express');
var router = express.Router();
var Score = require('../models/score');

router.get('/', function (req, res) {
    console.log("get /");
    res.sendFile(__dirname + '/index.html');
});

router.get('/highscore', function(req, res, next){
    Score.find({'difficulty': 0}).exec(function(err, easyScores){
        if(err){
            return res.status(500).json({
                error: 'An error has occured.',
                detail: err
            });
        }
        
        Score.find({'difficulty': 1}).exec(function(err, mediumScores){
            if(err){
                return res.status(500).json({
                    error: 'An error has occured.',
                    detail: err
                });
            };
            
            Score.find({'difficulty': 2}).exec(function(err, hardScores){
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

module.exports = router;