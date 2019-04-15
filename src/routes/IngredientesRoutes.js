const { Router } = require('express');
const IngredientesController = require('../controllers/IngredientesController');

const router = Router();

router.get('/', IngredientesController.listAll);

module.exports = router;
