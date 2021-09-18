const exprees = require('express');
const router = exprees.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
//crea proyectos
//api/proyectos

router.post('/',
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    auth, 
    proyectoController.crearProyecto
);

//obtener todos los proyectos
router.get('/',
    auth, 
    proyectoController.obtenerProyectos
);

//actualizar todos los proyectos por ID
router.put('/:id' ,
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);
module.exports = router;