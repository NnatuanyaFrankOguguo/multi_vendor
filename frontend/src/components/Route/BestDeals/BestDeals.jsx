import React, { useEffect, useState } from 'react'
import { productData } from '../../../static/data'
import styles from '../../../styles/styles'
import ProductCard from '../ProductCard/ProductCard.jsx'

const BestDeals = () => {
    // component to show best deals on the home page this is supposed to be dynamic but when we update the seller part and they upload their products
    //changing the data from static to dynamic
    const [data, setData ] = useState([])

    useEffect(() => {
        //here we are calculating the most highest most sold products and arranging them in ascending order in a array but this is according to the project
        //but mine i will have to do like my wdd schl project just pick five at random and display them
        const mostBought = productData && productData.sort((a,b) => b.total_sell - a.total_sell);
        const firstFive = mostBought.slice(0, 5);
        setData(firstFive)
    }, [])


  return (
    <div>
        <div className={`${styles.section} px-3 md:px-0`}>
            <div className={`${styles.heading}`}>
                <h1 className='text-2xl font-bold'>Best Deals</h1>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] mt-[30px] gap-[24px] row-gap-[50px]">
                {
                    data && data.map((item, index) => (
                        <ProductCard data={item} key={index} />
                    ))
                }
            </div>

        </div>
    </div>
  )
}

export default BestDeals