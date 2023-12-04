import React from 'react';
import Barco from './MenuConfiguracion/Barco';

const Tablero = ({ tablero, configurarBarcos, colocarBarco, actualizarCeldasPrevias, barcoSeleccionado, celdasPrevias, permitirAtaque, onAtaque }) => {

  const handleClick = (indexFila, indexColumna) => {
    if (configurarBarcos) {
      // Lógica para configurar barcos
      colocarBarco(indexFila, indexColumna);
      actualizarCeldasPrevias(indexFila, indexColumna);
    } else if (permitirAtaque) {
      // Lógica para manejar ataques
      onAtaque(indexFila, indexColumna);
    }
  };

  return (
    <div className='tablero'>
      {tablero.map((fila, indexFila) => (
        <div key={indexFila} className="fila">
          {fila.map((celda, indexColumna) => (
            <div
              key={indexColumna}
              className={`celda ${celda === 'B' ? 'ocupada' : ''}`}
              onClick={() => handleClick(indexFila, indexColumna)}
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
