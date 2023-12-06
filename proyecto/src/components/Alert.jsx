import { useState } from "react";
import './Alert.css'

const Alert = ({mensaje}) => { 

    

    return(
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Peligro:">
                <use xlinkHref="#exclamation-triangle-fill" />
            </svg>
            <div className="textoAlert">
                {mensaje}
            </div>
        </div>
    );
}

export default Alert;