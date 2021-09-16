/* archivo de configuración para usar mongoose */
const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});

const conectarDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology : true
        });
        console.log('DB Conectada exitosamente...');
    } catch (error) {
        console.log(error);
        process.exit(1)//en caso de un error detenemso la aplicacion.
    }
}

//exportamos la funcion
module.exports = conectarDB;
