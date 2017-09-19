const {Player} = require('../models');

module.exports = (app) => {

  app.get('/players', (req, res) => {
    Player.findAll()
    .then(players => {
      res.status(200).json(players)
    })
  })

  app.post('/players', (req, res) => {
    let {body} = req;
    Player.create({
      screen_name: body.screen_name,
      email: body.email,
      full_name: body.full_name
    })
    .then(player => {
      res.status(201).json({message: 'Successfully created player', player: player})
    })
    .catch(e => {
      switch (e.name) {
        case "SequelizeValidationError":
          res.status(400).json({error: `Validation failed for: ${e.errors.map(err => err.path).join(', ')}`});
          break;
        case "SequelizeUniqueConstraintError":
          res.status(422).json({error: "Duplicate player exists"});
      }
    });
  });

  app.put('/players/:id', (req, res) => {
    let {body} = req;
    let {id} = req.params;

    Player.findById(id)
    .then(player => {
      if (!player) {
        res.status(404).json({message: `Could not find specified player with id ${id}`})
      } else {
        player.updateSelf(body)
        .then(player => {
          res.status(200).json({message: 'Successfully updated player', player: player});
        })
        .catch(e => {
          switch (e.name) {
          case "SequelizeValidationError":
            res.status(400).json({error: `Validation failed for: ${e.errors.map(err => err.path).join(', ')}`});
            break;
          case "SequelizeUniqueConstraintError":
            res.status(422).json({error: "Duplicate player exists"});
          }
        });
      }
    });
  });
}