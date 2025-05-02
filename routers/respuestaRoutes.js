const express = require('express');
const router = express.Router();
const respuestaController = require('../controllers/respuestaController');

// Ruta para crear una nueva respuesta
router.post('/respuestas', respuestaController.crearRespuesta);

module.exports = router;
