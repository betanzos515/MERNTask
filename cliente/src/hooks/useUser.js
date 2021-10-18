import { useContext } from 'react'
import { authContext } from '../context/autenticacion/authContext';

const useUser = () => {
    const AuthContext = useContext(authContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;

    return [ usuario, usuarioAutenticado, cerrarSesion];
}

export default useUser;
