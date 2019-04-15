const { Router } = require('express');
const LanchesController = require('../controllers/LanchesController');

const router = Router();

router.get('/', LanchesController.listAll);

module.exports = router;
