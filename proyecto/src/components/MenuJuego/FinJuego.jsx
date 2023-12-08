import React from 'react';
import './Juego.css';
import { useJuego } from '../../hooks/useJuego';

const FinJuego = ({ ganador , onRestart , menuPrincipal}) => {

  const {partidasGanadasJ1,partidasGanadasPC } = useJuego();

  return (
    <div className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className='ganador centered'>
        <h1>{ganador}</h1>
      </div>
      <div>
        <h4>Jugador 1: {partidasGanadasJ1} </h4>
        <h4>Contrincante: {partidasGanadasPC} </h4>
      </div>
      <div className='buttons centered' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <button className='button' style={{ fontSize: '1.5rem' }} onClick={onRestart}>Reiniciar Partida</button>
        <button className='button' style={{ fontSize: '1.5rem' }} >Menu Principal</button>
      </div>
    </div>
  );
};

export default FinJuego;
