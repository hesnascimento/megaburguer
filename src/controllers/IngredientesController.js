const { error } = require('console');
const Ingredientes = require('../models/Ingredientes');

function listAll(req, res) {
  Ingredientes.find({})
    .then((ingredientes) => {
      res.json(ingredientes);
    })
    .catch((err) => {
      error('[ERROR - IngredientesController::listAll]', err);
      res.status(500).send();
    });
}

module.exports = {
  listAll,
};
