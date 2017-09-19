const sequelize = require('../config/database');
const Sequelize = require('sequelize');

let Player = sequelize.define('Player', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  screen_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [0, 255]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      len: [0, 255]
    }
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [0, 255]
    }
  }
},
{
  tableName: 'players',
  timestamps: false
})

/**
 * Updates self only according to specified params
 * @param {Object} updateParams 
 * @return {Promise<Player|Error>} 
 */
Player.prototype.updateSelf = function(updateParams) {
  return this.update({
    email: updateParams.email || this.email,
    full_name: updateParams.full_name || this.full_name
  })
}

module.exports = Player;