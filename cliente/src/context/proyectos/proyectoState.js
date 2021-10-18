import { useReducer } from "react";
import { proyectoContext } from "./proyectoContex";
import proyectoReducer from "./proyectoReducer";
import clienteAxios from '../../config/axios';
import {
  AGREGAR_PROYECTO,
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL, 
  ELIMINAR_PROYECTO
} from "../../types";

export const ProyectoState = (props) => {
  
  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario : false,
    proyecto : null,
    mensaje:null
  };

  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = async () => {
    try{
      const proyectos = await clienteAxios.get('/api/proyectos')
      dispatch({
         type: OBTENER_PROYECTOS,
         payload: proyectos.data,
      });
    }catch(error){
      console.log(error);
    }
  };

  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post('/api/proyectos',proyecto);
      dispatch({
        type:AGREGAR_PROYECTO,
        payload: resultado.data
      })
    } catch (error) {
      console.log(error);
    }
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

  const eliminarProyecto = async proyecto =>{
    try{
      await clienteAxios.delete(`/api/proyectos/${proyecto._id}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload:proyecto
      })
    }catch(error){
      console.log('Hubo un error');
      const alerta = {
        msg: 'Hubo un error',
        categoria:'alerta-error'
      }
      dispatch({
        type:PROYECTO_ERROR,
        payload:alerta
      })
    }
  }
  return (
    <proyectoContext.Provider
      value={{
        proyectos : state.proyectos,
        proyecto : state.proyecto,
        formulario : state.formulario,
        errorFormulario : state.errorFormulario,
        mensaje: state.mensaje,
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
