import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import {IoBagHandleOutline } from 'react-icons/io5'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom';
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from 'react-icons/ai';

const Wishlist = ({setOpenWishlist}) => {
    // now the cart data supposed to be dynamic and also we will store the cart items in the database(with api) not on local storage for mobile devices too
    const cartData = [
        {
            name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver colour",
            description: "test",
            price: 999,
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver colour",
            description: "test",
            price: 555,
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver colour",
            description: "test",
            price: 333,
        },
        

    ]

  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
        <div className="fixed top-0 right-0 h-full w-[30%] bg-white flex flex-col justify-between shadow-md">
            <div >
                <div className="flex w-full justify-end pt-2 pr-5">
                    <RxCross2 size={30} className='cursor-pointer' onClick={() => setOpenWishlist(false)} />
                </div>

                {/* ITEMS LENGTH */}
                <div className={`${styles.normalFlex}  px-4`}>
                    <AiOutlineHeart size={25}/>
                    <h5 className='pl-2 text-[20px] font-[500]'>
                        3 items
                    </h5>
                </div>

                {/* CART ITEMS */}
                <br />
                <div className='w-full border-t'>
                    {
                        cartData && cartData.map((item, index) => (
                            <WishlistSingle key={index} data={item} />
                        ))
                    }
                </div>
            </div>

            
        </div>
    </div>
  )
}

const WishlistSingle = ({data, key}) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;

    return (
        <div className="border-b py-3 px-4">
            <div className="w-full flex items-center">
                <RxCross2 className='items-center cursor-pointer' size={23} color='#d02222'/>
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0YFL0IZ0d1VJT_NoBkdM2Cg1aJCa7rOMAfHRDIh6Kw42zNaekwnTWgOvDXQTv-l9qlAR4kfz5RGPv6BMdeN01fursyQDH92wlm61zUZZt" alt=""
                className='w-[50px] h-[50px] ml-8'/>
               
                

                <div className='pl-[20px]'>
                    <h1 className='text-[15px] '>{data.name}</h1>
                    
                    <h4 className='font-[600] text-[17px] pt-[3px] font-Roboto'>₦{totalPrice}</h4>
                </div>

                <div>
                    <BsCartPlus size={23} className='cursor-pointer ml-3' title='Add to cart'/>
                </div>

            </div>
           
        </div>
    )
}

export default Wishlist