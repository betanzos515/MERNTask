import { useContext, useEffect} from 'react'
import { proyectoContext } from '../../context/proyectos/proyectoContex'
import { Proyecto } from './Proyecto';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AlertaContext } from '../../context/alertas/alertasContex';

export const ListaProyectos = () => {


    const contexProyectos = useContext(proyectoContext)
    const {mensaje, proyectos, obtenerProyectos } = contexProyectos;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    useEffect(() => {

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        // eslint-disable-next-line
    }, [ mensaje ]);

    //nota, antes del useEffect no debe haber  un return.
    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p> ;
    return (
        <ul className='listado-proyectos'>
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
            {
                proyectos.map( proyecto =>(
                    <CSSTransition
                        key={proyecto._id}
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
