import React from 'react';
import './MenuConfiguracion.css';

const BarcosButtons = ({ barcos, barcoSeleccionado, seleccionarBarco }) => (
  <div className='barcosButtons'>
      <>
    {Object.keys(barcos).map((tipoBarco) => (
      <button className='button'
        key={tipoBarco}
        onClick={() => seleccionarBarco(tipoBarco)}
        disabled={!barcos[tipoBarco].disponible || barcoSeleccionado === tipoBarco}
      >
        {tipoBarco} ({barcos[tipoBarco].longitud})
      </button>
    ))}
  </>
  </div>
  
);

export default BarcosButtons;
