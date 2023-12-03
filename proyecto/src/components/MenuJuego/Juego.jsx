
import React, { useState } from 'react';
import './Juego.css';
import Tablero from '../Tablero.jsx';
import Turno from './Turno.jsx'

const Juego = ({ tableroJugador, tableroComputadora }) => {
  
  const [turnoJugador, setTurnoJugador] = useState(true);

  // Lógica del juego, manejo de ataques, etc.

  return (
    <div className='bodyGame'>
      <h1>Juego</h1>
      <Turno turnoJugador={turnoJugador}/>
      <div className='contenedorTableros'>
        <div className='tableroJugador1'>
          <h3>Tablero del Jugador</h3>
          <Tablero tablero={tableroJugador} />
        </div>
        <div className='tableroAdversario'>
          <h3>Tablero de la Computadora</h3>
          <Tablero tablero={tableroComputadora} />
        </div>
      </div>
    </div>
  );
  

};

export default Juego;
