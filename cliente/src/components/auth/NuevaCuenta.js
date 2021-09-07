import React, { useState } from "react";
import { Link } from 'react-router-dom';

export const NuevaCuenta = () => {
  //State para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    nombre:"",
    email: "",
    password: "",
    confirmar:""
  });

  const { nombre, email, password, confirmar } = usuario;

  const handleChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //Validad que no haya campos vacios
    

    //Password minimo de 6 caracteres

    //Los 2 password sean iguales

    //Pasarlo al action
  };

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una Cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              onChange={handleChange}
              value={ nombre }
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              onChange={handleChange}
              value={ email }
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              onChange={handleChange}
              value={ password }
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirma tu password"
              onChange={handleChange}
              value={ confirmar }
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrar Cuenta"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Inicia Sesión
        </Link>
      </div>
    </div>
  );
};
