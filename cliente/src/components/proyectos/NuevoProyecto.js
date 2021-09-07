import { useContext, useState } from "react";
import { proyectoContext } from "../../context/proyectos/proyectoContex";

export const NuevoProyecto = () => {
  //declaramos el context y extraemos el formulario
  const proyectosContex = useContext(proyectoContext);
  const { formulario, mostrarFormulario, errorFormulario , agregarProyecto, mostrarError } = proyectosContex;
   //state para proyecto
   const [proyecto, guardarProyecto] = useState({
    nombre: ""
  });

  const { nombre } = proyecto;

  //Leyendo los contenidos del input
  const handleChange = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario envie el proyecto
  const handleSubmit = (e) => {
    e.preventDefault();

    if( nombre === '' ){
      mostrarError()
      return
    }

    agregarProyecto(proyecto);
    guardarProyecto({ nombre:'' });
  };

  const componente = formulario ? (
    <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-text"
        placeholder="Nombre del proyecto"
        name="nombre"
        value={nombre}
        onChange={handleChange}
      />

      <input
        type="submit"
        className="btn btn-primario btn-block"
        value="Agregar Proyecto"
      />
    </form>
  ) : null;

  
  return (
    <>
      <button 
        type="button"
        className="btn btn-block btn-primario"
        onClick={mostrarFormulario}
        >
        Nuevo Proyecto
      </button>

      {componente}
      { errorFormulario ? <p className='mensaje error'>EL nombre del Proyecto es obligatorio</p> : null}
    </>
  );
};
