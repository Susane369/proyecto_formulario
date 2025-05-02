const mongoose = require('mongoose');

const formularioSchema = new mongoose.Schema({
  tipoFormulario: { type: String, required: true },  // Ejemplo: "queja", "sugerencia"
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },  // Relación con usuario
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

// Crea el modelo
const Formulario = mongoose.model('Formulario', formularioSchema);

module.exports = Formulario;
