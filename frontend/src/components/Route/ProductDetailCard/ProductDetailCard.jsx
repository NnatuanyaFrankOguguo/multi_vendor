import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/styles';
import { AiOutlineMessage } from 'react-icons/ai';
import { AiFillStar,AiFillHeart, AiOutlineHeart, AiOutlineStar, AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetailCard = ({setOpen, open, data}) => {
    const [count, setCount ] = useState(0)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(false)

    const handleMessgaeSubmit = () => {

    }

    const decrementCount = () => {
        if(count > 0) setCount(count - 1)
    }

    const incrementCount = () => {
        setCount(count + 1)
    }


  return (
    <div className='bg-[#ffff]'>
        {
            data ? (
                <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center '>
                    <div className='w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4'>
                        <RxCross1 size={30} className="absolute right-3 top-3 z-50 "onClick={() => setOpen(false)} />
                    
                        <div className="block w-full 800px:flex ">
                            <div className='w-full 800px:w-[50%]'>
                                <img src={data.image_Url[0].url} alt="" loading='lazy'/>
                                <div className='flex'>
                                    <img src={data.shop.shop_avatar.url} alt="" className='w-[50px] h-[50px] rounded-full mr-2 border border-red-500'loading='lazy'/>

                                    <div>
                                        <h3 className={`${styles.shop_name}`}>
                                            {data.shop.name}
                                        </h3>
                                        <h3 className='pb-3 text-[15px]'>
                                            ({data.shop.ratings}) Ratings
                                        </h3>
                                    </div>

                                </div>
                                <div className={`${styles.button} bg-[#000] mt-4 rounded h-11`} onClick={handleMessgaeSubmit}>
                                    <span className='text-[#fff] flex items-center'>
                                        Send Message <AiOutlineMessage className="ml-1"/>
                                    </span>

                                </div>
                                <h3 className='text-[16px] text-[red] mt-4'>
                                    ({data.total_sell}) Sold out
                                </h3>
                            </div>

                            <div className=' w-full 800px:w-[50%] pt-5 pl-[3px] pr-[3px]'>
                                <h1 className={`${styles.productTitle} text-[19px]`}>
                                   {data.name}
                                </h1>
                                <p>
                                    {data.description}
                                </p>

                                <div className='flex pt-4'>
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        ₦{data.discount_price}
                                    </h4>
                                    <h3 className={`${styles.price} `}>{data.price ? "₦" + data.price : null} </h3>
                                </div>

                                <div className="flex items-center mt-10 justify-between pr-3">
                                    <div>
                                        <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                        onClick={decrementCount}> -

                                        </button>
                                        <span className='bg-gray-200 text-gray-800 font-meduim px-4 py-[11px]'>
                                            {count}
    
                                        </span>
                                        <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                        onClick={incrementCount}> +

                                        </button>
                                    </div>

                                    <div>
                                        {
                                            click ? (
                                                <AiFillHeart size={22} className='cursor-pointer  hover:scale-125 transition-transform duration-300'
                                                onClick={() => setClick(!click)} color={click ? 'red' : '#333'} title='Remove from wishlist'/>
                                            ) : (
                                                <AiOutlineHeart size={22} className='cursor-pointer hover:scale-125 transition-transform duration-300'
                                                onClick={() => setClick(!click)} color={click ? 'red' : '#333'} title='Add to wishlist'/>
                                            )
                                        }
                                    </div>
                                </div>
                                
                                <div className={`${styles.button} mt-6 rounded h-8 flex items-center`}>
                                    <span className='text-[#fff] flex items-center'>
                                        Add to Cart <AiOutlineShoppingCart className="ml-1"/>
                                    </span>
                                </div>

                            </div>

                            
                           
                        </div>
                    </div>
                </div>
            ) : null
        }
    </div>
  )
}

export default ProductDetailCard