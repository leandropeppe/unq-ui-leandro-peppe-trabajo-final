import './Juego.css';
import MenuPrincipal from '../MenuPrincipal/MenuPrincipal';
import MenuConfiguracion from '../MenuConfiguracion/MenuConfiguracion';
import { useState } from 'react';

const FinJuego = ({ganador}) => {

    

    const reiniciarPartida = () => {
       //<MenuConfiguracion/>
    }
    const irAMenuPrincipal = () => {
        //<MenuPrincipal/>
    }

    return (
        <div>
            <div className='ganador'>
                <h2>{ganador}</h2>
            </div>
            <button className='button' onClick={() => reiniciarPartida()}>Reiniciar Partida</button>
            <button className='button' onClick={() => irAMenuPrincipal()}>Menu Principal</button>
        </div>
    );
};

export default FinJuego;