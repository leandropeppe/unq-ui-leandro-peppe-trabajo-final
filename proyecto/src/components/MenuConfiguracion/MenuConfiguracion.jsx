import React, { useState } from 'react';
import { useConfiguracion } from '../../hooks/useConfiguracion.js';
import { useTableroComputadora } from '../../hooks/useTableroComputadora.js';
import './MenuConfiguracion.css';
import ResetButton from './ResetButton.jsx';
import OrientationButton from './OrientationButton.jsx';
import BarcosButtons from './BarcosButtons.jsx';
import Tablero from '../Tablero.jsx';
import InitButton from './InitButton.jsx';
import Juego from '../MenuJuego/Juego.jsx';
import Alert from '../Alert.jsx';

const MenuConfiguracion = ({ jugador, jugador2, configurarBarcos }) => {
  const { 
    tablero, barcos,barcoSeleccionado,celdasPrevias,configuracionCompleta,mostrarAlerta,mensajeAlerta,
    reiniciarColocacionBarcos, cambiarOrientacion, seleccionarBarco, actualizarCeldasPrevias, colocarBarco
  } = useConfiguracion();

  const { tableroComputadora, configurarTableroComputadoraAleatorio } = useTableroComputadora();

  const [juegoIniciado, setJuegoIniciado] = useState(false);

  

  const handleStartGame = () => {
    configurarTableroComputadoraAleatorio();
    setJuegoIniciado(true);
  };

  return (
    <div>
      {juegoIniciado ? (
        <Juego tableroJugador={tablero} tableroComputadora={tableroComputadora} />
      ) : (
        <div>
          <div>
            <h3 className='text' >Jugador: {jugador}</h3>
            {jugador2 && <h3>Jugador 2: {jugador2}</h3>}
          </div>
          <div>
            {configurarBarcos ? (
              <div>
                <div>
                  <h4 className='text' >Posicioná a tu flota!</h4>
                  <p className='text' >Presiona el barco que quieres colocar e insertalo en el tablero..</p>
                </div>
                <BarcosButtons barcos={barcos} barcoSeleccionado={barcoSeleccionado} seleccionarBarco={seleccionarBarco} />
                <div className='alertContainer centered'>
                {mostrarAlerta && <Alert mensaje={mensajeAlerta} />}
                </div>
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

