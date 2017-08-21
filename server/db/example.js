//var Sequelize = require('sequelize');

//const db = require('./db');
const models = require('../models/models');
const createTable = require('./create_table.js');

var helper = require('./helper_functions.js');


//// Create Player and set the room to 1.
//models.Room.create({
//  'roomName': 'room_2',
//  'difficulty': 0
//});
//
//models.Room.create({
//  'roomName': 'room_3',
//  'difficulty': 0
//});
//
//// Create Player and set the room to 1.
//models.Player.create({
//  'username': 'user_2'
//}).then(player=>{
//  player.setRoom(1);
//});
//
//// Create Player and set the room to 1.
//models.Player.create({
//  'username': 'user_3'
//}).then(player=>{
//  player.setRoom(1);
//});

//models.Room.findAll({
//  attributes: ['roomname'],
//  where: {'id': 1},
//  include: [{model: models.Player}]
//}).then(function(room, err){
//  if(err != null){
//    console.log("ERROR finding room id = 1.");
//  }
//  else if(room.length == 0){
//    console.log("Cannot find room.");
//  } else {
//    helper.displayResults(room);
//  }
//});
//
//models.Player.findOne({
//  where: { id: 0 },
//  include: [{
//    model: models.Room,
//    include: models.Players
//  }]
//}).then(function(player, err){
//  if(err){
//    console.error("ERROR: Error has occured while finding player.");
//    return;
//  }
//  
//  console.log(player.Room)
//  
//});

//models.Room.create({
//  room_name: 'room_1',
//  
//})

//  models.Room.findOne({
//    where: {id: 0 },
//    include: models.Player
//  }).then(function(room, err){
//    // catch error.
//    if(err){
//      console.log('err1');
//    } 
//    if(!room){
//      console.log("err2");
//    }
//    //console.log(room.Players);
//    
//    
//    
//  });


//models.Player.findOrCreate({
//        where: {
//          username: 'user_2',
//          id: 5
//        }
//      }).then(function(player){
//        console.log(player);
//      });



//models.Score.findAll({
//  order: [
//    ['id', 'DESC']
//  ]
//}).then(function(scores, err){
//  if(err != null){
//    console.log("ERROR finding scores.");
//  }
//  else if(scores.length == 0){
//    console.log("Cannot find scores.");
//  } else {
//    helper.displayResults(scores);
//  }
//});
//
//models.Score.findAll({
//  where: {'id': 1}
//}).then(function(score, err){
//  if(err != null){
//    console.log("ERROR finding score id = 1.");
//  }
//  else if(score.length == 0){
//    console.log("Cannot find score.");
//  } else {
//    helper.displayResults(score);
//  }
//});


