import React, { useState } from 'react'
import {productData} from '../../static/data.jsx'
import ProductCard from '../../components/Route/ProductCard/ProductCard.jsx'
import { Link } from 'react-router-dom'
import styles from '../../styles/styles'

const ShopProfileData = ({isOwner}) => {

    const [active, setActive] = useState(1)

  return (
    <div className='w-full mt-4 px-4 md:px-0'>
        {/* Header / Tab Navigation */}
        <div className='flex flex-col md:flex-row w-full items-center justify-between  '>
            <div className='w-full flex'>
                <div className='flex items-center' onClick={() => setActive(1)}>
                    <h5 className={`font-[600] text-[20px] ${active === 1 ? 'text-red-500 border-b-2 border-red-500' : 'text-[#333]'}  cursor-pointer pr-[30px] focus:outline-none`}>
                        All Products
                    </h5>

                </div>
                <div className='flex items-center' onClick={() => setActive(2)}>
                    <h5 className={`font-[600] text-[20px] ${active === 2 ? 'text-red-500 border-b-2 border-red-500' : 'text-[#333]'} cursor-pointer pr-[30px]`}>
                        Running Events
                    </h5>

                </div>
                <div className='flex items-center' onClick={() => setActive(3)}>{/*  i will add featured products just like kisaan here and also reviews */}
                    <h5 className={`font-[600] text-[20px] ${active === 3 ? 'text-red-500 border-b-2 border-red-500' : 'text-[#333]'} cursor-pointer`}>
                        Shop 
                    </h5>

                </div>

                
            </div>

            {
                    isOwner && (
                        <div className='mt-4 md:mt-0'>
                            <Link to='/dashboard'>
                                <div className={`${styles.button} !rounded-[8px] h-[42px]`}>
                                    <span className='text-[#fff]'>Go Dashboard</span>
                                </div>
                            </Link>
                        </div>
                    )
                }

        </div>

        <br />
       
        {active === 1 &&  /*  Product Listing */
        /*  Here we will fetch data from the shop */
        <div className='grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] mt-[30px] gap-[24px] row-gap-[50px]  border-0 '>
            {
                productData && productData.map((item, index) => (
                    <div key={index} >
                        <ProductCard data={item} isShop={true} />
                    </div>
                ))
            }
        </div>}
        {active === 2 && <div>Running Events</div>}
        {active === 3 && <div>Shop</div>} {/*  here we will fetch data from the shop */}
    </div>
  )
}

export default ShopProfileData