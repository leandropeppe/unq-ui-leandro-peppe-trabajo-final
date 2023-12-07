import { useState } from 'react';


export const useJuego = () => {

  const [turnoJugador, setTurnoJugador] = useState(true);
  const [juegoFinalizado, setJuegoFinalizado] = useState(false);
  const [contadorJugador, setContadorJugador] = useState(1);
  const [contadorComputadora, setContadorComputadora] = useState(1);
  const [situacionDeJuego, setSituacionDeJuego] = useState('');

  const aumentarImpactos = () => {
      if (turnoJugador) {
          setContadorJugador(contadorJugador + 1);
          console.log('Aumento al contador del jugador a ' + contadorJugador);
      } else {
          setContadorComputadora(contadorComputadora + 1);
          console.log('Aumento al contador de la computadora a ' + contadorComputadora);
      }

      
      if (contadorComputadora == 14) {
          setSituacionDeJuego('Has Perdido..');
          setJuegoFinalizado(true);
      }
      if (contadorJugador == 14) {
        setSituacionDeJuego('Has Ganado!');
        setJuegoFinalizado(true);
    }
  };

  // Devolver un objeto con los valores
  return {
    turnoJugador,
    setTurnoJugador, // También puedes exponer setTurnoJugador si es necesario
    juegoFinalizado,
    situacionDeJuego,
    aumentarImpactos
};
};