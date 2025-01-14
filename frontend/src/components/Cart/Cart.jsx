import React, { useState } from 'react'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import {IoBagHandleOutline } from 'react-icons/io5'
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from '../../styles/styles'
import { Link } from 'react-router-dom';

const Cart = ({setOpenCart}) => {
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
                    <RxCross2 size={30} className='cursor-pointer' onClick={() => setOpenCart(false)} />
                </div>

                {/* ITEMS LENGTH */}
                <div className={`${styles.normalFlex}  px-4`}>
                    <IoBagHandleOutline size={25}/>
                    <h5 className='pl-2 text-[20px] font-[500]'>
                        3 items
                    </h5>
                </div>

                {/* CART ITEMS */}
                <br />
                <div className='w-full border-t'>
                    {
                        cartData && cartData.map((item, index) => (
                            <CartSingle key={index} data={item} />
                        ))
                    }
                </div>
            </div>

            {/* TOTAL PRICE CHECKOUT BUTTON */}
            <div className="px-5 mb-3">
                <Link to='/checkout'>
                    <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[3px] `}>
                        <h1 className='text-[#fff] text-[18px] font-[600] '>
                            Checkout Now (NGN ₦5000)
                        </h1>

                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

const CartSingle = ({data, key}) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;

    return (
        <div className="border-b py-3 px-4">
            <div className="w-full flex items-center">
                <div>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
                     onClick={() => setValue(value + 1)}>
                        <HiPlus size={14} color="#fff" />
                    </div>
                    <span className='pl-[8px]'>{value}</span>
                    <div className='bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer'
                     onClick={() => setValue(value === 1 ? 1 : value - 1)}>
                        <HiOutlineMinus size={14} color="#000" />

                    </div>

                </div>

                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0YFL0IZ0d1VJT_NoBkdM2Cg1aJCa7rOMAfHRDIh6Kw42zNaekwnTWgOvDXQTv-l9qlAR4kfz5RGPv6BMdeN01fursyQDH92wlm61zUZZt" alt=""
                className='w-[50px] h-[50px] ml-5' />

                <div className='pl-[20px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#FF6347]'>₦{data.price} * {value} </h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] font-Roboto'>₦{totalPrice}</h4>
                </div>

                <RxCross1 className='cursor-pointer' size={20} color='#d02222'/>

            </div>
           
        </div>
    )
}

export default Cart