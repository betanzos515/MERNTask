const Usuario = require("../models/Usuarios");
const bcryptjs = require('bcryptjs'); //importames bcryptjs para hashear el password
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async ( req , res )=>{

    //revisamos si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array() })
    }

    //Vamos a hacer una validacion 
    const { email,password } = req.body;

    try{
        //revisamos que el usuario registrado sea unico.
        let usuario = await Usuario.findOne({ email })

        if(usuario){
            return res.status(400).json({ msg:'El usuario ya existe' });
        }

        //guardamos el nuevo usuario
        usuario = new Usuario(req.body);

        //hashear el password
        const salt = await bcryptjs.genSalt(10); //le mandamos el número de digitos que queremos hashear
        usuario.password = await bcryptjs.hash(password,salt);
        
        //guardar usuario 
        await usuario.save();

        //crear y firmar el json web token. consiste en dos partes primero se tiene que crear el jwt y luego se tiene que firmar
        
        const payload ={
            usuario:{
                id: usuario.id
            }
        } //creamos el jwt

        //firmar el jwt
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600//el tiempo de expiracion del token
        },( error, token )=>{
            if(error) throw error;
            
            //mensaje de confirmacion
            res.json({ token });
        });


    }catch(err){
        console.log(err);
        //retornamos un mensaje de error
        console.log(res.status(400).send('Hubo un error'));
    }
}