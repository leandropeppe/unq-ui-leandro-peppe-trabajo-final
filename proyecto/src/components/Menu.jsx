import React, { useState } from 'react';

const Menu = ({ onSeleccion }) => {
  const [nombreJugador, setNombreJugador] = useState('');
  const [nombreJugador2, setNombreJugador2] = useState(''); 
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const manejarCambioNombre = (event) => {
    setNombreJugador(event.target.value);
  };

  const manejarCambioNombreJugador2 = (event) => {
    setNombreJugador2(event.target.value);
  };

  const comenzarJuego = () => {
    if (opcionSeleccionada === 'pc' && nombreJugador.trim() !== '') {
      onSeleccion(opcionSeleccionada, nombreJugador);
    } else if (opcionSeleccionada === 'jugador2' && nombreJugador.trim() !== '' && nombreJugador2.trim() !== '') {
      onSeleccion(opcionSeleccionada, { jugador1: nombreJugador, jugador2: nombreJugador2 });
    } else {
      alert('Por favor, ingresa nombres válidos y selecciona una opción de juego.');
    }
  };

  return (
    <div className='menu'>
      <h1>Batalla Naval</h1>
      <p>Seleccione contra quién quiere jugar:</p>
      <div>
        <button onClick={() => setOpcionSeleccionada('pc')}>Jugar contra la PC</button>
        <button onClick={() => setOpcionSeleccionada('jugador2')}>Jugar contra Jugador 2</button>
      </div>
      <label>
        Ingrese su nombre:
        <input type='text' value={nombreJugador} onChange={manejarCambioNombre} />
      </label>
      {opcionSeleccionada === 'jugador2' && (
        <label>
          Ingrese el nombre del Jugador 2:
          <input type='text' value={nombreJugador2} onChange={manejarCambioNombreJugador2} />
        </label>
      )}
      <button onClick={comenzarJuego}>Comenzar Juego</button>
    </div>
  );
};

export default Menu;
