import { useContext }from 'react'
import { proyectoContext } from '../../context/proyectos/proyectoContex';
import { tareaContext } from '../../context/tareas/tareaContext';

export const Proyecto = ({ proyecto }) => {
    const {_id} = proyecto;
    const { proyectoActual } = useContext(proyectoContext);
    const { nombre } = proyecto;
    const { obtenerTareas } =  useContext(tareaContext);

    const handleClick = ()=>{
        proyectoActual(proyecto); 
        obtenerTareas(_id);
    }
    return (
        <li>
            <button
                onClick={handleClick}
                type='button'
                className='btn btn-blank'
            >{nombre}</button>
        </li>
    )
}
