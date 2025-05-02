const Respuesta = require('../models/respuesta');

// Crear una nueva respuesta
exports.crearRespuesta = async (req, res) => {
  try {
    const { texto, preguntaId, usuarioId } = req.body;
    const nuevaRespuesta = new Respuesta({ texto, preguntaId, usuarioId });
    await nuevaRespuesta.save();
    res.status(201).json({ message: 'Respuesta creada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la respuesta', error: err });
  }
};
