'use strict';
const db = require('../db/db');
const Sequelize = require('sequelize');

const Score = db.define('Score', {
  difficulty: { type: Sequelize.INTEGER, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false },
  timeTaken: { type: Sequelize.INTEGER, allowNull: false }
});

module.exports = Score;