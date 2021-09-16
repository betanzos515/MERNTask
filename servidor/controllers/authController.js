const Usuario = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/usuarioController')

exports.autenticarUsuario = async(req, res)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }
    const { email,password } = req.body

    try {
        //Revisar que sea un usuario registrado.
        let usuario = await Usuario.findOne({ email })
        if(!usuario){
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        const passCorrecto = await bcryptjs.compare(password,usuario.password);
        if(!passCorrecto){
            return res.status(400).json({ msg:'Password incorrecto' });
        }

        //si todo es correcto crear y firmar el jwt
        const payload = {
            usuario:{
                id: usuario.id
            }
        }
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600 //el tiempo de expiracion del token
        },(error,token)=>{
            if(error) throw error;

            //mensaje de confirmacion
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
    }
}

