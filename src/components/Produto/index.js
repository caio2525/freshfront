import React from 'react';
import './index.css';
import {useContext} from 'react';
import {AppContext} from '../Contexts/AppContext';
import {getProducts} from '../../utils';
import axios from "axios";

function Produto({product})
{
  const {

      setProductName,

      setProdutPrice,


      setImageUrl,

      setProductId,

      setProducts
  } = useContext(AppContext);

  const handleLimpar = () => {
    setProductName('')
    setProdutPrice('')
    setImageUrl('')
    setProductId('')
  }

  //função para deletar o produto atual mostrado no formulário
  const handleDeletar = (product_id) => {
    const url = 'http://127.0.0.1:5000/delete_product/' + product_id
    axios.post(url)
    .then(resp => {
      console.log('resp', resp)
    })
    .catch(error => {
      console.log('error', error)
      }
    )
    .finally(() => {
      handleLimpar()
      getProducts(setProducts)
    })

  }

  return(
    <div key={product._id} className="Item">

      <div className="Produto">
        <div className="ImgDiv">
          <img src={product.product_image}/>
        </div>
        <div>{product.product_name}</div>
        <div>{`R$ ${product.product_price}` }</div>
      </div>

      <div className="Actions">

        <button onClick={() => {
          setProductName(product.product_name)
          setProdutPrice(product.product_price)
          setImageUrl(product.product_image)
          setProductId(product._id)
        }}>
          <div className="img-icon">
            <img src={require('../../images/pencil.jpg')}/>
          </div>
        </button>

        <button onClick={() => {handleDeletar(product._id)}}>
          <div className="img-icon">
            <img src={require('../../images/x.png')}/>
          </div>
        </button>
      </div>

    </div>
  )
}

export default Produto;
