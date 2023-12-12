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
import { useBarcos } from '../../hooks/useBarcos.js';

const Juego = ({ tableroJugador, tableroComputadora, reiniciarConfig , menuPrincipal}) => {
  
  const { turnoJugador,setTurnoJugador, juegoFinalizado,setJuegoFinalizado, situacionDeJuego, aumentarImpactos,
          tableroJuegoComputadora, setTableroJuegoComputadora,tableroJuegoJugador, setTableroJuegoJugador } = useJuego();
  
  const {realizarTiroComputadora} = useConfiguracion();

  const { reproducirSonido } = useAudio();

  const {barcos} = useBarcos();
  

  const handleAtaqueClick = (fila, columna, esTableroJugador) => {
    if ((turnoJugador === esTableroJugador) && !juegoFinalizado ) {
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
        
        // Aca deberia verificar si la celda que se escogio en la ultima de un barco
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

  /////////////////

  


  ////////////////
  

  useEffect(() => {
    if (!turnoJugador) {
      const timeoutId = setTimeout(() => {
        const { fila, columna } = realizarTiroComputadora();
        handleAtaqueClick(fila, columna, false);
        setTurnoJugador(true);
      }, 2000);
  
      return () => clearTimeout(timeoutId);
    }
  }, [turnoJugador, realizarTiroComputadora, handleAtaqueClick]);
  

  const handleRestart = () => {
    reiniciarConfig(false);
  };


  return (
    <div>
      {juegoFinalizado && <FinJuego ganador={situacionDeJuego} onRestart={handleRestart} menuPrincipal={menuPrincipal}/>}
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
    </div>
  );
};

export default Juego;

