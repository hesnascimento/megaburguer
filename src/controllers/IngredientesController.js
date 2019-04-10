const IngredientesService = require('../services/IngredientesService');

function listAll(req, res) {
  const service = new IngredientesService();

  res.json(service.getAll());
}

module.exports = {
  listAll,
};
