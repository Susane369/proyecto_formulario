const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController');

// Ruta para crear una nueva pregunta
router.post('/preguntas', preguntaController.crearPregunta);

module.exports = router;
