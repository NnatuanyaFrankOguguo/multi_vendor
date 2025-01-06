import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/styles';
import { AiOutlineMessage } from 'react-icons/ai';

const ProductDetailCard = ({setOpen, open, data}) => {
    const [count, setCount ] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(false)

    const handleMessgaeSubmit = () => {

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
                        </div>
                    </div>
                </div>
            ) : null
        }
    </div>
  )
}

export default ProductDetailCard