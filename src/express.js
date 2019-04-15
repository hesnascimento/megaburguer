const express = require('express');
const monrgan = require('morgan');
const bodyParser = require('body-parser');

const IngredientesRoutes = require('./routes/IngredientesRoutes');
const LanchesRoutes = require('./routes/LanchesRoutes');

const app = express();

// Aceita application/json
app.use(bodyParser.json());

// Define os logs no formato COMBINED
app.use(monrgan('combined'));

// Bindando as Rotas
app.use('/api/ingredientes', IngredientesRoutes);
app.use('/api/lanches', LanchesRoutes);


module.exports = app;
