import { useReducer } from "react";
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
    
} from "../../types";
import { authContext } from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import { tokenAuth } from "../../config/tokenAuth";

export const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario:null,
        mensaje:null,
        cargando:true
    }

    const [state,dispatch ] = useReducer(AuthReducer, initialState); 

    //funciones.
    const registrarUsuario = async datos =>{
        try {
           const respuesta = await clienteAxios.post('/api/usuarios',datos);
           dispatch({
               type:REGISTRO_EXITOSO,
               payload: respuesta.data
           });
           usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg:error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type:REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //retorna el usuario autenticado
    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if(token){
            //TODO: Funcion para enviar el token por header.
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth')
            dispatch({
                type:OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    //cuando el usuario inicia sesion.
    const inciarSesion = async datos =>{
        try {
            const respuesta = await clienteAxios.post('/api/auth',datos);

            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data 
            });
            //obtenemos el usuario autenticado  
            usuarioAutenticado()
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg:error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type:LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //cierra la sesion del usuario
    const cerrarSesion = ()=>{
        dispatch({
            type: CERRAR_SESION
        })
    }
    return(
        <authContext.Provider
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                inciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >{props.children}
        </authContext.Provider>
    );
}
