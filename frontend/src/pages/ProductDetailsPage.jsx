import React, { useState, useEffect } from 'react'
import Headers from '../components/Layout/Headers.jsx'
import Footer from '../components/Layout/Footer.jsx'
import ProductDetails from '../components/product/ProductDetails.jsx'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data.jsx';
import SuggestedProduct from '../components/products/SuggestedProduct.jsx'
import CategoryProduct from '../components/products/CategoryProduct.jsx'


const ProductDetailsPage = () => {

  const {name} = useParams(); //to get the name/id of the product from the URl
  const [data, setData] = useState(null)
  const productName = name.replace(/-/g, " "); //replace the - from the url with space so it can display the name well on the UI not with -

  useEffect(() => {
      // fetch the product details from your API here
      // and set the data state with the fetched product data
      //...   
      const productItem = productData.find((item) => item.name === productName);
      setData(productItem);
  }, [])

  return (
    <div>
      <Headers />
      <ProductDetails data={data}/>
      {
        data && <SuggestedProduct data={data} />
      }
      <CategoryProduct />
      <Footer />
    </div>
  )
}

export default ProductDetailsPage