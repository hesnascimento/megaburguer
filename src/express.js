const express = require('express');
const monrgan = require('morgan');

const IngredientesRoutes = require('./routes/IngredientesRoutes');

const app = express();

// Define os logs no formato COMBINEDçl~;[]
app.use(monrgan('combined'));

// Bindando as Rotas
app.use('/api/ingredientes', IngredientesRoutes);


module.exports = app;
