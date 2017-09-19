const sequelize = require('../config/database');
const Sequelize = require('sequelize');

let Game = sequelize.define('Game', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
},
{
  tableName: 'games',
  timestamps: false
});

module.exports = Game;