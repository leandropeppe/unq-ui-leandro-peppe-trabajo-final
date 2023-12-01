import React, { useState } from 'react';
import Barco from './Barco';
import './Tablero.css';
import ResetButton from './ResetButton.jsx'
import OrientationButton from './OrientationButton.jsx'
import CancelButton from './CancelButton.jsx'
import BarcosButtons from './BarcosButtons.jsx'

const Tablero = ({ jugador, jugador2, modoJuego, configurarBarcos }) => {
  const [tablero, setTablero] = useState(() =>
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
        setBarcos((prevBarcos) => ({
          ...prevBarcos,
          [tipoBarco]: { ...prevBarcos[tipoBarco], disponible: false },
        }));
        setBarcoSeleccionado(null);
        setCeldasPrevias([]);
      } else {
        alert('No se puede colocar el barco en esa posición. Elija otra posición.');
      }
    }
  };

  return (
    <div>
      <div>
        <h3>Jugador: {jugador}</h3>
        {jugador2 && <h3>Jugador 2: {jugador2}</h3>}
      </div>
      <div>
        {configurarBarcos ? (
          <div>
            <h4>Configuración de Barcos</h4>
            <p>Seleccione la posición de sus barcos:</p>
            <p>Click para colocar:</p>
            <div>
              <ResetButton onClick={() => reiniciarColocacionBarcos()}/>
              <BarcosButtons barcos={barcos} barcoSeleccionado={barcoSeleccionado} seleccionarBarco={seleccionarBarco} />
              <OrientationButton onClick={() => cambiarOrientacion()}/>
              <CancelButton onClick={() => setBarcoSeleccionado(null)} />
            </div>
          </div>
        ) : (
          <p>Turno de juego...</p>
        )}
      </div>
      {tablero.map((fila, indexFila) => (
        <div key={indexFila} className="fila">
          {fila.map((celda, indexColumna) => (
            <div
              key={indexColumna}
              className={`celda ${celda === 'B' ? 'ocupada' : ''}`}
              onClick={() => configurarBarcos && colocarBarco(indexFila, indexColumna)}
              onMouseOver={() => configurarBarcos && actualizarCeldasPrevias(indexFila, indexColumna)}
            >
              {celda === 'B' && <Barco key={`${indexFila}-${indexColumna}`} />}
              {configurarBarcos &&
                barcoSeleccionado &&
                celdasPrevias.some((celdaPrevia) => celdaPrevia.fila === indexFila && celdaPrevia.columna === indexColumna) && (
                  <div className="celda-previa" />
                )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tablero;
