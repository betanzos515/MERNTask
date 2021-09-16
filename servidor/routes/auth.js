//rutas para crear autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

//crear un usuario
//api/auth <- endpoint
router.post('/',
    [
        //utilizamos la funcion check y vamos definiendo los campos a validar, cual sera su mensaje de error y que reglas van a aplicar.
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
        //previo a estas validaciones tenemos que importar el validation result en el controlador. 
    ],
    authController.autenticarUsuario
);

module.exports = router;

