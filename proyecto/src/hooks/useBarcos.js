import { useState } from 'react';

export const useBarcos = () => {
  const [barcos, setBarcos] = useState({
    portaaviones: { longitud: 5, disponible: true, posiciones: [] },
    crucero: { longitud: 4, disponible: true, posiciones: [] },
    submarino: { longitud: 3, disponible: true, posiciones: [] },
    lancha: { longitud: 2, disponible: true, posiciones: [] },
  });

  return {
    barcos,
    setBarcos,
  };
};



/*
import { useState } from 'react';

export const useBarcos = () => {
  const [barcos, setBarcos] = useState({
    portaaviones: { longitud: 5, disponible: true },
    crucero: { longitud: 4, disponible: true },
    submarino: { longitud: 3, disponible: true },
    lancha: { longitud: 2, disponible: true },
  });

  return {
    barcos,
    setBarcos,
  };
};
*/