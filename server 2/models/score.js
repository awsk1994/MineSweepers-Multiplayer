'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define('Score', {
    difficulty: { type: Sequelize.INTEGER, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false },
    timeTaken: { type: Sequelize.INTEGER, allowNull: false }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Score;
};