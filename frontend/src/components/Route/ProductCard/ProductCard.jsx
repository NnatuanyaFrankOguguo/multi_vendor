import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../styles/styles';
import { AiFillStar,AiFillHeart, AiOutlineHeart, AiOutlineStar, AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import ProductDetailCard from '../ProductDetailCard/ProductDetailCard.jsx'

const ProductCard = ({data}) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    const item = data.name
    const product_name = item.replace(/\s+/g, "-"); // removing the spaces from the product name and replacing it with -...so it can as part of the parameter directing to the productDetailsPage




  return (
    <div className='w-full mx-auto rounded-t-[15px] rounded-b-[10px] shadow-md relative cursor-pointer '>
        
        <Link to={`/product/${product_name}`} className=''> 
            <img src={data.image_Url[0].url} alt="products" className='w-full rounded-t-[15px] rounded-b-[5px] object-contain hover:scale-105 transition-transform duration-300 '/>
        </Link>
        <div className='flex flex-col md:pl-3 px-3'>
          <Link to='/' className='mt-[-7px]'>
              <h6 className={`${styles.shop_name} `}>{data.shop.name}</h6>
          </Link>

          <Link to={`product/${product_name}`}>
              <h4 className=' font-[500] md:text-[15px] text-[18px] pb-2 mt-[-10px] mb-[-5px]'>{data.name.length > 40 ? data.name.slice(0,40) + "..." : data.name}</h4>{/*added condition that if the name is greater than 40 characters add ... to the end to avoid long text */}

              {/* we will make the star dynamic later */}
              <div className="flex justify-end mb-[-6px]">
                <AiFillStar size={13} color='#f6BA00'  className='cursor-pointer '/>
                <AiFillStar size={13} color='#f6BA00' className='cursor-pointer'/>
                <AiFillStar size={13} color='#f6BA00' className='cursor-pointer'/>
                <AiFillStar size={13} color='#f6BA00' className='cursor-pointer'/>
                <AiOutlineStar size={13} color='#f6BA00' className='mr-2 cursor-pointer '/>
              </div>

              <div className="py-2 flex items-center justify-between">
                <div className='flex'>
                    <h5 className={`${styles.productDiscountPrice}`}>
                        ₦{
                          data.price === 0 ? data.price : data.discount_price //which is a logic that if there is a discount price(then check if the price is equal to zero if true show my real product price if false : show the discount price)
                        }
                    </h5>

                    <h4 className={`${styles.price} `}>
                        {
                          data.price ? "₦" + data.price : null
                        }
                    </h4>
                </div>

                <span className='font-[400] text-[15px] text-[#68d284] pb-1'>{ data.total_sell} sold </span>

              </div>
          </Link>
        </div>

        {/* side options */}
        <div>
          {
            click ? (
              <AiFillHeart size={22} className='cursor-pointer absolute right-2 top-5 hover:scale-125 transition-transform duration-300'
              onClick={() => setClick(!click)} color={click ? 'red' : '#333'} title='Remove from wishlist'/>
            ) : (
              <AiOutlineHeart size={22} className='cursor-pointer absolute right-2 top-5 hover:scale-125 transition-transform duration-300'
              onClick={() => setClick(!click)} color={click ? 'red' : '#333'} title='Add to wishlist'/>
            )
          }

          <AiOutlineEye size={22} className='cursor-pointer right-2 top-12 absolute hover:scale-125 transition-transform duration-300'
          onClick={() => setOpen(true)} color='#333' title='Quick View'/>

          <AiOutlineShoppingCart size={22} className='cursor-pointer right-2 top-20 absolute hover:scale-125 transition-transform duration-300'
          onClick={() => setClick(open)} color='#333' title='Add to cart'/>

          {
            open ? (
                <ProductDetailCard open={open} setOpen={setOpen} data={data}/>
            ) : null
          }
        </div>
        
        
              


    </div>
  )
}

export default ProductCard