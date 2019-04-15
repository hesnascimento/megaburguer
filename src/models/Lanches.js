const mongoose = require('mongoose');

const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  lanche: {
    type: String,
    required: true,
  },
  ingredientes: [
    String,
  ],
});

module.exports = mongoose.model('Lanches', schema, 'Lanches');
