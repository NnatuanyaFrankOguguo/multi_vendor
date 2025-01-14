import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Headers'
import styles from '../styles/styles'
import { useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import ProductCard from '../components/Route/ProductCard/ProductCard'

const BestSellingPage = () => {
    // we need to filter the data(products) according to the category on the header which is selected
    // it appears on the url... so we will have to extract the particular category from there
   
    const [data, setData] = useState([])

    useEffect(() => {
        const mostSales = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
        setData(mostSales);

    }, [])
    

  return (
    <div>
        <Header activeHeading={2}/>
        <br />
        <br />
        <div className={`${styles.section}`}>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] mt-[30px] gap-[24px] row-gap-[50px]'>
                {
                    data && data.map((product, index) => <ProductCard data={product} key={index} />)
                }
                
            </div>
        </div>
    </div>
  )
}

export default BestSellingPage