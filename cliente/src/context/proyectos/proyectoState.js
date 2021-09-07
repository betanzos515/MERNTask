import { useReducer } from "react";
import { proyectoContext } from "./proyectoContex";
import proyectoReducer from "./proyectoReducer";
import {
  AGREGAR_PROYECTO,
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL, 
  ELIMINAR_PROYECTO
} from "../../types";
import { v4 as uuidv4 } from "uuid";

export const ProyectoState = (props) => {
  const proyectos = [
    { id: 1, nombre: "Tienda Virtual" },
    { id: 2, nombre: "Intranet" },
    { id: 3, nombre: "Diseño de Sitio Web" },
    { id: 4, nombre: "Plataforma Educativa" },
  ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario : false,
    proyecto : null
  };

  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos,
    });
  };

  const agregarProyecto = (proyecto) => {
    proyecto.id = uuidv4();
    //Insertamos el proyecto
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto,
    });
  };
  const mostrarError = () =>{
      dispatch({
          type: VALIDAR_FORMULARIO
      })
  }
  const proyectoActual = proyecto =>{
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyecto 
    })
  }

  const eliminarProyecto = proyecto =>{
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload:proyecto
    })
  }
  return (
    <proyectoContext.Provider
      value={{
        proyectos : state.proyectos,
        proyecto : state.proyecto,
        formulario : state.formulario,
        errorFormulario : state.errorFormulario,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};
