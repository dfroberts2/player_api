const sequelize = require('../config/database');
const Sequelize = require('sequelize');

let MatchesPlayers = sequelize.define('MatchesPlayers', {
  player_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  match_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
  }
},
{
  tableName: 'matches_players',
  timestamps: false
});


module.exports = MatchesPlayers;