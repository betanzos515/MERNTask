import axios from "axios";

//creamos una configuracion por default de axios con una url base
const clienteAxios = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL    
});

export default clienteAxios;