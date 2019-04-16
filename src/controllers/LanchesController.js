const { error } = require('console');
const Lanches = require('../models/Lanches');
const Ingredientes = require('../models/Ingredientes');

/**
 * @typedef {Object} ValorLanche
 * @property {Number} valorBase Valor dos lanche sem descontos
 * @property {Number} muitaCarne Quantidade de promoções 'Muita Carne'
 * @property {Number} descontoMuitaCarne Valor do desconto promoções 'Muita Carne'
 * @property {Number} muitoQueijo Quantidade de promoções 'Muito Queijo'
 * @property {Number} descontoMuitoQueijo Valor do desconto promoções 'Muito Queijo'
 * @property {Boolean} isLight Flag para desconto de 10% 'Light'
 * @property {Number} valorFinal Valor do Lanche com todos os descontos aplicados
 */


/**
 * @typedef {Object} Lanche
 * @property {String} id ID do Lanche
 * @property {String} lanche Nome do Lanche
 * @property {Array} ingredientes Ingredientes do lanche
 */


// Cache de Ingredientes
let cacheIngredientes = [];

/**
 * Calcula o número de carnes a serem abatidos do valor total
 * retorna o número de carnes a serem descontado
 *
 * @param {Lanche} lanche
 * @returns {Number}
 */
function promocaoMuitaCarne(lanche) {
  const numCarnes = lanche.ingredientes.filter(v => v === 'hamburguer').length;
  return Math.floor(numCarnes / 3);
}

/**
 * Calcula o número de queijos a serem abatidos do valor total
 * retorna o número de queijos a serem descontado
 *
 * @param {Lanche} lanche
 * @returns {Number}
 */
function promocaoMuitoQueijo(lanche) {
  const numQueijo = lanche.ingredientes.filter(v => v === 'queijo').length;
  return Math.floor(numQueijo / 3);
}

/**
 * Verifica se o lanche possui salada e não possui bacom
 * caso positivo retorna true, caso negativo retorna false
 * @param {Lanche} lanche
 * @returns {Boolean}
 */
function promocaoLight(lanche) {
  const numAlface = lanche.ingredientes.filter(v => v === 'alface').length;
  const numBacon = lanche.ingredientes.filter(v => v === 'bacon').length;

  return (numAlface > 0 && numBacon === 0);
}

/**
 * Calcula os valores de descontos para os lanches
 *
 * @param {Lanche} lanche
 * @returns {ValorLanche}
 */
function calcularValorLanche(lanche) {
  const nIngredientes = lanche.ingredientes
    .map(ingrediente => cacheIngredientes.find(ing => ing.id === ingrediente));
  const valorBase = nIngredientes.map(ing => ing.preco).reduce((pv = 0, cv) => pv + cv);
  const valorCarneUn = cacheIngredientes.find(ing => ing.id === 'hamburguer').preco;
  const valorQueijoUn = cacheIngredientes.find(ing => ing.id === 'queijo').preco;

  const muitoQueijo = promocaoMuitoQueijo(lanche);
  const muitaCarne = promocaoMuitaCarne(lanche);
  const isLight = promocaoLight(lanche);

  const descontoMuitoQueijo = (muitoQueijo * valorQueijoUn);
  const descontoMuitaCarne = (muitaCarne * valorCarneUn);
  const totalDescontos = descontoMuitaCarne + descontoMuitoQueijo;

  let valorFinal = (valorBase - totalDescontos).toFixed(2);

  if (isLight) {
    valorFinal = (valorFinal - (valorFinal * 10 / 100)).toFixed(2);
  }

  return {
    valorBase: valorBase.toFixed(2),
    muitaCarne,
    descontoMuitaCarne,
    muitoQueijo,
    descontoMuitoQueijo,
    valorFinal,
    isLight,
  };
}

/**
 * Gera uma promise para o valor do lanche com os itens vindos do banco de dados
 * @param {Lanche} lanche
 * @returns {Promise<ValorLanche>}
 */
function geraValorLanche(lanche) {
  return new Promise((resolve, reject) => {
    if (cacheIngredientes.length === 0) {
      Ingredientes
        .find({})
        .then((ingredientes) => {
          cacheIngredientes = ingredientes.map((ingrediente) => {
            const ingredienteJson = ingrediente.toJSON ? { ...ingrediente.toJSON() } : ingrediente;
            return ingredienteJson;
          });
          const valorLanche = calcularValorLanche(lanche);
          resolve(valorLanche);
        }).catch((err) => {
          error('[ERROR]', err);
          reject(err);
        });
    } else {
      resolve(calcularValorLanche(lanche));
    }
  });
}

function processaLanche(req, res) {
  const lancheBody = req.body;

  geraValorLanche(lancheBody)
    .then(lanche => res.json(lanche))
    .catch((err) => {
      error('[ERRO LanchesController::processaLanche]', err);
      res.status(500).send();
    });
}


function listarTodos(req, res) {
  Lanches.find({})
    .then((lanches) => {
      const promises = lanches
        .map((lanche) => {
          const lancheJson = lanche.toJSON ? { ...lanche.toJSON() } : lanche;
          return geraValorLanche(lancheJson);
        });

      Promise.all(promises)
        .then((valLanches) => {
          const ret = valLanches
            .map((vl, ix) => {
              const lancheJson = lanches[ix].toJSON ? lanches[ix].toJSON() : lanches[ix];
              return { ...lancheJson, preco: vl.valorFinal };
            });

          res.json(ret);
        }).catch((err) => {
          error('[ERRO LanchesController::listarTodos]', err);
          res.status(500).send();
        });
    })
    .catch((err) => {
      error('[ERRO LanchesController::listarTodos]', err);
      res.status(500).send();
    });
}

module.exports = {
  listarTodos,
  processaLanche,
};
