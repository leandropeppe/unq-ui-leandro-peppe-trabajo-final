import { useState, useEffect } from 'react';
import { useBarcos } from './useBarcos';


export const useJuego = () => {

  const [turnoJugador, setTurnoJugador] = useState(true);
  const [juegoFinalizado, setJuegoFinalizado] = useState(false);
  const [contadorJugador, setContadorJugador] = useState(0);
  const [contadorComputadora, setContadorComputadora] = useState(0);
  const [situacionDeJuego, setSituacionDeJuego] = useState('');
  const [partidasGanadasJ1,setPartidasGanadasJ1] = useState(0)
  const [partidasGanadasPC,setPartidasGanadasPC] = useState(0)
  
  const {barcos} = useBarcos();

  const [tableroJuegoComputadora, setTableroJuegoComputadora] = useState(() =>
  Array(10).fill(null).map(() => Array(10).fill({ estado: null, tieneBarco: false }))
  );
  
  const [tableroJuegoJugador, setTableroJuegoJugador] = useState(() =>
  Array(10).fill(null).map(() => Array(10).fill(null))
  );

  useEffect(() => {
    if (juegoFinalizado) {
      console.log('Partidas ganadas J1:' + partidasGanadasJ1)
      console.log('Partidas ganadas PC:' + partidasGanadasPC)
    }
  }, [juegoFinalizado, partidasGanadasJ1, partidasGanadasPC]);

  const aumentarImpactos = () => {
    if (turnoJugador) {
      setContadorJugador((prevContador) => prevContador + 1);
      //console.log('Aumento al contador del jugador a ' + (contadorJugador + 1));
    } else {
      setContadorComputadora((prevContador) => prevContador + 1);
      //console.log('Aumento al contador de la computadora a ' + (contadorComputadora + 1));
    }
  
    if (contadorComputadora >= 13 || contadorJugador >= 13) {
      if (contadorComputadora >= 13) {
        setPartidasGanadasPC((prevPartidas) => prevPartidas + 1);
        setSituacionDeJuego('Has Perdido..');
      } else {
        setPartidasGanadasJ1((prevPartidas) => prevPartidas + 1);
        setSituacionDeJuego('Has Ganado!');
      }
      setJuegoFinalizado(true);
    }
  };




  

  return {
    turnoJugador,
    setTurnoJugador,
    juegoFinalizado,
    setJuegoFinalizado,
    situacionDeJuego,
    aumentarImpactos,
    partidasGanadasJ1,partidasGanadasPC ,setPartidasGanadasJ1,setPartidasGanadasPC,

    tableroJuegoComputadora, setTableroJuegoComputadora , 
    tableroJuegoJugador, setTableroJuegoJugador
  };
};