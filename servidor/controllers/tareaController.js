const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//crear una tarea nueva
exports.crearTarea = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Extraer el proyecto y comprobar si existe
  try {
    const { proyecto } = req.body;
    const isProyecto = await Proyecto.findById(proyecto);
    if (!isProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //revisar si el proyecto actual pertenece al usuario autenticado
    if (isProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.stats(500).json({ msg: "Error en el servidor" });
  }
};

//obtiene las tareas por proyectos
exports.obtenerTareas = async (req, res) => {
  try {
    //extraemos el proyecto
    const { proyecto } = req.query;
    const isProyecto = await Proyecto.findById(proyecto);
    if (!isProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    if (isProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //Obtener las tareas por proyecto.
    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor");
  }
};

//actualizar una tarea
exports.actualizarTarea = async (req, res) => {
  try {
    //extraemos estas variables del body
    const { proyecto, nombre, estado } = req.body;
    //buscamos la tarea para ver si existe
    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }
    //extrar proyecto para asegurarnos quien lo está editando
    const isProyecto = await Proyecto.findById(proyecto);
    if (isProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //creamos un objeto con la nueva información
    const nuevaTarea = {};
    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;
    //guardamos la tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.query;
    //comprobamos que la tarea exista.
    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(401).json({ msg: "No existe esa tarea" });
    }
    const isProyecto = await Proyecto.findById(proyecto);
    if (isProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea Eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor");
  }
};
