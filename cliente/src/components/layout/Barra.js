import { useEffect } from 'react'
import useUser from '../../hooks/useUser'

export const Barra = () => {
    const [ usuario,usuarioAutenticado, cerrarSesion ] = useUser();


    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])
    const handleClick = ()=>{
        cerrarSesion();
    }
    return (
        <header className='app-header'>
            {usuario ? <p className='nombre-usuario'>Hola <span>{usuario.nombre}</span></p>  :null}
            <nav className='nav-principal'>
                <button
                    className='btn btn-blank cerrar-sesion white'
                    onClick={handleClick}
                >Cerrar Sesion</button>
            </nav>
        </header>
    )
}
