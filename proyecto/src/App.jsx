import React, { useState } from 'react';
import Menu from './components/Menu';
import './App.css';
import MenuConfiguracion from './components/MenuConfiguracion';

const App = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [nombreJugador, setNombreJugador] = useState('');
  const [nombreJugador2, setNombreJugador2] = useState('');
  const [configurarBarcos, setConfigurarBarcos] = useState(false); 

  const manejarSeleccion = (opcion, nombres) => {
    setOpcionSeleccionada(opcion);

    if (opcion === 'pc') {
      setNombreJugador(nombres);
      setConfigurarBarcos(true);
    } else if (opcion === 'jugador2') {
      setNombreJugador(nombres.jugador1);
      setNombreJugador2(nombres.jugador2);
      // Aquí podrías configurar el estado para el Jugador 2 si es necesario
    }
  };

  return (
    <div>
      {!opcionSeleccionada ? (
        <Menu onSeleccion={manejarSeleccion} />
      ) : (
        <div className='playersContainer'>
          <MenuConfiguracion
            jugador={nombreJugador}
            jugador2={nombreJugador2}
            modoJuego={opcionSeleccionada}
            configurarBarcos={configurarBarcos}
          />
        </div>
      )}
    </div>
  );
};

export default App;



