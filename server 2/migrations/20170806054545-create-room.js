'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      difficulty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      capacity: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      state: {
        defaultValue: 'default',
        type: Sequelize.ENUM('error', 'default', 'init', 'waiting', 'running', 'gameoverForAll')
      },
      gameStartTime: {
        type: Sequelize.DATE
      },
      readycount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Rooms');
  }
};