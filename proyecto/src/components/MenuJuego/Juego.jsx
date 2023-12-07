import React, { useState,useEffect } from 'react';
import { useConfiguracion } from '../../hooks/useConfiguracion.js';
import { useJuego } from '../../hooks/useJuego.js';
import { useAudio } from '../../hooks/useAudio.js';
import './Juego.css';
import Tablero from '../Tablero.jsx';
import Turno from './Turno.jsx';
import FinJuego from './FinJuego.jsx';
import explosion from '../../sounds/explosion.mp3'
import water from '../../sounds/water.mp3'

const Juego = ({ tableroJugador, tableroComputadora }) => {
  
  const { turnoJugador,setTurnoJugador, juegoFinalizado,setJuegoFinalizado, situacionDeJuego, aumentarImpactos } = useJuego();
  
  const {realizarTiroComputadora} = useConfiguracion();

  const { reproducirSonido } = useAudio();

  const [tableroJuegoComputadora, setTableroJuegoComputadora] = useState(() =>
  Array(10).fill(null).map(() => Array(10).fill({ estado: null, tieneBarco: false }))
  );
  
  const [tableroJuegoJugador, setTableroJuegoJugador] = useState(() =>
  Array(10).fill(null).map(() => Array(10).fill(null))
  );
  

  const handleAtaqueClick = (fila, columna, esTableroJugador) => {
    if (turnoJugador === esTableroJugador) {
      const tablero = esTableroJugador ? tableroJuegoJugador : tableroJugador;

      const celdaAtacada = esTableroJugador
        ? tableroJuegoJugador[fila][columna]
        : tableroJuegoComputadora[fila][columna];

      if (celdaAtacada === 'agua' || celdaAtacada === 'impacto') {
        return;
      }

      const tieneBarco = esTableroJugador
        ? tableroComputadora[fila][columna] === 'B'
        : tableroJugador[fila][columna] === 'B';

      if (tieneBarco) {
        tablero[fila][columna] = 'impacto';
        reproducirSonido(explosion);
        aumentarImpactos();
      } else {
        tablero[fila][columna] = 'agua';
        reproducirSonido(water);
      }

      if (esTableroJugador) {
        setTableroJuegoJugador([...tablero]);
      } else {
        setTableroJuegoComputadora([...tablero]);
      }

      setTurnoJugador(!turnoJugador);
    }
  };


  useEffect(() => {
    if (!turnoJugador) {
      const timeoutId = setTimeout(() => {
        const { fila, columna } = realizarTiroComputadora();
        handleAtaqueClick(fila, columna, false);
        console.log(`La computadora disparó a la fila ${fila}, columna ${columna}`);
        setTurnoJugador(true);
      }, 2000);
  
      return () => clearTimeout(timeoutId);
    }
  }, [turnoJugador, realizarTiroComputadora, handleAtaqueClick]);



  return (
    <div>
      {juegoFinalizado ? (
      <FinJuego ganador={situacionDeJuego} />
    ) : (
      <div className='bodyGame'>
        <h1 id='titulo'>Hora de jugar!</h1>
        <Turno esTurnoJugador={turnoJugador}/>
        <div className='contenedorTableros'>
          <div className='tableroJugador1'>
            <h3 className='textoTableros'>Tu tablero</h3>
            <Tablero
              tablero={tableroJugador}
              onCeldaClick={(fila, columna) => handleAtaqueClick(fila, columna, false)}
            />
          </div>
          <div className='tableroAdversario'>
            <h3 className='textoTableros'>Tablero del contrincante</h3>
            <Tablero
              tablero={tableroJuegoJugador}
              onCeldaClick={(fila, columna) => handleAtaqueClick(fila, columna, true)}
            />
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Juego;

/*

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
            tablero={tableroJuegoJugador}
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
            tablero={tableroJuegoComputadora}
            onCeldaClick={(fila, columna) => handleAtaqueClick(fila, columna, false)}
          />
        </div>
      </div>
    </div>
  );
};

*/ 