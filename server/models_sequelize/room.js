'use strict';
const db = require('../db/db');
const Sequelize = require('sequelize');

const Room = db.define('Room', {
  roomName: { type: Sequelize.STRING, allowNull: false },
  difficulty: { type: Sequelize.INTEGER, allowNull: false },
  capacity: { type: Sequelize.INTEGER, defaultValue: 0 },
  state: { type: Sequelize.ENUM('error', 'default', 'init', 'waiting', 'running', 'gameoverForAll'), defaultValue: 'default' },
  gameStartTime: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  readycount: { type: Sequelize.INTEGER, defaultvalue: 0 },
  //createdBy: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Room;