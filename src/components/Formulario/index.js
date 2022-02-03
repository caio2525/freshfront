import React from 'react';
import './index.css';
import {useContext} from 'react';
import {AppContext} from '../Contexts/AppContext';
import {getProducts} from '../../utils';
import axios from "axios";

function Formulario() {

  const {
      productName,
      setProductName,
      productPrice,
      setProdutPrice,
      image,
      setImage,
      imageUrl,
      setImageUrl,
      productId,
      setProductId,
      products,
      setProducts
  } = useContext(AppContext);

  //função para lidar com a entrada de imagem pelo usuário
  const handleImageChange = (event) => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    //console.log('file', typeof(file))

    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
    }
    reader.readAsDataURL(file)

  }

  //função para limpar os campos do formulário
  const handleLimpar = () => {
    setProductName('')
    setProdutPrice('')
    setImageUrl('')
    setProductId('')
  }

  //função para deletar o produto atual mostrado no formulário
  const handleDeletar = () => {
    const url = 'http://127.0.0.1:5000/delete_product/' + productId
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

  //função para enviar um novo produto para ser adicionado ao banco de dados
  const handleAdd = (fd) => {
    axios.post('http://127.0.0.1:5000/add_product', fd)
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

  ////função para enviar novos valores para editar um produto existente no banco de dados
  const handleEdit = (fd) => {
    const url = 'http://127.0.0.1:5000/edit_product/' + productId
    axios.post(url, fd)
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

  /*função para limpar com o botão submit,
  caso não haja um id no Formulario,
  significa que um novo produto deve ser criado,
  caso haja um id,
  significa que um produto deve ser editado. 
  */
  const handleSubmit = () =>{

    const fd = new FormData();
    fd.append('product_name', productName)
    fd.append('product_price', productPrice)
    fd.append('product_image', imageUrl)

    if(productId)
    {
      handleEdit(fd)
    }
    else {
      handleAdd(fd)
    }

  }

  return(
    <div className="containerForm">
      <form className="Formulario">

        <div className="form-group">
          {
            imageUrl
            ? <div className="ImgDiv">
                <img src={imageUrl}/>
              </div>
            :null
          }
          <label>{`Product Image: ` }
            <input
              type="file"
              onChange={(event) => handleImageChange(event)}/>
            >
          </label>

        </div>

        <div className="form-group">
          <label>{`Product Name: ` }
            <input
              required
              type="text"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}/>
          </label>
        </div>

        <div className="form-group">
          <label>{`Product Price: ` }
            <input
              step="0.10"
              type="number"
              value={productPrice}
              onChange={(event) => setProdutPrice(event.target.value)}/>
          </label>
        </div>
      </form>

      <div className="buttons">

        <button disabled={productName === '' || productPrice === '' || imageUrl === '' }onClick={() => handleSubmit()}>
          <div className="img-icon">
            <img src={require('../../images/check.png')}/>
          </div>
        </button>

        <button disabled={productId === ''} onClick={() => handleDeletar()}>
          <div className="img-icon">
            <img src={require('../../images/eraser.png')}/>
          </div>
        </button>

      </div>

    </div>

  )
}

export default Formulario;
