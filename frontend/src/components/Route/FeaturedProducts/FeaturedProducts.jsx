import React from 'react'
import styles from '../../../styles/styles'
import { productData } from '../../../static/data'
import ProductCard from '../ProductCard/ProductCard'

const FeaturedProducts = () => {
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h1 className='text-2xl font-bold '>Featured Products</h1>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] mt-[30px] gap-[24px] row-gap-[50px]">
                {
                    productData && productData.map((product, index) => <ProductCard data={product} key={index}/>

                    )
                }
            </div>


        </div>
    </div>
  )
}

export default FeaturedProducts