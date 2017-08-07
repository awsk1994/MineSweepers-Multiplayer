//const Sequelize = require('sequelize');

//// Test Connection
//const sequelize = new Sequelize('mysql://root:asdf123@localhost/sys');
//sequelize
//  .authenticate()
//  .then(() => {
//    console.log('Connection has been established successfully.');
//  })
//  .catch(err => {
//    console.error('Unable to connect to the database:', err);
//    connected = true;
//  });

var path = require('path');
console.log("module exports");
module.exports = {
  'config': path.resolve('../', 'config/config.json'),
  'migrations-path': path.resolve('../', 'migrations'),
  'models-path': path.resolve('../', 'models')
}

