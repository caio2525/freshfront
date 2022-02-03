
import './App.css';
import {useState, useEffect} from 'react';
import axios from "axios";
import Formulario from './components/Formulario';
import Produto from './components/Produto';
import {useContext} from 'react';
import {AppContext} from './components/Contexts/AppContext';
import {getProducts} from './utils';

function App() {

  const {
      products,
      setProducts
  } = useContext(AppContext);


  //Componente busca os produtos armazenados no banco de dados e "seta-os" no variável products
  useEffect(() => {
    getProducts(setProducts)
  }, [])


  return (
    <div className="App">

      <Formulario/>

      <div className="Produtos">
        {
          products
          ? products.map((product) => {
            return(
              <Produto key={product._id} product={product}/>
            )
          })
          :null
        }
      </div>

    </div>
  );
}

export default App;
