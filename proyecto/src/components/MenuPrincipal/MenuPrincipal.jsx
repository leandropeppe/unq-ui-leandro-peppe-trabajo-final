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
        // Caso válido: Jugar contra la PC con nombre ingresado
        onSeleccion(opcionSeleccionada, nombreJugador);
      } else {
        // Caso inválido: Falta el nombre
        setMensajeAlerta('Por favor, ingresa tu nombre.');
        setMostrarAlerta(true);
      }
    } else if (opcionSeleccionada === 'jugador2') {
      if (nombreJugador.trim() !== '' && nombreJugador2.trim() !== '') {
        // Caso válido: Jugar contra Jugador 2 con nombres ingresados
        onSeleccion(opcionSeleccionada, { jugador1: nombreJugador, jugador2: nombreJugador2 });
      } else if (nombreJugador.trim() === '' && nombreJugador2.trim() === '') {
        // Caso inválido: Faltan ambos nombres
        setMensajeAlerta('Por favor, ingresa tus nombres para jugar contra Jugador 2.');
        setMostrarAlerta(true);
      } else {
        // Caso inválido: Falta al menos un nombre
        setMensajeAlerta('Por favor, ingresa ambos nombres para jugar contra Jugador 2.');
        setMostrarAlerta(true);
      }
    } else {
      // Caso inválido: No se seleccionó una opción de juego
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
