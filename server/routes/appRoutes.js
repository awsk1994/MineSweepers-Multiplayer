var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

router.post('/sendHighscore', function(req, res, next){
    console.log("send highScore received.");
//    console.log(req.body);
//    // todo: save to db.
//    res.status(201).json({
//        message: 'Score saved'
//    });
});

module.exports = router;