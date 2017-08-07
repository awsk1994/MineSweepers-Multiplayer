// Get Table
const Player = require('../models/player');
const Room = require('../models/room');
const Score = require('../models/score');

//// Create Associations
Player.belongsTo(Room);
Room.hasMany(Player);

// Create Table
Room.sync();
Player.sync();
Score.sync();