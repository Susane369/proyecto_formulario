const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController');

// Ruta para crear un nuevo formulario
router.post('/formularios', formularioController.crearFormulario);

module.exports = router;
