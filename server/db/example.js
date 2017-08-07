var Sequelize = require('sequelize');

const db = require('./db');
const models = require('../models/models');

// Create Player and set the room to 1.
models.Room.create({
  'roomName': 'room_1',
  'difficulty': 0
});

// Create Player and set the room to 1.
models.Player.create({
  'username': 'user_1'
}).then(player=>{
  player.setRoom(1);
});
