import { useState } from 'react';

export const useBarcos = () => {
  const [barcos, setBarcos] = useState({
    portaaviones: { longitud: 5, disponible: true, posiciones: [] },
    crucero: { longitud: 4, disponible: true, posiciones: [] },
    submarino: { longitud: 3, disponible: true, posiciones: [] },
    lancha: { longitud: 2, disponible: true, posiciones: [] },
  });

  const actualizarPosicionesBarco = (tipoBarco, fila, columna, longitud, orientacionVertical) => {
    const nuevasPosiciones = [];
  
    for (let i = 0; i < longitud; i++) {
      if (orientacionVertical) {
        nuevasPosiciones.push([fila + i, columna]);
      } else {
        nuevasPosiciones.push([fila, columna + i]);
      }
    }
  
  
    setBarcos((prevBarcos) => ({
      ...prevBarcos,
      [tipoBarco]: {
        ...prevBarcos[tipoBarco],
        posiciones: nuevasPosiciones,
      },
    }));
  };
  
  
  



  return {
    barcos,
    setBarcos,
    actualizarPosicionesBarco,
  };
};

