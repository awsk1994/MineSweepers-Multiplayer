'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    roomName: { type: Sequelize.STRING, allowNull: false },
    difficulty: { type: Sequelize.INTEGER, allowNull: false },
    capacity: { type: Sequelize.INTEGER, defaultValue: 0 },
    state: { type: Sequelize.ENUM('error', 'default', 'init', 'waiting', 'running', 'gameoverForAll'), defaultValue: 'default' },
    gameStartTime: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    readycount: { type: Sequelize.INTEGER, defaultvalue: 0 },
    createdBy: { type: Sequelize.STRING, allowNull: false },
    scoreId: { type: Sequelize.INTEGER }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Room.hasMany(models.Player, {as: 'Player', foreignKey: 'idPlayer'});
      }
    }
  });
  return Room;
};