import clienteAxios  from "./axios";

export const tokenAuth = token =>{
    if(token){
        clienteAxios.defaults.headers.common['x-auth-token'] = token; //le asignamos el token que esta recibiendo por parametros.
    }else{
        delete clienteAxios.defaults.headers.common('x-auth-token');
    }
}