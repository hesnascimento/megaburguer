const sinon = require('sinon');
require('sinon-mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/express');
const IngredientesModel = require('../../src/models/Ingredientes');

const { expect } = chai;
chai.use(chaiHttp);

const mockFindAll = [
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

describe('Testing IngredientesController Methods', () => {
  describe('listAll specs', () => {
    afterEach(() => {
      IngredientesModel.find.restore();
    });

    it('should return list of elements', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .resolves(mockFindAll);

      chai.request(app)
        .get('/api/ingredientes')
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).be.a('array');
          done();
        });
    });

    it('should return database error + status 500', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .rejects({ error: 'Fake Error' });

      chai.request(app)
        .get('/api/ingredientes')
        .end((err, res) => {
          expect(res).have.status(500);
          done();
        });
    });
  });
});
