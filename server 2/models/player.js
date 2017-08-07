'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    username: { type: Sequelize.STRING, allowNull: false },
    flags: { type: Sequelize.INTEGER, defaultValue: -1 },
    bombs: { type: Sequelize.INTEGER, defaultValue: -1 },
    winTime: { type: Sequelize.DATE },
    isPlayer: { type: Sequelize.BOOLEAN, defaultValue: true },
    isReady: { type: Sequelize.BOOLEAN, defaultValue: false},
    socketId: { type: Sequelize.STRING }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Player.belongsTo(models.room, {foreignKey: 'idPlayer'});
      }
    }
  });
  return Player;
};