//exportamos mongoose para poder crear un Esquema o tabla
const mongoose = require('mongoose');

//creamos el Esquema 
const UsuarioSchema = mongoose.Schema({
    nombre:{ 
        type:String,
        required : true,
        trim: true
    },
    email:{
        type:String,
        required : true,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        required : true,
        trim: true,
    },
    registro:{
        type: Date,
        default: Date.now() //establecemos un valor por default
    }
});

//exportamos el esquema
module.exports = mongoose.model('Usuario',UsuarioSchema);