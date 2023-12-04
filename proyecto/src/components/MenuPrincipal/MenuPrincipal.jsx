import React, { useState } from 'react';
import './MenuPrincipal.css'

const MenuPrincipal = ({ onSeleccion }) => {
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
      <h4>Seleccione contra quién quiere jugar:</h4>
      <div className='buttonSeleccionContainer '>
        <button className='button' onClick={() => setOpcionSeleccionada('pc')}>Jugar contra la PC</button>
        <button className='button' onClick={() => setOpcionSeleccionada('jugador2')}>Jugar contra Jugador 2</button>
      </div>
      <div className='inputs'>
        <label className='label'>
          <h4>Ingrese su nombre:</h4>
          <input type='text' value={nombreJugador} onChange={manejarCambioNombre} />
        </label>
        {opcionSeleccionada === 'jugador2' && (
          <label className='label'>
            <h4>Ingrese el nombre del Jugador 2:</h4>
            <input type='text' value={nombreJugador2} onChange={manejarCambioNombreJugador2} />
          </label>
        )}
      </div>
      <button className='button' onClick={comenzarJuego}>Comenzar Juego</button>
    </div>
  );
};

export default MenuPrincipal;
