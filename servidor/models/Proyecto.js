const mongoose = require('mongoose');
//creamos el modelo para los proyectos
const ProyectoSchema = mongoose.Schema({
    //nombre del proyecto
    nombre: {
        type:String,
        required: true,
        trim:true
    },
    //que usuario está creando el proyecto
    creador:{
        type: mongoose.Schema.Types.ObjectId, //con esto le decimos que es un id de un esquema
        ref: 'Usuario' // le decimos que el esquema es el modelo Usuario
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto',ProyectoSchema);