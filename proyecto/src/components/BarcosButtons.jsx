import React from 'react';

const BarcosButtons = ({ barcos, barcoSeleccionado, seleccionarBarco }) => (
  <>
    {Object.keys(barcos).map((tipoBarco) => (
      <button
        key={tipoBarco}
        onClick={() => seleccionarBarco(tipoBarco)}
        disabled={!barcos[tipoBarco].disponible || barcoSeleccionado === tipoBarco}
      >
        {tipoBarco} ({barcos[tipoBarco].longitud})
      </button>
    ))}
  </>
);

export default BarcosButtons;
