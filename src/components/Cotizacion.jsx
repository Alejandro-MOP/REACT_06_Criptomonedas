import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
/*==========================================
            Componentes CSS
==========================================*/
const ResultadoDiv = styled.div`
  color: #252850;
  text-align: center;
  background-color: #e1e1e1;
  border: 3px solid #66a2fe;
  font-family: Arial, Helvetica, sans-serif;
  transition: 1s all ease; 

  &:hover{
    border-radius: 3rem;
  }
`;

const Info = styled.p`
  font-size: 18px;
  margin: 5px 0;

    span{
        font-weight: bold;
        font-family: 'Bebas Neue', cursive!important;
        font-size: 20px;
    }

`;

const Precio = styled.p`
  font-size: 30px;
  font-family:'Bebas Neue', cursive;
  margin: 10px;
`;

/*==========================================
            Cotizacion
==========================================*/

const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;

    //console.log(resultado);

    return ( 

        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio mas alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio mas bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación úultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>

     );
}
 
Cotizacion.propTypes = {
  resultado: PropTypes.object.isRequired
}
export default Cotizacion;