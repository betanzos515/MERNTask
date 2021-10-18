import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AlertaContext } from "../../context/alertas/alertasContex";
import { authContext } from "../../context/autenticacion/authContext";


export const NuevaCuenta = props => {

  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta } = alertaContext;

  const authContex = useContext(authContext);
  const { mensaje, autenticado, registrarUsuario } = authContex;
  
  useEffect(() => {
    if(autenticado){
      props.history.push('/proyectos');
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg,'alerta-error');
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history])
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
    if( nombre.trim() === '' || email.trim() ==='' || password.trim() ==='' || confirmar.trim() ==='' ){
      mostrarAlerta('Todos los campos son obligatorios','alerta-error');
      return;
    }
    //Password minimo de 6 caracteres
    if(password.length < 6){
      mostrarAlerta('La contraseña debe contener minimo 6 caracteres','alerta-error');
      return;
    }
    //Los 2 password sean iguales
    if(password !== confirmar){
      mostrarAlerta('La contraseña deben de ser iguales','alerta-error');
      return;
    }
    //Pasarlo al action 
    registrarUsuario({
      nombre,
      email,
      password
    }); 
  };

  return (
    <div className="form-usuario">

      { 
      alerta ? ( 
        <div className={`alerta ${alerta.categoria}`}>{ alerta.msg }</div> 
      ) : null 
      }
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
