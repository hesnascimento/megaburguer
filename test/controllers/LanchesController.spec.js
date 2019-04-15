const sinon = require('sinon');
require('sinon-mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/express');

const IngredientesModel = require('../../src/models/Ingredientes');
const LanchesModel = require('../../src/models/Lanches');

const { expect } = chai;
chai.use(chaiHttp);

const mockFindAllIngredientes = [
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

const mockFindLanches = [
  {
    id: 'xeggbacon',
    lanche: 'X-Egg Bacon',
    ingredientes: [
      'hamburguer',
      'queijo',
      'ovo',
      'bacon',
    ],
  },
];

describe('Testing LanchesController Methods', () => {
  describe('listarTodos specs', () => {
    afterEach(() => {
      IngredientesModel.find.restore();
      LanchesModel.find.restore();
    });

    it('should return list of elements', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .resolves(mockFindAllIngredientes);

      sinon.mock(LanchesModel)
        .expects('find')
        .withArgs({})
        .resolves(mockFindLanches);

      chai.request(app)
        .get('/api/lanches')
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).be.a('array');
          done();
        });
    });

    it('should return database error + status 500', (done) => {
      sinon.mock(LanchesModel)
        .expects('find')
        .withArgs({})
        .rejects({ error: 'Fake Error' });

      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .rejects({ error: 'Fake Error' });

      chai.request(app)
        .get('/api/lanches')
        .end((err, res) => {
          expect(res).have.status(500);
          done();
        });
    });
  });

  describe('processarLanches specs', () => {
    afterEach(() => {
      IngredientesModel.find.restore();
    });

    it('should return valorFinal of "5.30" for X-Egg', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .resolves(mockFindAllIngredientes);

      chai.request(app)
        .post('/api/lanches')
        .send({
          id: 'xegg',
          ingredientes: [
            'hamburguer',
            'ovo',
            'queijo',
          ],
        })
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).have.property('valorFinal').equal('5.30');
          done();
        });
    });

    it('should return status 500', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .rejects({ error: 'Fake Error' });

      chai.request(app)
        .post('/api/lanches')
        .send({
          id: 'xegg',
          ingredientes: [
            'hamburguer',
            'ovo',
            'queijo',
          ],
        })
        .end((err, res) => {
          expect(res).have.status(500);
          done();
        });
    });

    it('should return "Muito Queijo" promo and the value of 6.80', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .resolves(mockFindAllIngredientes);

      chai.request(app)
        .post('/api/lanches')
        .send({
          id: 'xegg',
          ingredientes: [
            'hamburguer',
            'ovo',
            'queijo',
            'queijo',
            'queijo',
          ],
        })
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).have.property('muitoQueijo').equal(1);
          expect(res.body).have.property('valorFinal').equal('6.80');
          done();
        });
    });

    it('should return "Muita Carne" promo and the value of 8.30', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .resolves(mockFindAllIngredientes);

      chai.request(app)
        .post('/api/lanches')
        .send({
          id: 'xegg',
          ingredientes: [
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'ovo',
            'queijo',
          ],
        })
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).have.property('muitaCarne').equal(1);
          expect(res.body).have.property('valorFinal').equal('8.30');
          done();
        });
    });

    it('should return "Light" promo and the value of 5,49', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .resolves(mockFindAllIngredientes);

      chai.request(app)
        .post('/api/lanches')
        .send({
          id: 'xegg',
          ingredientes: [
            'hamburguer',
            'ovo',
            'queijo',
            'alface',
          ],
        })
        .end((err, res) => {
          expect(res).have.status(200);
          // eslint-disable-next-line no-unused-expressions
          expect(res.body).have.property('isLight').to.be.true;
          expect(res.body).have.property('valorFinal').equal('5.13');
          done();
        });
    });

    it('should return OMG this is A burguer!?!?! the value of 57.50', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .resolves(mockFindAllIngredientes);

      chai.request(app)
        .post('/api/lanches')
        .send({
          id: 'xegg',
          ingredientes: [
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'bacon',
            'bacon',
            'bacon',
            'bacon',
            'bacon',
            'ovo',
            'ovo',
            'ovo',
            'ovo',
            'ovo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
          ],
        })
        .end((err, res) => {
          expect(res).have.status(200);
          expect(res.body).have.property('valorFinal').equal('57.50');
          done();
        });
    });

    it('should return OMG this is A Light burguer!?!?! the value of 43.11', (done) => {
      sinon.mock(IngredientesModel)
        .expects('find')
        .withArgs({})
        .resolves(mockFindAllIngredientes);

      chai.request(app)
        .post('/api/lanches')
        .send({
          id: 'xegg',
          ingredientes: [
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'hamburguer',
            'ovo',
            'ovo',
            'ovo',
            'ovo',
            'ovo',
            'alface',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
            'queijo',
          ],
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(res.body).have.property('isLight').to.be.true;
          expect(res).have.status(200);
          expect(res.body).have.property('valorFinal').equal('43.11');
          done();
        });
    });
  });
});
