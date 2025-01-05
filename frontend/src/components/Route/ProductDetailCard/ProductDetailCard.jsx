import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

const ProductDetailCard = ({setOpen, open, data}) => {
    const [count, setCount ] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(false)


  return (
    <div className='bg-[#ffff]'>
        {
            data ? (
                <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
                    <div className='w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4'>
                        <RxCross1 size={30} className="absolute right-3 top-3 z-50 "onClick={() => setOpen(false)} />
                    </div>
                </div>
            ) : null
        }
    </div>
  )
}

export default ProductDetailCard