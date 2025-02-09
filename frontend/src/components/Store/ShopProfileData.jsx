import React from 'react'

const ShopProfileData = () => {
  return (
    <div className='w-full mt-4'>
        <div className='flex w-full items-center '>
            <div className='flex items-center'>
                <h5 className='font-[600] text-[20px] text-red-500 cursor-pointer pr-[30px]'>
                    All Products
                </h5>

            </div>
            <div className='flex items-center'>
                <h5 className='font-[600] text-[20px] cursor-pointer pr-[30px]'>
                    Running Events
                </h5>

            </div>
            <div className='flex items-center'>{/*  i will add featured products just like kisaan here and also reviews */}
                <h5 className='font-[600] text-[20px] cursor-pointer'>
                    Shop 
                </h5>

            </div>

        </div>
    </div>
  )
}

export default ShopProfileData