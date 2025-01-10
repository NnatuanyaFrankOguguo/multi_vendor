import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Headers'
import styles from '../styles/styles'
import { useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import ProductCard from '../components/Route/ProductCard/ProductCard'

const ProductPage = () => {
    // we need to filter the data(products) according to the category on the header which is selected
    // it appears on the url... so we will have to extract the particular category from there
    const [ searchParams ] = useSearchParams();
    const categoryData = searchParams.get("category");
    const [data, setData] = useState([])

    useEffect(() => {
        if (categoryData === null) {
            const items = productData && productData.sort((a, b) => a.total_sell - b.total_sell);
            setData(items);
        } else {
            const items = productData && productData.filter((product) => product.category === categoryData)
            setData(items);
        }
        window.scrollTo(0, 0); //

    }, [])
    

  return (
    <div>
        <Header activeHeading={3}/>
        <br />
        <br />
        <div className={`${styles.section}`}>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] mt-[30px] gap-[24px] row-gap-[50px]'>
                {
                    data && data.map((product, index) => <ProductCard data={product} key={index} />)
                }
                
            </div>

            {
                data && data.length === 0 ? (
                    <h1 className='text-center w-full pb-[100px] text-[20px]'>No Product Found!</h1>
                ) : null
            }
        </div>
    </div>
  )
}

export default ProductPage