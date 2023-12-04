import React, { useState } from 'react';
import MenuPrincipal from './components/MenuPrincipal/MenuPrincipal.jsx';
import MenuConfiguracion from './components/MenuConfiguracion/MenuConfiguracion';

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
    }
  };

  return (
    <div>
      {!opcionSeleccionada ? (
        <MenuPrincipal onSeleccion={manejarSeleccion} />
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



