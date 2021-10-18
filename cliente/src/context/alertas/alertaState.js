import { useReducer } from "react";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";
import { AlertaContext } from "./alertasContex";
import alertasReducer from "./alertasReducer";

export const AlertaState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(alertasReducer, initialState);

  const mostrarAlerta = (msg, categoria) =>{
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      }
    });
    setTimeout(()=>{
      dispatch({
        type: OCULTAR_ALERTA,
      });
    },3000);
  };

  return (
    <AlertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
      }}
    >
      {props.children}
    </AlertaContext.Provider>
  );
};
