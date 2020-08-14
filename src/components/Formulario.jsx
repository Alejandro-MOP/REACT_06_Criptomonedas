import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from '../components/Error';
import PropTypes from 'prop-types';


/*==========================================
            Componentes CSS
==========================================*/

const Boton = styled.input`
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  color: #fff;
  transition: all 1.5s ease;

  &:hover{
      background-color: #325ac0;
      cursor:pointer;
      border-radius: 2rem;
  }
`;


/*==========================================
                Formulario
==========================================*/

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //State del listado de criptomonedas
    const [listadocripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);
    

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]; 

    //Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);
    
    //Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listadocripto); //pasamos los resultados de la consulta (listadocripto) al hook para el Select


    //Ejecutar llamada a la API
    useEffect(()=>{
        const consultarAPI = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            
            const resultado = await axios.get(url); //console.log(resultado.data.Data);

            //guarda la información en el state
            guardarCriptomonedas(resultado.data.Data);
            
        }

        consultarAPI();
    },[]);

    //Cuando se ejecute el Submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar campos vacios
        if(moneda === '' || moneda === '- Selecciona una opción -'  || criptomoneda === '' || criptomoneda === '- Selecciona una opción -'){
            guardarError(true);
            return;
        }

       //pasar los datos al componente principal
        guardarError(false);

        guardarMoneda(moneda); //customHook {SelectMonedas}
        guardarCriptomoneda(criptomoneda);//customHook {SelectCripto}
    }

/*==========================================
            Componentes R E A C T
==========================================*/
    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {(error)
                ? <Error mensaje="Todos los campos son obligatorios / Seleccione una opción válida"/>
                : null
            }

            <SelectMonedas />

            <SelectCripto />

            <Boton 
                type="submit"
                value="Calcular"
            />
            
        </form>
     );
}
 
Formulario.propTypes = {
    guardarMoneda: PropTypes.func.isRequired , 
    guardarCriptomoneda: PropTypes.func.isRequired
}
export default Formulario;