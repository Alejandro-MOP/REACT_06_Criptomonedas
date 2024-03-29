import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

/*==========================================
            Componentes CSS
==========================================*/

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 55px;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 2.5rem;
  margin: 8px 0;
  /*margin-top: 80px;*/

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #55a2fe;
    display: block;
  }
  
`;

/*==========================================
                APP
==========================================*/

function App() {

  //states que se alimentan del formulario & customHooks
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState ('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(()=>{

      const cotizarCriptomoneda = async () => {
          //evitar ejecución la primera vez 
          if(moneda === '') return;//console.log('cotizando...');

          //consultar la API para obtener la cotización
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

          const resultado = await axios.get(url); 
          //console.log(resultado.data.DISPLAY[criptomoneda][moneda]); con corchetes accesamos a las keys del objeto resultado de manera dinamica

          //mostrar el Spinner
          guardarCargando(true);

          //ocultar el spinner y mostrar el resultado
          setTimeout(()=> {
            
            guardarCargando(false);            
            guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

          },3000);
      }

      cotizarCriptomoneda();

  },[moneda,criptomoneda]);

  //Mostrar spinner o resultado
  const componente = (cargando) ?<Spinner /> :<Cotizacion resultado={resultado} />
      


  return (

      <Contenedor>
        <div>
          <Imagen
              src={imagen}
              alt="imagen criptomonedas"
          />
        </div>
        <div>
          <Heading>Cotizador de Criptomonedas al Instante</Heading>

          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />

         {componente}

        </div>
      </Contenedor>
  );
}

export default App;
