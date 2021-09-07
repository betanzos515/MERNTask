import { useContext }from 'react'
import { proyectoContext } from '../../context/proyectos/proyectoContex';
import { tareaContext } from '../../context/tareas/tareaContext';

export const Proyecto = ({ proyecto }) => {
    
    const { proyectoActual } = useContext(proyectoContext);
    const { nombre } = proyecto;

    const { obtenerTareas } =  useContext(tareaContext);

    return (
        <li onClick={( )=>{ 
            proyectoActual(proyecto); 
            obtenerTareas(proyecto);
        }}>
            <button
                type='button'
                className='btn btn-blank'
            >{nombre}</button>
        </li>
    )
}
