import React from 'react';
import Barco from './MenuConfiguracion/Barco';
import './MenuConfiguracion/MenuConfiguracion.css';

const Tablero = ({ tablero, configurarBarcos, colocarBarco, actualizarCeldasPrevias, barcoSeleccionado, celdasPrevias, permitirAtaque, onAtaque, onCeldaClick }) => {
  const handleClick = (indexFila, indexColumna) => {
    if (configurarBarcos) {
      colocarBarco(indexFila, indexColumna);
      actualizarCeldasPrevias(indexFila, indexColumna);
    } else if (permitirAtaque) {
      onAtaque(indexFila, indexColumna);
    }

    // Llama a la función proporcionada desde el componente Juego para manejar el clic
    onCeldaClick && onCeldaClick(indexFila, indexColumna);
  };

  return (
    <div className='tablero'>
      {tablero.map((fila, indexFila) => (
        <div key={indexFila} className="fila">
          {fila.map((celda, indexColumna) => (
            <div
              key={indexColumna}
              className={`celda ${celda === 'B' ? 'ocupada' : ''} ${celda === 'impacto' ? 'impacto' : ''} ${celda === 'agua' ? 'agua' : ''}`}
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
