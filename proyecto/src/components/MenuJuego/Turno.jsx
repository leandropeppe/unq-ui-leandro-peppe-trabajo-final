import React, { useState } from 'react';
import './Juego.css'

const Turno = ({esTurnoJugador}) => {
  
  
  const seleccionTurno = () => {
    return esTurnoJugador ? "Es tu turno!" : "Turno de la Computadora...";
  };

  const alertClass = esTurnoJugador ? "alert alert-success" : "alert alert-danger";

  return (
    <div className={alertClass} role="alert">
      {seleccionTurno()}
    </div>
  );
};

export default Turno;