import { useState } from 'react';
import { useTablero } from './useTablero';
import { useBarcos } from './useBarcos';

export const useConfiguracion = () => {
  const { tablero, setTablero } = useTablero();
  const { barcos, setBarcos } = useBarcos();

  const [barcoSeleccionado, setBarcoSeleccionado] = useState(null);
  const [orientacionVertical, setOrientacionVertical] = useState(false);
  const [celdasPrevias, setCeldasPrevias] = useState([]);
  const [configuracionCompleta, setConfiguracionCompleta] = useState(false);
  

  const reiniciarColocacionBarcos = () => {
    setTablero(Array(10).fill(null).map(() => Array(10).fill(null)));
    setBarcos({
      portaaviones: { longitud: 5, disponible: true },
      crucero: { longitud: 4, disponible: true },
      submarino: { longitud: 3, disponible: true },
      lancha: { longitud: 2, disponible: true },
    });
    setBarcoSeleccionado(null);
    setCeldasPrevias([]);
    setConfiguracionCompleta(false);
  };

  const cambiarOrientacion = () => {
    setOrientacionVertical((prevOrientacion) => !prevOrientacion);
    setCeldasPrevias([]);
  };

  const seleccionarBarco = (tipoBarco) => {
    if (barcos[tipoBarco].disponible) {
      setBarcoSeleccionado(tipoBarco);
    }
  };

  const actualizarCeldasPrevias = (fila, columna) => {
    if (barcoSeleccionado) {
      const tipoBarco = barcoSeleccionado;
      const longitud = barcos[tipoBarco].longitud;

      const nuevasCeldasPrevias = [];
      for (let i = 0; i < longitud; i++) {
        if (orientacionVertical) {
          nuevasCeldasPrevias.push({ fila: fila + i, columna });
        } else {
          nuevasCeldasPrevias.push({ fila, columna: columna + i });
        }
      }

      const esPosibleColocar = nuevasCeldasPrevias.every(
        ({ fila, columna }) => fila >= 0 && fila < 10 && columna >= 0 && columna < 10
      );

      if (esPosibleColocar) {
        setCeldasPrevias(nuevasCeldasPrevias);
      } else {
        setCeldasPrevias([]);
      }
    }
  };

  const colocarBarco = (fila, columna) => {
    if (barcoSeleccionado) {
      const tipoBarco = barcoSeleccionado;
      const longitud = barcos[tipoBarco].longitud;

      if (verificarColocacionBarco(fila, columna, longitud, orientacionVertical,tablero)) {
        const nuevoTablero = tablero.map((filaTablero, indexFila) => {
          if (orientacionVertical && indexFila >= fila && indexFila < fila + longitud) {
            return filaTablero.map((celda, indexColumna) => (indexColumna === columna ? 'B' : celda));
          }
          if (!orientacionVertical && indexFila === fila) {
            return filaTablero.map((celda, indexColumna) =>
              indexColumna >= columna && indexColumna < columna + longitud ? 'B' : celda
            );
          }
          return filaTablero;
        });

        setTablero(nuevoTablero);
        setBarcos((prevBarcos) => {
          const updatedBarcos = {
            ...prevBarcos,
            [tipoBarco]: { ...prevBarcos[tipoBarco], disponible: false },
          };

          if (todosLosBarcosColocados(updatedBarcos)) {
            setConfiguracionCompleta(true);
          }

          return updatedBarcos;
        });

        setBarcoSeleccionado(null);
        setCeldasPrevias([]);
      } else {
        alert('No se puede colocar el barco en esa posición. Elija otra posición.');
      }
    }
  };

  const todosLosBarcosColocados = (barcos) => {
    return Object.values(barcos).every((barco) => !barco.disponible);
  };

  const verificarColocacionBarco = (fila, columna, longitud,orientacion,tablero) => {
    if (
      (orientacion && fila + longitud > 10) ||
      (!orientacion && columna + longitud > 10)
    ) {
      return false;
    }

    for (let i = 0; i < longitud; i++) {
      if (orientacion && tablero[fila + i][columna] === 'B') {
        return false;
      }
      if (!orientacion && tablero[fila][columna + i] === 'B') {
        return false;
      }

      
    }

    return true;
  };

  

  return {
    tablero, barcos, barcoSeleccionado, celdasPrevias, configuracionCompleta, orientacionVertical ,verificarColocacionBarco,
    reiniciarColocacionBarcos, cambiarOrientacion, seleccionarBarco, actualizarCeldasPrevias, colocarBarco,
  };
};
