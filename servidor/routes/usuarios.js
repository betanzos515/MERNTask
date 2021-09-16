//rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioContoller = require('../controllers/usuarioController');
const { check } = require('express-validator');

//crear un usuario
//api/usuarios <- endpoint

router.post('/',
    [
        //utilizamos la funcion check y vamos definiendo los campos a validar, cual sera su mensaje de error y que reglas van a aplicar.
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
        //previo a estas validaciones tenemos que importar el validation result en el controlador. 
    ],
    usuarioContoller.crearUsuario
);

module.exports = router;

