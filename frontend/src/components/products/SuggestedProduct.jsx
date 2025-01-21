import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data'
import styles from '../../styles/styles'
import ProductCard from '../Route/ProductCard/ProductCard'

const SuggestedProduct = ({data}) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const relatedProducts = productData && productData.filter((item) => item.category === data.category)
        setProduct(relatedProducts)
    }, [])


  return (
    <div>
        {
            data ? (
                <div className={`p-4 ${styles.section}`}>
                    <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                        Suggested Product
                    </h2>

                    <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] mt-[30px] gap-[24px] row-gap-[50px]'>
                        {
                            product && product.map((item, index) => (
                                <ProductCard data={item} key={index} />
                            ))
                        }
                    </div>

                </div>

            ) : null
        }
    </div>
  )
}

export default SuggestedProduct