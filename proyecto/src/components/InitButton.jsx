import React from 'react';
import Juego from './Juego.jsx'

const InitButton = ({bool}) => {
    return (
        <button onClick={<Juego/>} disabled={!bool}>Iniciar Juego</button>
    );
};

export default InitButton;