const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//crear una tarea nueva
exports.crearTarea = async (req,res)=>{
    
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores : errores.array() })
    }

    //Extraer el proyecto y comprobar si existe
    try {

        const { proyecto } = req.body;
        const isProyecto = await Proyecto.findById(proyecto);
        if(!isProyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(isProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json( { msg: 'No autorizado' } );
        }

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        
    }

}