const Player = require('./Player');
const Match = require('./Match');
const MatchesPlayers = require('./MatchesPlayers');
const Game = require('./Game');

/**
 * Set Model Associations
 */
Player.belongsToMany(Match, {through: 'MatchesPlayers', foreignKey: 'player_id'});
Match.belongsToMany(Player, {through: 'MatchesPlayers', foreignKey: 'match_id'});
Match.belongsTo(Game, {foreignKey: 'game_id'});

module.exports = {
  Player: Player,
  Match: Match,
  Game: Game
}