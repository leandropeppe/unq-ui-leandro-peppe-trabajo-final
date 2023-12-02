import React, { useState, useEffect } from 'react';
import Barco from './Barco';
import './Tablero.css'
const Tablero = ({ tablero, configurarBarcos, colocarBarco, actualizarCeldasPrevias, barcoSeleccionado, celdasPrevias }) => {
  
  return (
    <div className='tablero'>
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