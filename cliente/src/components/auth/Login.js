import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AlertaContext } from "../../context/alertas/alertasContex";
import { authContext } from "../../context/autenticacion/authContext";

export const Login = (props) => {

    //extraer los valores del contexto
    const alertaContext = useContext(AlertaContext);
    const contextoAuth = useContext(authContext);

    const { alerta, mostrarAlerta } = alertaContext;
    const { mensaje, autenticado, inciarSesion } = contextoAuth;
    
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg , mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje,autenticado])
    
    //State para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })

    const { email, password } = usuario;

    
    const handleChange = ( e ) =>{
        guardarUsuario({
            ...usuario,
            [ e.target.name ] : e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(email.trim === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
        } 
        inciarSesion({email,password});
    }

    return (
        <div className='form-usuario'>
            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    { 
                        alerta ? ( 
                            <div className={`alerta ${alerta.categoria}`}>{ alerta.msg }</div> 
                        ) : null 
                    }
                <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Tu email'
                            onChange={handleChange}
                            value={email}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Tu password'
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <div className='campo-form'>
                        <input
                            type='submit'
                            className='btn btn-primario btn-block'
                            value='Iniciar Sesión'
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>Obtener Cuenta</Link>
            </div>
        </div>
    )
}
