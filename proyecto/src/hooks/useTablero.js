import { useState } from 'react';

export const useTablero = () => {
  const [tablero, setTablero] = useState(() =>
    Array(10).fill(null).map(() => Array(10).fill(null))
  );

  return {
    tablero,
    setTablero,
  };
};
