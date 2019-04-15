const express = require('express');
const monrgan = require('morgan');

const IngredientesRoutes = require('./routes/IngredientesRoutes');
const LanchesRoutes = require('./routes/LanchesRoutes');

const app = express();

// Define os logs no formato COMBINEDçl~;[]
app.use(monrgan('combined'));

// Bindando as Rotas
app.use('/api/ingredientes', IngredientesRoutes);
app.use('/api/lanches', LanchesRoutes);


module.exports = app;
