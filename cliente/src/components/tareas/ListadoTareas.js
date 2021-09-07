import { useContext } from "react"
import { proyectoContext } from "../../context/proyectos/proyectoContex"
import { tareaContext } from "../../context/tareas/tareaContext"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Tarea } from "./Tarea"

export const ListadoTareas = () => {

    const { proyecto, eliminarProyecto } = useContext(proyectoContext)
    const { tareasproyecto } = useContext(tareaContext);

    if(!proyecto){
        return <h1>No existen proyectos</h1>
    }
    const { nombre } = proyecto[0]

    const handleEliminar = ()=>{
        eliminarProyecto(proyecto[0]);
    }
    return (
        <>
            <h2>Proyecto : { nombre }</h2>

            <ul className="listado-tareas">
                {
                    tareasproyecto.length === 0 
                    ? (<li key={0} className='tarea'><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {
                        tareasproyecto.map(tarea=>(
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames='tarea'
                            >
                                <Tarea key={tarea.id} tarea={tarea}/>
                            </CSSTransition>
                        ))
                        }
                    </TransitionGroup>
                }
            </ul> 
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={ handleEliminar }
            >Eliminar Proyecto &times;</button>
        </>
    )
}
