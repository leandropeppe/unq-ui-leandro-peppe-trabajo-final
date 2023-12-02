import React, { useState } from 'react';
import { useConfiguracion } from '../hooks/useConfiguracion.js';
import './MenuConfiguracion.css';
import ResetButton from './ResetButton.jsx'
import OrientationButton from './OrientationButton.jsx'
import BarcosButtons from './BarcosButtons.jsx'
import Tablero from './Tablero.jsx'
import InitButton from './InitButton.jsx';

const MenuConfiguracion = ({ jugador, jugador2, modoJuego, configurarBarcos }) => {

  const { tablero, barcos, barcoSeleccionado, celdasPrevias,
          reiniciarColocacionBarcos,cambiarOrientacion, 
          seleccionarBarco, actualizarCeldasPrevias, colocarBarco,
          todosBarcosColocados
        } = useConfiguracion()
  

  return (
    <div>
      <div>
        <h3>Jugador: {jugador}</h3>
        {jugador2 && <h3>Jugador 2: {jugador2}</h3>}
      </div>
      <div>
        {configurarBarcos ? (
          <div>
            <h4>Configuración de Barcos</h4>
            <p>Seleccione la posición de sus barcos:</p>
            <p>Click para colocar:</p>
            <div className='buttons'>
              <div>
                <ResetButton onClick={() => reiniciarColocacionBarcos()}/>
                <OrientationButton onClick={() => cambiarOrientacion()}/>
              </div>
              <BarcosButtons barcos={barcos} barcoSeleccionado={barcoSeleccionado} seleccionarBarco={seleccionarBarco} />
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
      <InitButton bool={todosBarcosColocados}/>
    </div>
    
  );
};

export default MenuConfiguracion;
