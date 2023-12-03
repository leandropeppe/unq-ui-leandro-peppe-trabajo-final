import React, { useState } from 'react';

const Turno = ({turnoJugador}) => {
  
  
  const seleccionTurno = () => {
    if(turnoJugador){
      return "Es tu turno!"
    }
    else{
      return "Turno de tu contrincante..."
    }
  }

  return (
    <div className="alert alert-success" role="alert">
      {seleccionTurno()}
    </div>
  );
  

};

export default Turno;