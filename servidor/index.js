//1.-importamos
const express = require('express');

//5.- importamos la configuracion
const conectarDB = require('./config/db');

//2.-usamos la funcion de express para nuestro servidor app
const app = express()

//importamos cors
const cors = require('cors');

//6.- conectamos a la base de datos
conectarDB();

//habilitamos cors
app.use(cors());

//8.- habilitar express.json este nos permite leer datos enviados por post (tiene que ir antes para que reconosca la decodificacion de la url). es una alternativa a body parse
app.use(express.json({ extended: true }));

//7.- importamos rutas en express ah estos se le conocen como meddlaware
app.use('/api/usuarios',require('./routes/usuarios')); 
app.use('/api/auth',require('./routes/auth')); 
app.use('/api/proyectos',require('./routes/proyectos')); 
app.use('/api/proyectos/?id',require('./routes/proyectos')); 
app.use('/api/tareas/',require('./routes/tareas')); 

//2,-configuramos el puerto dependiendo si está en despliegue o en local
const port = process.env.port || 4000;

//3.-funcion de arranque de nuestro servidor
app.listen(port,'0.0.0.0',()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})

