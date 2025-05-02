const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  preguntaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta', required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, default: Date.now }
});

const Respuesta = mongoose.model('Respuesta', respuestaSchema);

module.exports = Respuesta;
