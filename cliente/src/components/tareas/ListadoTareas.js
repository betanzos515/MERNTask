import { useContext } from "react"
import { proyectoContext } from "../../context/proyectos/proyectoContex"
import { tareaContext } from "../../context/tareas/tareaContext"
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

            <div className="listado-tareas">
                {
                    tareasproyecto.length === 0 
                    ? (<p className='tarea'>No hay tareas</p>)
                    : 
                    tareasproyecto.map(tarea=>(
                        <Tarea key={tarea._id} tarea={tarea}/>
                    ))
                }
            </div> 
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={ handleEliminar }
            >Eliminar Proyecto &times;</button>
        </>
    )
}
