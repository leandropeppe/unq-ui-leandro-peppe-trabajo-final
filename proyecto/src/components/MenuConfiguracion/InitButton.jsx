import React from 'react';
import './MenuConfiguracion.css';


const InitButton = ({ onClick, configuracionCompleta }) => {
  return (

    <button className='button' onClick={onClick} disabled={!configuracionCompleta}>
      Comenzar el juego
    </button>
  );
};

export default InitButton;
