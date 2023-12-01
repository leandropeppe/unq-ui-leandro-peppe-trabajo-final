// useBarcos.js
import { useState } from 'react';

const useBarcos = () => {
  const [barcos, setBarcos] = useState({
    portaaviones: { longitud: 5, disponible: true },
    crucero: { longitud: 4, disponible: true },
    submarino: { longitud: 3, disponible: true },
    lancha: { longitud: 2, disponible: true },
  });

  return { barcos, setBarcos };
};

export default useBarcos;
