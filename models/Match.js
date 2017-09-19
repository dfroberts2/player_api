const sequelize = require('../config/database');
const Sequelize = require('sequelize');

let Match = sequelize.define('Match', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  game_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  started: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  },
  ended: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  }
},
{
  tableName: 'matches',
  timestamps: false
});

/**
 * Updates self only according to specified params
 * @param {Object} updateParams 
 * @return {Promise<Match|Error>} 
 */
Match.prototype.updateSelf = function(updateParams) {
  let {started, ended} = updateParams;

  return this.update({
    started: (started && new Date(started)) || this.started,
    ended: (ended && new Date(ended)) || this.ended
  })
}

module.exports = Match;