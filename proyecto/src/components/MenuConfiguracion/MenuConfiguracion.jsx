import React, { useState } from 'react';
import { useConfiguracion } from '../../hooks/useConfiguracion.js';
import './MenuConfiguracion.css';
import ResetButton from './ResetButton.jsx';
import OrientationButton from './OrientationButton.jsx';
import BarcosButtons from './BarcosButtons.jsx';
import Tablero from '../Tablero.jsx';
import InitButton from './InitButton.jsx';
import Juego from '../MenuJuego/Juego.jsx';

const MenuConfiguracion = ({ jugador, jugador2, modoJuego, configurarBarcos }) => {
  const { 
    tablero, barcos,barcoSeleccionado,celdasPrevias,configuracionCompleta,tableroComputadora,
    reiniciarColocacionBarcos, cambiarOrientacion, seleccionarBarco, actualizarCeldasPrevias, colocarBarco,
  } = useConfiguracion();

  const [juegoIniciado, setJuegoIniciado] = useState(false);

  const handleStartGame = () => {
    setJuegoIniciado(true);
  };

  return (
    <div>
      {juegoIniciado ? (
        <Juego tableroJugador={tablero} tableroComputadora={tableroComputadora} />
      ) : (
        <div>
          <div>
            <h3>Jugador: {jugador}</h3>
            {jugador2 && <h3>Jugador 2: {jugador2}</h3>}
          </div>
          <div>
            {configurarBarcos ? (
              <div>
                <h4>Posicioná a tu flota!</h4>
                <p>Presiona el barco que quieres colocar e insertalo en el tablero..</p>
                <BarcosButtons barcos={barcos} barcoSeleccionado={barcoSeleccionado} seleccionarBarco={seleccionarBarco} />
              </div>
            ) : (
              <p>Turno de juego...</p>
            )}
          </div>
          <Tablero
            tablero={tablero}
            configurarBarcos={configurarBarcos}
            colocarBarco={colocarBarco}
            actualizarCeldasPrevias={actualizarCeldasPrevias}
            barcoSeleccionado={barcoSeleccionado}
            celdasPrevias={celdasPrevias}
          />
          <div className='configButtons'>
            <ResetButton onClick={() => reiniciarColocacionBarcos()} />
            <OrientationButton onClick={() => cambiarOrientacion()} />
          </div>
          <InitButton onClick={handleStartGame} configuracionCompleta={configuracionCompleta} />
        </div>
      )}
    </div>
  );
};

export default MenuConfiguracion;

