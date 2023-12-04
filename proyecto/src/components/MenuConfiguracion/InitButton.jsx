import React from 'react';
import './MenuConfiguracion.css';


const InitButton = ({ onClick, configuracionCompleta }) => {
  return (
    <div className='configButtons'>
      <button className='button' onClick={onClick} disabled={!configuracionCompleta}>
      Comenzar el juego
    </button>
    </div>
  );
};

export default InitButton;
