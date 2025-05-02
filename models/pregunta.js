const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  tipoRespuesta: { type: String, required: true },  // Puede ser 'texto', 'opciones', etc.
  formularioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Formulario', required: true },  // Relación con un formulario
  opciones: [{ type: String }]  // Solo si tipoRespuesta es 'opciones', guarda las opciones
});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

module.exports = Pregunta;
