import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

/*==========================================
            Componentes CSS
==========================================*/
const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.8rem;
  margin-top: 1rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: .5rem;
  -webkit-appearance: none;
  border-radius: .5rem;
  border: 3px solid #a98307;
  font-size: .8rem;
  font-weight: bold;
  text-align: center;
  background-color: #f2c96c;
`;

/*==========================================
            H O O K
==========================================*/
const useMoneda = (label, stateInicial, opciones) => {
    
    //state de nuestro custom hook
    const [state, actualizarState] = useState(stateInicial);

    const Seleccionar = () => (

        <Fragment>

            <Label>{label}</Label>

            <Select
                onChange={ e => actualizarState(e.target.value)}
                value={state}
            >
                <option> - Selecciona una opción - </option>

                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>  
                    ))
                }
                
            </Select>

        </Fragment>

    );

    //Retornar el State, interfaz y funcion que modifica el State
    return [state, Seleccionar, actualizarState];
}
 
export default useMoneda;
