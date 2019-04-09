const { expect } = require('chai');
const IngredientesServices = require('../../src/services/IngredientesService');

let ingredientes = [];
let lanches = [];

before = () => {
    ingredientes = [
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

    lanches = [
        {
            id: 'xbacon',
            lanche: 'X-Bacon',
            ingredientes: [
                'bacon',
                'hamburguer',
                'queijo',
            ],
        },
        {
            id: 'xburguer',
            lanche: 'X-Burguer',
            ingredientes: [
                'hamburguer',
                'queijo',
            ],
        },
        {
            id: 'xegg',
            lanche: 'X-Egg',
            ingredientes: [
                'ovo',
                'hamburguer',
                'queijo',
            ],
        },
        {
            id: 'xeggbacon',
            lanche: 'X-Egg Bacon',
            ingredientes: [
                'ovo',
                'bacon',
                'hamburguer',
                'queijo',
            ],
        },
    ]
}

describe('IngredientesServices Class', () => {
    const ingredientesService = new IngredientesServices(ingredientes);
    const badIngredientesService = new IngredientesServices('teste');

    describe('constructor', () => {
        it('should be instance of IngredientesService', () => {
            expect(ingredientesService).to.be.instanceOf(IngredientesServices);
        });

        it('should be null', () => {
            expect(badIngredientesService).to.be.null();
        })
    });

    describe('getIngredienteById', () => {
        it('should return ovo element', () => {
            const ingrediente = ingredientesService.getIngredienteById('ovo');
            expect(ingrediente.nome).to.be.equal('Ovo');
        });

        it('should return undefined', () => {
            const ingrediente = ingredientesService.getIngredienteById('macarrao');
            expect(ingrediente.nome).to.be.undefined();
        });
    });

    describe('getAll', () => {
        it('should return an array', () => {
            const todosIngredientes = ingredientesService.getAll();
            expect(todosIngredientes).to.be.an('array');
        });
    });

});