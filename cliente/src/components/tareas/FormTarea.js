import { useState,useContext,useEffect } from 'react'
import { proyectoContext } from '../../context/proyectos/proyectoContex'
import { tareaContext } from '../../context/tareas/tareaContext';
export const FormTarea = () => {
    
    const { proyecto } = useContext(proyectoContext);
    const { 
        tareaSeleccionada, 
        agregarTarea, 
        validarTarea, 
        errorTarea, 
        obtenerTareas,
        actualizarTarea,
        limpiarTarea
    } = useContext(tareaContext);
    
    const [ tareaState, guardarTareas ] = useState('');

    useEffect(() => {
        if(tareaSeleccionada !== null) 
            guardarTareas(tareaSeleccionada.nombre)
        else 
            guardarTareas('');
    }, [tareaSeleccionada])

    if(!proyecto) return null;
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if( tareaState.trim() === '' ){
            validarTarea()
            return;
        }

        if(tareaSeleccionada === null){
            console.log('Vamos a agregar');
            agregarTarea({
                nombre:tareaState,
                estado:false,
                proyectoId: proyecto[0].id,
            });
        }else{
            const { estado, proyectoId, id } = tareaSeleccionada
            actualizarTarea({
                nombre: tareaState,
                estado,
                proyectoId,
                id
            })
            limpiarTarea();
        }
        obtenerTareas(proyecto[0]);
        guardarTareas('');
    }

    const handleChange = (e)=>{
        guardarTareas(e.target.value);
    }
    
    return (
        <div className='formulario'>
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        onChange={ handleChange }
                        value={ tareaState }
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
                    />
                </div>
            </form>
            { errorTarea ? <p className=' mensaje error '>El nombre de la tarea es obligatorio</p> : null }
        </div>
    )
}
