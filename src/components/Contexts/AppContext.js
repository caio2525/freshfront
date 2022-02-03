
import React from 'react';
import {useState, createContext} from 'react';

export const AppContext = React.createContext({});

function AppContextProvider({children})
{
  const [productName, setProductName] = useState('')
  const [productPrice, setProdutPrice] = useState('')
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productId, setProductId] = useState('')
  const [products, setProducts] = useState([]);

  return(
    <AppContext.Provider
      value={{ productName: productName,
              setProductName: setProductName,
              productPrice: productPrice,
              setProdutPrice: setProdutPrice,
              image: image,
              setImage: setImage,
              imageUrl: imageUrl,
              setImageUrl: setImageUrl,
              productId: productId,
              setProductId: setProductId,
              products: products,
              setProducts: setProducts
       }}>
    {
      children
    }
    </AppContext.Provider>
  )
}

export default AppContextProvider;
