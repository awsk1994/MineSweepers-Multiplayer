'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      flags: {
        defaultValue: -1,
        type: Sequelize.INTEGER
      },
      bombs: {
        defaultValue: -1,
        type: Sequelize.INTEGER
      },
      winTime: {
        type: Sequelize.DATE
      },
      isPlayer: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      isReady: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      socketId: {
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
    return queryInterface.dropTable('Players');
  }
};