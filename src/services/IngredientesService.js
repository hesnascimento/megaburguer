class IngredientesService {
  /**
   * Inicializa o serviço com os ingrediente passados por parâmetro
   *
   * @param {Array} ingredientes
   */
  constructor(ingredientes) {
    if (!Array.isArray(ingredientes)) throw Error('Os ingredientes devem ser um array de ingredientes');
    this.ingredientes = ingredientes;

    this.getIngredienteById = this.getIngredienteById.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  /**
   *Retorna o ingrediente dado o ID
   * @param {string} id
   * @returns {Object}
   */
  getIngredienteById(id) {
    if (typeof id !== 'string') return undefined;
    return this.ingredientes.find(ingrediente => ingrediente.id === id);
  }

  getAll() {
    return this.ingredientes;
  }
}

module.exports = IngredientesService;
