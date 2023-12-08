import { useState, useEffect } from 'react';


export const useJuego = () => {

  const [turnoJugador, setTurnoJugador] = useState(true);
  const [juegoFinalizado, setJuegoFinalizado] = useState(false);
  const [contadorJugador, setContadorJugador] = useState(7);
  const [contadorComputadora, setContadorComputadora] = useState(7);
  const [situacionDeJuego, setSituacionDeJuego] = useState('');
  const [partidasGanadasJ1,setPartidasGanadasJ1] = useState(0)
  const [partidasGanadasPC,setPartidasGanadasPC] = useState(0)

  useEffect(() => {
    if (juegoFinalizado) {
      console.log('Partidas ganadas J1:' + partidasGanadasJ1)
      console.log('Partidas ganadas PC:' + partidasGanadasPC)
    }
  }, [juegoFinalizado, partidasGanadasJ1, partidasGanadasPC]);

  const aumentarImpactos = () => {
    if (turnoJugador) {
      setContadorJugador((prevContador) => prevContador + 1);
      console.log('Aumento al contador del jugador a ' + (contadorJugador + 1));
    } else {
      setContadorComputadora((prevContador) => prevContador + 1);
      console.log('Aumento al contador de la computadora a ' + (contadorComputadora + 1));
    }
  
    if (!juegoFinalizado) {
      if (contadorComputadora >= 13) {
        setPartidasGanadasPC((prevPartidas) => prevPartidas + 1);
        setSituacionDeJuego('Has Perdido..');
        setJuegoFinalizado(true);
      }
  
      if (contadorJugador >= 13) {
        setPartidasGanadasJ1((prevPartidas) => prevPartidas + 1);
        setSituacionDeJuego('Has Ganado!');
        setJuegoFinalizado(true);
      }
    }
  };

  
  

  

  return {
    turnoJugador,
    setTurnoJugador,
    juegoFinalizado,
    setJuegoFinalizado,
    situacionDeJuego,
    aumentarImpactos,
    partidasGanadasJ1,partidasGanadasPC ,setPartidasGanadasJ1,setPartidasGanadasPC
};
};