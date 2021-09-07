import { useReducer } from 'react';
import { tareaContext } from '../../context/tareas/tareaContext';
import { 
    ACTUALIZAR_TAREA,
    AGREGAR_TAREA, 
    ELIMINAR_TAREA, 
    ESTADO_TAREA, 
    LIMPIAR_TAREA, 
    OBTENER_TAREAS, 
    SELECCIONAR_TAREA, 
    VALIDAR_TAREA 
} from '../../types';
import tareaReducer from './tareaReducer';
import { v4 as uuidv4 } from "uuid";

export const TareaState = (props)=>{

    const initialState = {
        tareas:[
            {id:1 ,nombre:'Elegir Plataforma',estado:true, proyectoId: 1 },
            {id:2 ,nombre:'Elegir Colores',estado:false, proyectoId: 2 },
            {id:3 ,nombre:'Elegir Plataforma de pago',estado:false, proyectoId: 3 },
            {id:4 ,nombre:'Elegir hosting',estado:true, proyectoId: 4 },
            {id:5 ,nombre:'Elegir altura',estado:true, proyectoId: 2 },
            {id:6 ,nombre:'Elegir Colores',estado:false, proyectoId: 4 },
            {id:7 ,nombre:'Elegir Tecnologia',estado:false, proyectoId: 1 },
            {id:8 ,nombre:'Elegir Plataforma de azure',estado:true, proyectoId: 3 },
            {id:9 ,nombre:'Elegir Base de datos',estado:false, proyectoId: 2 },
            {id:10 ,nombre:'Elegir Plataforma ',estado:false, proyectoId: 1 },
            {id:11 ,nombre:'Plataforma elegir',estado:true, proyectoId: 1 },
            {id:12 ,nombre:'Elegir Color',estado:false, proyectoId: 4 },
            {id:13 ,nombre:'Elegir Pasarela',estado:false, proyectoId: 3 },
        ],
        tareasproyecto: null,
        errorTarea : false,
        tareaSeleccionada : null,
    }
    //extraemos el reducer y el dispatch para poder hacer uso de las funciones
    const [ state, dispatch ] = useReducer(tareaReducer,initialState);

    //obtener las tareas de un pr,oyecto
    const obtenerTareas = proyecto => {
        dispatch({
            type: OBTENER_TAREAS,
            payload: proyecto
        });
    }

    const agregarTarea = tarea =>{
        tarea.id = uuidv4();
        dispatch({
            type: AGREGAR_TAREA,
            payload:tarea,
            errorTarea:false,
        });
    }

    const validarTarea = ()=>{
        dispatch({
            type : VALIDAR_TAREA
        })
    }

    const eliminarTarea = (tarea)=>{
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tarea
        })
    }

    const modificarEstado = (tarea)=>{
        dispatch({
            type: ESTADO_TAREA,
            payload : tarea
        })
    }

    const seleccionarTarea = (tarea)=>{
        dispatch({
            type: SELECCIONAR_TAREA,
            payload: tarea
        })
    }

    const actualizarTarea = tarea =>{
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    const limpiarTarea = ()=>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (

        <tareaContext.Provider
            value={{
                tareas : state.tareas,
                tareasproyecto : state.tareasproyecto,
                errorTarea : state.errorTarea,
                tareaSeleccionada:state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                modificarEstado,
                seleccionarTarea,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}