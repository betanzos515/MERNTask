const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//registramos una tarea nueva
router.post('/',
    [
        check('nombre','El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    auth,
    tareaController.crearTarea
);

//obtener las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
)

//actualizamos una tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
)

//eliminamos una tarae
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)
module.exports = router;