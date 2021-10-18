import { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../../context/autenticacion/authContext';

export const RutaPrivada = ({component: Component, ...props }) => {
    
    const contexto = useContext(authContext);
    const { autenticado, cargando, usuarioAutenticado  } = contexto;

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[]);
    return (
        <Route { ...props } render={ props=> !autenticado && !cargando ? 
            ( 
                <Redirect to='/' />
            ) : 
            (
                 <Component { ...props } /> 
            ) 
        } />
    )
}
