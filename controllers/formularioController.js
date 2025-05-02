const Formulario = require('../models/formulario');

// Crear un nuevo formulario
exports.crearFormulario = async (req, res) => {
  try {
    const { tipoFormulario, usuarioId, mensaje } = req.body;
    const nuevoFormulario = new Formulario({ tipoFormulario, usuarioId, mensaje });
    await nuevoFormulario.save();
    res.status(201).json({ message: 'Formulario creado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el formulario', error: err });
  }
};
