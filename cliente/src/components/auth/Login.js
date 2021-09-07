import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const Login = () => {
    
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
        console.log('Hola Submit');
    }

    return (
        <div className='form-usuario'>
            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={handleSubmit}
                >
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
