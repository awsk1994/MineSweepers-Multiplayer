'use strict';
var Sequelize = require('sequelize');

const db = new Sequelize('mysql://root:asdf123@localhost/sys', {
  logging: false
});
module.exports = db;