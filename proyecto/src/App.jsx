import React, { useState } from 'react';
import MenuPrincipal from './components/MenuPrincipal/MenuPrincipal.jsx';
import MenuConfiguracion from './components/MenuConfiguracion/MenuConfiguracion';
import FinJuego from './components/MenuJuego/FinJuego.jsx';

const App = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [nombreJugador, setNombreJugador] = useState('');
  const [nombreJugador2, setNombreJugador2] = useState('');
  const [configurarBarcos, setConfigurarBarcos] = useState(false); 

  const [partidaFinalizada, setPartidaFinalizada] = useState(false);
  const [ganador, setGanador] = useState('');


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
      {partidaFinalizada ? (
        <FinJuego ganador={ganador}  />
      ) : !opcionSeleccionada ? (
        <MenuPrincipal onSeleccion={manejarSeleccion} />
      ) : (
        <MenuConfiguracion
          jugador={nombreJugador}
          jugador2={nombreJugador2}
          configurarBarcos={configurarBarcos}
          onPressFinalizarPartida={() => {
            setOpcionSeleccionada(false)
          }}
          setOpcionSeleccionada={setOpcionSeleccionada}
        />
      )}
    </div>
  );
};

export default App;

