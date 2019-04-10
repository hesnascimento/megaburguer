const { expect } = require('chai');
const IngredientesServices = require('../../src/services/IngredientesService');

const ingredientes = [
  {
    id: 'alface',
    nome: 'Alface',
    preco: 0.4,
  },
  {
    id: 'bacon',
    nome: 'Bacon',
    preco: 2,
  },
  {
    id: 'hamburguer',
    nome: 'Hambúrguer de carne',
    preco: 3,
  },
  {
    id: 'ovo',
    nome: 'Ovo',
    preco: 0.8,
  },
  {
    id: 'queijo',
    nome: 'Queijo',
    preco: 1.5,
  },
];

// let lanches = [];

// before(() => {
//   lanches = [
//     {
//       id: 'xbacon',
//       lanche: 'X-Bacon',
//       ingredientes: [
//         'bacon',
//         'hamburguer',
//         'queijo',
//       ],
//     },
//     {
//       id: 'xburguer',
//       lanche: 'X-Burguer',
//       ingredientes: [
//         'hamburguer',
//         'queijo',
//       ],
//     },
//     {
//       id: 'xegg',
//       lanche: 'X-Egg',
//       ingredientes: [
//         'ovo',
//         'hamburguer',
//         'queijo',
//       ],
//     },
//     {
//       id: 'xeggbacon',
//       lanche: 'X-Egg Bacon',
//       ingredientes: [
//         'ovo',
//         'bacon',
//         'hamburguer',
//         'queijo',
//       ],
//     },
//   ];
// });

describe('IngredientesServices Class', () => {
  const ingredientesService = new IngredientesServices(ingredientes);

  it('should thow error if constructor param is not an array', () => {
    expect(() => new IngredientesServices('teste')).to.throw();
  });

  describe('constructor', () => {
    it('should be instance of IngredientesService', () => {
      expect(ingredientesService).to.be.instanceOf(IngredientesServices);
    });

    it('should have ingredientes', () => {
      expect(ingredientesService.ingredientes).to.have.lengthOf(5);
    });
  });

  describe('getIngredienteById', () => {
    it('should return ovo element', () => {
      const ingrediente = ingredientesService.getIngredienteById('ovo');
      expect(ingrediente.nome).to.be.equal('Ovo');
    });

    it('should return undefined because id doesnt exists', () => {
      const ingrediente = ingredientesService.getIngredienteById('macarrao');
      expect(ingrediente).to.be.an('undefined');
    });

    it('should return undefined because parameter is not a string', () => {
      const ingrediente = ingredientesService.getIngredienteById({ id: 'ovo' });
      expect(ingrediente).to.be.an('undefined');
    });
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const todosIngredientes = ingredientesService.getAll();
      expect(todosIngredientes).to.be.an('array');
    });
  });
});
