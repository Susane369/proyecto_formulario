const express = require('express')
const app = express();
const userRouter = require('./routers/userRouters')
const morgan =require('morgan');
const userLogin=require('./middlewares/userLogin')
const path=require('path')



app.use(express.json())
app.use(morgan('dev'))
app.use(userLogin)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render('index')
})

// Ruta principal '/'
app.get('/', (req, res) => {
    
    console.log('servidor creado por express')
    // Respuesta al navegador
})

// Usamos el enrutador para manejar rutas relacionadas con usuarios
app.use('/user', userRouter)

// El servidor se ejecuta en el puerto 3000
app.listen(3000, () => {
    console.log('Aplicacion con express ejecutandose en el puerto 3000')
})
