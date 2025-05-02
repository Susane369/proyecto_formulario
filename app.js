const express = require('express');
const app = express();
const morgan = require('morgan');
const userLogin = require('./middlewares/userLogin');
const path = require('path');
const connection = require('./database/connection');
const mongoose = require('mongoose');

// Conectar a la base de datos MongoDB
mongoose.connect(`mongodb://localhost:27017/mydb1`)
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((err) => console.error('Error en la conexión:', err));

// Modelos de Mongoose
const Formulario = mongoose.model('Formulario', new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
}));

const Pregunta = mongoose.model('Pregunta', new mongoose.Schema({
  texto: { type: String, required: true },
  tipoRespuesta: { type: String, required: true },
  formularioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Formulario', required: true },
  opciones: [{ type: String }]  // Solo si tipoRespuesta es 'opciones', guarda las opciones
}));

const Respuesta = mongoose.model('Respuesta', new mongoose.Schema({
  texto: { type: String, required: true },
  preguntaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta', required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, default: Date.now }
}));

// Middleware y configuraciones
app.use(express.json());
app.use(morgan('dev'));
app.use(userLogin);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rutas
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para crear formularios
app.post('/formularios', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoFormulario = new Formulario({ nombre, descripcion });
    await nuevoFormulario.save();
    res.status(201).json({ message: 'Formulario creado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el formulario', error: err });
  }
});

// Ruta para crear preguntas
app.post('/preguntas', async (req, res) => {
  try {
    const { texto, tipoRespuesta, formularioId, opciones } = req.body;
    const nuevaPregunta = new Pregunta({ texto, tipoRespuesta, formularioId, opciones });
    await nuevaPregunta.save();
    res.status(201).json({ message: 'Pregunta creada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la pregunta', error: err });
  }
});

// Ruta para crear respuestas
app.post('/respuestas', async (req, res) => {
  try {
    const { texto, preguntaId, usuarioId } = req.body;
    const nuevaRespuesta = new Respuesta({ texto, preguntaId, usuarioId });
    await nuevaRespuesta.save();
    res.status(201).json({ message: 'Respuesta creada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la respuesta', error: err });
  }
});

// Usamos el enrutador para manejar rutas relacionadas con usuarios
const userRouter = require('./routers/userRouters');
app.use('/user', userRouter);

// El servidor se ejecuta en el puerto 3000
app.listen(3000, () => {
  console.log('Aplicación con express ejecutándose en el puerto 3000');
});
