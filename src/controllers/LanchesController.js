const { error } = require('console');
const Lanches = require('../models/Lanches');
const Ingredientes = require('../models/Ingredientes');

function listAll(req, res) {
  const promLanches = Lanches.find({});
  const promIngredientes = Ingredientes.find({});

  Promise.all([promLanches, promIngredientes])
    .then((resolver) => {
      const lanches = resolver[0];
      const ingredientes = resolver[1];

      const ret = lanches.map((rLanche) => {
        const lanche = rLanche.toJSON();
        const nIngredientes = lanche.ingredientes
          .map(ingrediente => ingredientes.find(ing => ing.id === ingrediente));

        const valorBase = nIngredientes.map(ing => ing.preco).reduce((pv = 0, cv) => pv + cv);

        return {
          ...lanche,
          ingredientes: nIngredientes,
          valorBase,
        };
      });

      res.json(ret);
    })
    .catch((err) => {
      error('[ERROR LanchesController::getAllLanches]', err);
      res.status(500).send();
    });
}

module.exports = {
  listAll,
};
