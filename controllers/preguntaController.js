const Pregunta = require('../models/pregunta');

// Crear una nueva pregunta
exports.crearPregunta = async (req, res) => {
  try {
    const { texto, tipoRespuesta, formularioId, opciones } = req.body;
    const nuevaPregunta = new Pregunta({ texto, tipoRespuesta, formularioId, opciones });
    await nuevaPregunta.save();
    res.status(201).json({ message: 'Pregunta creada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la pregunta', error: err });
  }
};
