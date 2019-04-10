const fs = require('fs');

class IngredientesService {
  /**
   * Inicializa o serviço com os ingrediente passados por parâmetro
   *
   * @param {Array} ingredientes
   */
  constructor(ingredientes) {
    if (!ingredientes) {
      const fileContent = fs.readFileSync('data/ingredientes.json');
      this.ingredientes = JSON.parse(fileContent);
      this.formFile = true;
    } else {
      if (!Array.isArray(ingredientes)) throw Error('Os ingredientes devem ser um array de ingredientes');
      this.ingredientes = ingredientes;
      this.formFile = false;
    }

    this.getIngredienteById = this.getIngredienteById.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  /**
   * Retorna o ingrediente dado o ID
   * @param {string} id
   * @returns {Object}
   */
  getIngredienteById(id) {
    if (typeof id !== 'string') throw Error('O id deve ser uma string');
    return this.ingredientes.find(ingrediente => ingrediente.id === id);
  }

  /**
   * Retorna todos os ingredientes
   * @returns {Array}
   */
  getAll() {
    return this.ingredientes;
  }
}

module.exports = IngredientesService;
