const mongoose = require('mongoose');

const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Ingredientes', schema, 'Ingredientes');
