import React, { useState } from 'react';

export const useConfiguracion = () => {

  const [tablero, setTablero] = useState(() =>
    Array(10).fill(null).map(() => Array(10).fill(null))
  );
  const [tableroComputadora, setTableroComputadora] = useState(() =>
    Array(10).fill(null).map(() => Array(10).fill(null))
  );
  
  const [barcos, setBarcos] = useState({
    portaaviones: { longitud: 5, disponible: true },
    crucero: { longitud: 4, disponible: true },
    submarino: { longitud: 3, disponible: true },
    lancha: { longitud: 2, disponible: true },
  });
  const [barcoSeleccionado, setBarcoSeleccionado] = useState(null);
  const [orientacionVertical, setOrientacionVertical] = useState(false);
  const [celdasPrevias, setCeldasPrevias] = useState([]);
  const [configuracionCompleta, setConfiguracionCompleta] = useState(false);
  


  const verificarColocacionBarco = (fila, columna, longitud) => {
    if ((orientacionVertical && fila + longitud > 10) || (!orientacionVertical && columna + longitud > 10)) {
      return false;
    }

    for (let i = 0; i < longitud; i++) {
      if (orientacionVertical) {
        if (tablero[fila + i][columna] === 'B') {
          return false;
        }
      } else {
        if (tablero[fila][columna + i] === 'B') {
          return false;
        }
      }
    }

    return true;
  };

  const generarCeldasPrevias = (fila, columna, longitud) => {
    const celdasPrevias = [];

    for (let i = 0; i < longitud; i++) {
      if (orientacionVertical) {
        celdasPrevias.push({ fila: fila + i, columna });
      } else {
        celdasPrevias.push({ fila, columna: columna + i });
      }
    }

    return celdasPrevias;
  };

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
    setConfiguracionCompleta(false)
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

      // Verificar si es posible colocar el barco en la posición seleccionada
      const nuevasCeldasPrevias = generarCeldasPrevias(fila, columna, longitud);
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
  
      // Verificar si es posible colocar el barco en la posición seleccionada
      if (verificarColocacionBarco(fila, columna, longitud)) {
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
  
          // Verificar si todos los barcos han sido colocados
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
    // Verificar si todos los barcos han sido colocados
    return Object.values(barcos).every(barco => !barco.disponible);
  };
  

  

  return {  tablero, barcos, barcoSeleccionado, celdasPrevias,configuracionCompleta,tableroComputadora,
            reiniciarColocacionBarcos,cambiarOrientacion, 
            seleccionarBarco, actualizarCeldasPrevias, colocarBarco
          }
}