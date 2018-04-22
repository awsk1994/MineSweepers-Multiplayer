'use strict';
var Sequelize = require('sequelize');

// const db = new Sequelize('mysql://root:asdfasdf@localhost/sys', {
//   logging: false
// });

const db = new Sequelize('mysql://awsk1994:testing123!@den1.mysql5.gear.host:3306/awsk1994', {
  logging: false
})
module.exports = db;