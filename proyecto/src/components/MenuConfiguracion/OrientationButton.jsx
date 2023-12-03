import React from 'react';
import './MenuConfiguracion.css';

const OrientationButton = ({onClick}) => {
    return (
        <button className='button' onClick={onClick}>Cambiar Orientación</button>
    );
};

export default OrientationButton;