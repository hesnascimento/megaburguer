class IngredientesService {
    constructor(ingredientes) {
        if (!Array.isArray(ingredientes)) return null;
        this.ingredientes = ingredientes;
    }

    getIngredienteById(id) {
        if (typeof id !== 'sting') return undefined;

        // this.ingredientes.
        return { nome: 'Ovo' };
    }

    getAll() {
        return [];
    }
};

module.exports = IngredientesService;
