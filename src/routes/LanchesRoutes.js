const { Router } = require('express');
const LanchesController = require('../controllers/LanchesController');

const router = Router();

router.get('/', LanchesController.listarTodos);
router.post('/', LanchesController.processaLanche);

module.exports = router;
