import { useEffect } from 'react'
import { Barra } from '../layout/Barra'
import { Sidebar } from '../layout/Sidebar'
import { FormTarea } from '../tareas/FormTarea'
import { ListadoTareas } from '../tareas/ListadoTareas'
import useUser from '../../hooks/useUser.js'


export const Proyectos = () => {
    
    const [ , usuarioAutenticado] = useUser();
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])
    return (
        <div className='contenedor-app'>
            <Sidebar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/> 
                    </div>
                </main>
            </div>
        </div>
    )
}
