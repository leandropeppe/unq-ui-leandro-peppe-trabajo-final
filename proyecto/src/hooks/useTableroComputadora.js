import { useState } from 'react';
import { useBarcos } from './useBarcos';
import { useConfiguracion } from './useConfiguracion';

export const useTableroComputadora = () => {

  const { barcos, setBarcos, actualizarPosicionesBarco} = useBarcos();

  const { verificarColocacionBarco, orientacionVertical } = useConfiguracion();

  const [tableroComputadora, setTableroComputadora] = useState(() =>
    Array(10).fill(null).map(() => Array(10).fill(null))
  );

  const configurarTableroComputadoraAleatorio = () => {
    const nuevoTableroComputadora = Array(10).fill(null).map(() => Array(10).fill(null));
    const nuevosBarcos = { ...barcos }; // Copiar el objeto barcos

    Object.keys(barcos).forEach((tipoBarco) => {
      const longitud = nuevosBarcos[tipoBarco].longitud;

      let colocacionExitosa = false;
      while (!colocacionExitosa) {
        const fila = Math.floor(Math.random() * 10);
        const columna = Math.floor(Math.random() * 10);
        const orientacion = Math.random() < 0.5 ? orientacionVertical : !orientacionVertical;

        if (
          verificarColocacionBarco(
            fila,
            columna,
            longitud,
            orientacion,
            nuevoTableroComputadora
          )
        ) {
          colocarBarcoAleatorio(
            fila,
            columna,
            longitud,
            orientacion,
            nuevoTableroComputadora
          );

          actualizarPosicionesBarco(tipoBarco, fila, columna, longitud, orientacionVertical);

          colocacionExitosa = true;
        }
      }
    });

    setTableroComputadora(nuevoTableroComputadora);
    setBarcos(nuevosBarcos); 
  };

  const colocarBarcoAleatorio = (fila, columna, longitud, orientacion, tablero) => {
    for (let i = 0; i < longitud; i++) {
      if (!orientacion && fila < tablero.length && columna + i < tablero[0].length) {
        tablero[fila][columna + i] = 'B';
      } else if (orientacion && fila + i < tablero.length && columna < tablero[0].length) {
        tablero[fila + i][columna] = 'B';
      }
    }
  };

  return { tableroComputadora, setTableroComputadora, configurarTableroComputadoraAleatorio };
};
