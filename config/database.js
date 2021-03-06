const Sequelize = require('sequelize');
const {database: config} = require('./application.json');

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
