import { useContext, useEffect} from 'react'
import { proyectoContext } from '../../context/proyectos/proyectoContex'
import { Proyecto } from './Proyecto';
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const ListaProyectos = () => {
    const contexProyectos = useContext(proyectoContext)
    const { proyectos, obtenerProyectos } = contexProyectos;
    useEffect(() => {
        obtenerProyectos();
    }, []);

    //nota, antes del useEffect no debe haber un return.
    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p> ;
    return (
        <ul className='listado-proyectos'>
            <TransitionGroup>
            {
                proyectos.map( proyecto =>(
                    <CSSTransition
                        key={proyecto.id}
                        timeout={500}
                        classNames='proyecto'
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))
            }
            </TransitionGroup>
        </ul>
    )
}
