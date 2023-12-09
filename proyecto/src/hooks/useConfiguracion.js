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
  
  const [tirosComputadora, setTirosComputadora] = useState([]);

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  

  const reiniciarColocacionBarcos = () => {
    setTablero(Array(10).fill(null).map(() => Array(10).fill(null)));
    setBarcos({
      portaaviones: { longitud: 5, disponible: true, posiciones: [] },
    crucero: { longitud: 4, disponible: true, posiciones: [] },
    submarino: { longitud: 3, disponible: true, posiciones: [] },
    lancha: { longitud: 2, disponible: true, posiciones: [] },
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
  
      if (verificarColocacionBarco(fila, columna, longitud, orientacionVertical, tablero)) {
        const nuevasPosiciones = [];
        const nuevoTablero = tablero.map((filaTablero, indexFila) => {
          const filaActual = orientacionVertical ? fila + indexFila : fila;
          const columnaActual = orientacionVertical ? columna : columna + indexFila;
          nuevasPosiciones.push({ fila: filaActual, columna: columnaActual });
  
          if (orientacionVertical && indexFila >= fila && indexFila < fila + longitud) {
            return filaTablero.map((celda, indexColumna) => {
              const dentroDelBarco =
                indexColumna === columna && indexFila >= fila && indexFila < fila + longitud;
              if (dentroDelBarco) {
                nuevasPosiciones.push({ fila: fila + indexFila, columna });
                return 'B';
              }
              return celda;
            });
          }
          if (!orientacionVertical && indexFila === fila) {
            return filaTablero.map((celda, indexColumna) => {
              const dentroDelBarco =
                indexColumna >= columna && indexColumna < columna + longitud;
              if (dentroDelBarco) {
                nuevasPosiciones.push({ fila, columna: columna + indexColumna });
                return 'B';
              }
              return celda;
            });
          }
          return filaTablero;
        });
  
        /*console.log(`Posiciones del barco ${tipoBarco}:`);
        nuevasPosiciones.forEach((posicion) => {
          console.log(`(${posicion.fila}, ${posicion.columna})`);
        });*/

        setTablero(nuevoTablero);
        setBarcos((prevBarcos) => {
          const updatedBarcos = {
            ...prevBarcos,
            [tipoBarco]: {
              ...prevBarcos[tipoBarco],
              disponible: false,
              posiciones: nuevasPosiciones,
            },
          };

          
  
          if (todosLosBarcosColocados(updatedBarcos)) {
            setConfiguracionCompleta(true);
          }
  
          return updatedBarcos;
        });
  
        setBarcoSeleccionado(null);
        setCeldasPrevias([]);
      } else {
        setMensajeAlerta('No se puede colocar un barco sobre otro. Elija otra posición.');
        setMostrarAlerta(true);
        setTimeout(() => {
          setMostrarAlerta(false);
        }, 2000);
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
    tablero, barcos, barcoSeleccionado, celdasPrevias, configuracionCompleta, orientacionVertical, tirosComputadora,mostrarAlerta,mensajeAlerta,
    realizarTiroComputadora, verificarColocacionBarco, reiniciarColocacionBarcos, cambiarOrientacion, seleccionarBarco,
    actualizarCeldasPrevias, colocarBarco,
  };
};
