import { 
    ACTUALIZAR_TAREA,
    AGREGAR_TAREA, 
    ELIMINAR_TAREA, 
    ESTADO_TAREA, 
    LIMPIAR_TAREA, 
    OBTENER_TAREAS, 
    SELECCIONAR_TAREA, 
    VALIDAR_TAREA 
} from "../../types";

// eslint-disable-next-line 
export default ( state, action )=>{
    switch(action.type){
        case OBTENER_TAREAS:
            return{
                ...state,
                tareasproyecto: action.payload
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tareasproyecto:[action.payload,...state.tareasproyecto],
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
                tareasproyecto: state.tareasproyecto.filter( tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
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
