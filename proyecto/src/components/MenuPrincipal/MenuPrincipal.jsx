import React, { useState } from 'react';
import './MenuPrincipal.css'
import Alert from '../Alert.jsx';


const MenuPrincipal = ({ onSeleccion }) => {
  const [nombreJugador, setNombreJugador] = useState('');
  const [nombreJugador2, setNombreJugador2] = useState(''); 
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');


  const manejarCambioNombre = (event) => {
    setNombreJugador(event.target.value);
  };

  const manejarCambioNombreJugador2 = (event) => {
    setNombreJugador2(event.target.value);
  };

  const comenzarJuego = () => {
    if (opcionSeleccionada === 'pc') {
      if (nombreJugador.trim() !== '') {
        onSeleccion(opcionSeleccionada, nombreJugador);
      } else {
        setMensajeAlerta('Por favor, ingresa tu nombre.');
        setMostrarAlerta(true);
      }
    } else if (opcionSeleccionada === 'jugador2') {
      if (nombreJugador.trim() !== '' && nombreJugador2.trim() !== '') {
        setMensajeAlerta('Lo siento ' + nombreJugador + ' y ' + nombreJugador2 + '...la version multijugador no está habilitada.');
        setMostrarAlerta(true);
      } else if (nombreJugador.trim() === '' && nombreJugador2.trim() === '') {
        setMensajeAlerta('Por favor, ingresa tus nombres para jugar contra Jugador 2.');
        setMostrarAlerta(true);
      } else {
        setMensajeAlerta('Por favor, ingresa ambos nombres para jugar contra Jugador 2.');
        setMostrarAlerta(true);
      }
    } else {
      setMensajeAlerta('Por favor, selecciona una opción de juego.');
      setMostrarAlerta(true);
    }
  };

  return (
    <div className='menu'>
      <h1>Batalla Naval</h1>
      <h4 style={{ textAlign:'center' }} >Seleccione contra quién quiere jugar:</h4>
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
      {mostrarAlerta && <Alert mensaje={mensajeAlerta} />}
    </div>
  );
};

export default MenuPrincipal;
