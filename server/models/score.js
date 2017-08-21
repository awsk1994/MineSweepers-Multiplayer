'use strict';
const db = require('../db/db');
const Sequelize = require('sequelize');

const Score = db.define('Score', {
  difficulty: { type: Sequelize.INTEGER, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false },
  time_taken: { type: Sequelize.INTEGER, allowNull: false }
});

module.exports = Score;