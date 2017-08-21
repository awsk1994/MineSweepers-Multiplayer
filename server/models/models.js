// Get Table
const Player = require('./player');
const Room = require('./room');
const Score = require('./score');

//// Create Associations
Player.belongsTo(Room);
Room.hasMany(Player);

db = {'Player': Player,
      'Score': Score,
      'Room': Room
     };

module.exports = db;