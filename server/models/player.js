'use strict';
const db = require('../db/db');
const Sequelize = require('sequelize');

const Player = db.define('Player', {
  username: { type: Sequelize.STRING, allowNull: false },
  flags: { type: Sequelize.INTEGER, defaultValue: -1 },
  bombs: { type: Sequelize.INTEGER, defaultValue: -1 },
  win_time: { type: Sequelize.DATE },
  is_player: { type: Sequelize.BOOLEAN, defaultValue: true },
  is_ready: { type: Sequelize.BOOLEAN, defaultValue: false},
  socket_id: { type: Sequelize.STRING },
  RoomId: { type: Sequelize.INTEGER } // TODO: need to rename, but too many dependencies.
});

module.exports = Player;