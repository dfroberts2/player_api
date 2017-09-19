const {Match, Player, Game} = require('../models');

module.exports = (app) => {
  app.post('/matches', (req, res) => {
    let {body} = req;

    if (!body.game) {
      res.status(400).json({message: 'Game id or name was not submitted'});
    } else {
      let criteria = typeof body.game == 'string' ? {name: body.game} : {id: body.game};

      Game.findOne({where: criteria})
      .then(game => {
        if (game) {
          Match.create({
            game_id: game.id,
          })
          .then(match => {
            res.status(201).json({message: 'Successfully created match', match: match})
          });
        } else {
          res.status(404).json({message: `Could not find game with id or name ${body.game}`})
        }
      });
    }
  });

  app.put('/matches/:id', (req, res) => {
    let {body} = req;
    let {id} = req.params;

    Match.findById(id)
    .then(match => {
      if (!match) {
        res.status(404).json({message: `Could not find specified match with id ${id}`});
      } else {
        match.updateSelf(body).then(match => {
          res.status(200).json({message: 'Successfully updated match', match: match});
        })
        .catch(e => {
          switch (e.name) {
            case "SequelizeValidationError":
              res.status(400).json({error: `Validation failed for: ${e.errors.map(err => err.path).join(', ')}`});
              break;
            case "SequelizeUniqueConstraintError":
              res.status(422).json({error: "Duplicate match exists"});
          }
        });;
      }
    });
  });

  app.put('/matches/:id/players', (req, res) => {
    let {id} = req.params;
    let {player_ids} = req.body
    let match = Match.findById(id);

    //Sequelize escapes replacements, so SQL injection is not a risk here
    let players = Player.findAll({where: {id: {in: player_ids || []}}});

    Promise.all([players, match])
    .then(([players, match]) => {
      if (!match) {
        res.status(404).json({message: `Could not find specified match with id ${id}`})
      } else {
        let setPlayers = match.setPlayers(players)
        .then(() => {
          res.status(201).json({message: 'Successfully updated match.', match: match})
        });
      }
    });
  });
}