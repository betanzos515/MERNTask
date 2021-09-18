const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');
exports.crearProyecto =  async (req,res)=>{
    try {
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores.array() });
        }
        //creamos un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //guardar el creador via JWT
        proyecto.creador = req.usuario.id;
        //guardamos el proyecto
        proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Hubo un error'});
    }
}

//obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req,res)=>{
    try {
        const proyectos = await Proyecto.find({ creador : req.usuario.id }).sort({creado : -1}) //esta instruccion nos trae todos los proyectos que correspondan al usuario autenticado, ordenandolos del mas reciente al mas antiguo.
        res.status(200).json(proyectos)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//actualiza un proyecto
exports.actualizarProyecto = async(req,res)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() })
    }
    //extraemos el nombre del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {}
    
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }
    try {
        //revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        //si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }
        //verificamos al creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
             return res.status(401).json({msg:'No autorizado'});
        }
        //actualizamos el proyecto.
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},{ $set: nuevoProyecto }, { new: true });
        
        res.json({proyecto});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

//eliminar un proyecto
exports.eliminarProyecto = async (req, res)=>{
    
    try {
        //verificamos que el proyecto exista.
        const proyecto = await Proyecto.findById(req.params.id);
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }

        //verificamos permisos
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'});
        }

        await Proyecto.findOneAndRemove({_id : req.params.id});
        res.json({msg:'Proyecto Eliminado'});

    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.log(error);
    }
}