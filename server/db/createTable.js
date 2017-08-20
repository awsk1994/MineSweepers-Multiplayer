// Get Table
const Player = require('../models_sequelize/player');
const Room = require('../models_sequelize/room');
const Score = require('../models_sequelize/score');

//// Create Associations
Player.belongsTo(Room);
Room.hasMany(Player);

// Create Table
Room.sync();
Player.sync();
Score.sync();