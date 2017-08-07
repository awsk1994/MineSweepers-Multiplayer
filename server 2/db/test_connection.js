const Sequelize = require('sequelize');

// Or you can simply use a connection uri
const sequelize = new Sequelize('mysql://root:asdf123@localhost/sys');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    module.export.connected = true;
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    module.export.connected = true;
  });
