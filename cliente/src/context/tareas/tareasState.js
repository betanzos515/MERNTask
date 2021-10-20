 import { useReducer } from 'react';
import { tareaContext } from '../../context/tareas/tareaContext';
import { 
    ACTUALIZAR_TAREA,
    AGREGAR_TAREA, 
    ELIMINAR_TAREA, 
    LIMPIAR_TAREA, 
    OBTENER_TAREAS, 
    SELECCIONAR_TAREA, 
    VALIDAR_TAREA 
} from '../../types';
import tareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

export const TareaState = (props)=>{

    const initialState = {
        tareasproyecto: [],
        errorTarea : false,
        tareaSeleccionada : null,
    }
    //extraemos el reducer y el dispatch para poder hacer uso de las funciones
    const [ state, dispatch ] = useReducer(tareaReducer,initialState);

    //obtener las tareas de un pr,oyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas/',{ params: { proyecto } });
            dispatch({
                type: OBTENER_TAREAS,
                payload: resultado.data.tareas
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    const agregarTarea = async tarea =>{
        try {
            await clienteAxios.post('/api/tareas',tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload:tarea,
                errorTarea:false,
            });   
        } catch (error) {
            console.log(error.response);
        }
    }

    const validarTarea = ()=>{
        dispatch({
            type : VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (tarea, proyecto)=>{
        try {
            await clienteAxios.delete(`/api/tareas/${tarea}`,{ params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    // const modificarEstado = (tarea)=>{
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload : tarea
    //     })
    // }

    const seleccionarTarea = (tarea)=>{
        dispatch({
            type: SELECCIONAR_TAREA,
            payload: tarea
        })
    }

    const actualizarTarea = async tarea =>{
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error.response) ;
        }
    }

    const limpiarTarea = ()=>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (

        <tareaContext.Provider
            value={{
                tareasproyecto : state.tareasproyecto,
                errorTarea : state.errorTarea,
                tareaSeleccionada:state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                //modificarEstado,
                seleccionarTarea,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}