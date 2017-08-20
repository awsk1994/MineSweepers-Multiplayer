var Sequelize = require('sequelize');

const db = require('./db');
const models = require('../models_sequelize/models');
const createTable = require('./createTable');

var helper = require('./helperFunctions.js');


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

models.Room.findAll({
  attributes: ['roomname'],
  where: {'id': 1},
  include: [{model: models.Player}]
}).then(function(room, err){
  if(err != null){
    console.log("ERROR finding room id = 1.");
  }
  else if(room.length == 0){
    console.log("Cannot find room.");
  } else {
    helper.displayResults(room);
  }
});