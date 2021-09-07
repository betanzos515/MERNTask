import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, LIMPIAR_TAREA, OBTENER_TAREAS, SELECCIONAR_TAREA, VALIDAR_TAREA } from "../../types";

export default ( state, action )=>{
    switch(action.type){
        case OBTENER_TAREAS:
            return{
                ...state,
                tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload.id)
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tareas:[action.payload,...state.tareas],
                errorTarea:false
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                errorTarea:true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareas: state.tareas.filter( tarea => tarea.id !== action.payload.id )
            }
        case ACTUALIZAR_TAREA:
        case ESTADO_TAREA: 
            return{
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea),
            }
        case SELECCIONAR_TAREA:
            return{
                ...state,
                tareaSeleccionada : action.payload
            }
        case LIMPIAR_TAREA:
            return{
                ...state,
                tareaSeleccionada: null
            }
        default:
            return state;
    }
}