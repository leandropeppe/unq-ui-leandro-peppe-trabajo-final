import { useState, useEffect } from 'react';
import { useBarcos } from './useBarcos';


export const useJuego = () => {

  const [turnoJugador, setTurnoJugador] = useState(true);
  const [juegoFinalizado, setJuegoFinalizado] = useState(false);
  const [contadorJugador, setContadorJugador] = useState(0);
  const [contadorComputadora, setContadorComputadora] = useState(0);
  const [situacionDeJuego, setSituacionDeJuego] = useState('');
  const [tirosComputadora, setTirosComputadora] = useState([]);

  const [tableroJuegoComputadora, setTableroJuegoComputadora] = useState(() =>
  Array(10).fill(null).map(() => Array(10).fill({ estado: null, tieneBarco: false }))
  );
  
  const [tableroJuegoJugador, setTableroJuegoJugador] = useState(() =>
  Array(10).fill(null).map(() => Array(10).fill(null))
  );


  const aumentarImpactos = () => {
    if (turnoJugador) {
      setContadorJugador((prevContador) => prevContador + 1);
    } else {
      setContadorComputadora((prevContador) => prevContador + 1);
    }
  
    if (contadorComputadora >= 13 || contadorJugador >= 13) {
      if (contadorComputadora >= 13) {
        setSituacionDeJuego('Has Perdido..');
      } else {
        setSituacionDeJuego('Has Ganado!');
      }
      setJuegoFinalizado(true);
    }
  };


  const realizarTiroComputadora = () => {
    const fila = Math.floor(Math.random() * 10);
    const columna = Math.floor(Math.random() * 10);
    const celdaYaAtacada = tirosComputadora.some(tiro => tiro.fila === fila && tiro.columna === columna);
  
    if (!celdaYaAtacada) {
      setTirosComputadora([...tirosComputadora, { fila, columna }]);
      return { fila, columna };
    } else {
      return realizarTiroComputadora();
    }
  };


  

  return {
    turnoJugador,
    setTurnoJugador,
    juegoFinalizado,
    setJuegoFinalizado,
    situacionDeJuego,
    aumentarImpactos,
    realizarTiroComputadora,

    tableroJuegoComputadora, setTableroJuegoComputadora , 
    tableroJuegoJugador, setTableroJuegoJugador
  };
};