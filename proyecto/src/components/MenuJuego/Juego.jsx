import React, { useState } from 'react';
import './Juego.css';
import Tablero from '../Tablero.jsx';
import Turno from './Turno.jsx';

const Juego = ({ tableroJugador, tableroComputadora }) => {
  
  const [turnoJugador, setTurnoJugador] = useState(true);
  const [turnoComputadora, setTurnoComputadora] = useState(false);

  const [tableroJuegoComputadora, setTableroJuegoComputadora] = useState(() =>
    Array(10).fill(null).map(() => Array(10).fill({ estado: null, tieneBarco: false }))
  );

  const [tableroJuegoJugador, setTableroJuegoJugador] = useState(() =>
    Array(10).fill(null).map(() => Array(10).fill(null))
  );

  const handleAtaqueClick = (fila, columna, esTableroJugador) => {
    const tablero = esTableroJugador ? tableroJuegoJugador : tableroJuegoComputadora;

    const tieneBarco = esTableroJugador
      ? tableroComputadora[fila][columna] === 'B'
      : tableroJugador[fila][columna] === 'B';

    if (tieneBarco) {
      tablero[fila][columna] = 'impacto';
      console.log(tablero[fila][columna]);
    } else {
      tablero[fila][columna] = 'agua';
      console.log(tablero[fila][columna]);
    }

    if (esTableroJugador) {
      setTableroJuegoJugador([...tablero]);
      setTurnoJugador(!turnoJugador);
      setTurnoComputadora(!turnoComputadora);
    } else {
      setTableroJuegoComputadora([...tablero]);
      setTurnoComputadora(!turnoComputadora);
      setTurnoJugador(!turnoJugador);
    }
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
          />
          <h2>Tablero pc hasta ahora</h2>
          <Tablero
            tablero={tableroJuegoComputadora}
            onCeldaClick={(fila, columna) => handleAtaqueClick(fila, columna, true)}
          />
        </div>

        <div className='tableroAdversario'>
          <h3 className='textoTableros'>Tablero de la Computadora</h3>
          <Tablero
            tablero={tableroComputadora}
          />
          <h2>Tablero jugador hasta ahora</h2>
          <Tablero
            tablero={tableroJuegoJugador}
            onCeldaClick={(fila, columna) => handleAtaqueClick(fila, columna, false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Juego;

