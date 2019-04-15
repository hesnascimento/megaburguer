const express = require('express');
const monrgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const IngredientesRoutes = require('./routes/IngredientesRoutes');
const LanchesRoutes = require('./routes/LanchesRoutes');

const app = express();

// Configura CORS

const permitidos = process.env.CORS_LIST.split(',');
const opcoesCors = {
  origin: (origem, callback) => {
    if (permitidos.indexOf(origem) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado no CORS'));
    }
  },
};

app.use(cors(opcoesCors));

// Aceita application/json
app.use(bodyParser.json());

// Define os logs no formato COMBINED
app.use(monrgan('combined'));

// Bindando as Rotas
app.use('/api/ingredientes', IngredientesRoutes);
app.use('/api/lanches', LanchesRoutes);


module.exports = app;
