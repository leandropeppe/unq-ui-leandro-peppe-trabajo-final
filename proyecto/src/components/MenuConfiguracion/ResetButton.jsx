import React from 'react';
import './MenuConfiguracion.css';


const ResetButton = ({onClick}) => {
    return (
        <button className='button' onClick={onClick}>Reiniciar Colocación</button>
    );
};

export default ResetButton;
