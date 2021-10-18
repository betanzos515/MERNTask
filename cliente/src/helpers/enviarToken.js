import { tokenAuth } from "../config/tokenAuth";


export const setToken = ()=>{
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token);
    }
}