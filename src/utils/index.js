import axios from "axios";

export const getProducts = (setProducts) => {
  axios.get('http://127.0.0.1:5000/get_products')
  .then(resp => {
    console.log('resp', resp)
    setProducts(resp.data)
  })
  .catch(error => console.log('error', error))
}
