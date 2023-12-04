
import React, { useState } from 'react';
import './Juego.css';
import Tablero from '../Tablero.jsx';
import Turno from './Turno.jsx'

const Juego = ({ tableroJugador, tableroComputadora }) => {
  
  const [turnoJugador, setTurnoJugador] = useState(true);
  const [turnoComputadora, setTurnoComputadora] = useState(false);
  // Lógica del juego, manejo de ataques, etc.

  const handleDisparoClick = () => {
    if (turnoJugador) {
      // Lógica de ataque del jugador
      // ...
    } else {
      // Lógica de ataque de la computadora
      // ...
    }
  
    // Alternar el turno
    setTurnoJugador(!turnoJugador);
    setTurnoComputadora(!turnoComputadora);
  };

  return (
    <div className='bodyGame'>
      <h1>Hora de competir..</h1>
      <Turno esTurnoJugador={turnoJugador}/>
      <div className='contenedorTableros'>
        <div className='tableroJugador1'>
          <h3 className='textoTableros'>Tablero del Jugador</h3>
          <Tablero
            tablero={tableroJugador}
            permitirAtaque={turnoComputadora}
            onAtaque={handleDisparoClick}
          />
        </div>
        <div className='tableroAdversario'>
          <h3 className='textoTableros'>Tablero de la Computadora</h3>
          <Tablero
            tablero={tableroComputadora}
            permitirAtaque={turnoJugador}
            onAtaque={handleDisparoClick}
          />
        </div>
      </div>
    </div>
  );
  

};

export default Juego;
