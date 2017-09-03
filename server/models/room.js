'use strict';
const db = require('../db/db');
const Sequelize = require('sequelize');

const Room = db.define('Room', {
  room_name: { type: Sequelize.STRING, allowNull: false },
  difficulty: { type: Sequelize.INTEGER, allowNull: false },
  capacity: { type: Sequelize.INTEGER, defaultValue: 0 },
  state: { type: Sequelize.ENUM('error', 'default', 'init', 'waiting', 'running', 'gameoverForAll'), defaultValue: 'default' },
  game_start_time: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  ready_count: { type: Sequelize.INTEGER, defaultValue: 0 },
  created_by: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Room;