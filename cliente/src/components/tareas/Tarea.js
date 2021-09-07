import {useContext} from 'react'
import { proyectoContext } from '../../context/proyectos/proyectoContex';
import { tareaContext } from '../../context/tareas/tareaContext';

export const Tarea = ({ tarea }) => {

    const { nombre, estado } = tarea;
    const { eliminarTarea, obtenerTareas, modificarEstado, seleccionarTarea  } = useContext(tareaContext);
    const { proyecto } = useContext(proyectoContext);

    const handleDelete = ()=>{
        eliminarTarea(tarea);
        obtenerTareas(proyecto[0]);
    }

    const handleEstado = estado=>{
        tarea.estado = estado;
        modificarEstado(tarea);
        obtenerTareas(proyecto[0]);
    }
    
    const handleSeleccionar = ()=>{
        seleccionarTarea(tarea)
    }

    return (
        <li className='tarea sombra'>
            <p>{nombre}</p>  
            <div className="estado">
                {estado 
                ?
                    (
                        <button
                            type='button'
                            className='completo'
                            onClick={ ()=> handleEstado(false) }
                        >Completo</button>
                    )
                :
                    (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={ ()=> handleEstado(true) }
                        >Incompleto</button>
                    )   
                }
            </div>
            <div className="acciones">
                <button
                    className='btn btn-primario'
                    onClick={ handleSeleccionar }
                >Editar</button>
                <button
                    className='btn btn-secundario'
                    onClick={ handleDelete }
                >Eliminar</button>
            </div>
        </li>
    )
}
