'use strict';
const db = require('../db/db');
const Sequelize = require('sequelize');

const Player = db.define('Player', {
  username: { type: Sequelize.STRING, allowNull: false },
  flags: { type: Sequelize.INTEGER, defaultValue: -1 },
  bombs: { type: Sequelize.INTEGER, defaultValue: -1 },
  winTime: { type: Sequelize.DATE },
  isPlayer: { type: Sequelize.BOOLEAN, defaultValue: true },
  isReady: { type: Sequelize.BOOLEAN, defaultValue: false},
  socketId: { type: Sequelize.STRING }
});

module.exports = Player;