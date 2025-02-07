import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { MdOutlineLocalOffer } from "react-icons/md";
import leaf from '../../../assets/leaf.webp'
import { AiOutlineGift } from 'react-icons/ai';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { BiMessageSquareDetail } from 'react-icons/bi';
import server from '../../../server';

const DashboardHeader = () => {
  const { store } = useSelector((state) => state.store);
  return (
    <div className="w-full h-[60px] bg-[#F5E1A4] shadow-md sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-1">
          <img src={leaf} alt="logo" className="h-10 w-10/12" loading="lazy" />
          <p className="text-base text-blue-900 font-semibold">FrankFort</p>
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4"> 
          <Link to="/dashboard-coupons">
            <AiOutlineGift color='#8B4513' size={30} className='mx-5 cursor-pointer' title='Coupons' />
          </Link>
          
          <Link to="/dashboard-events">
            <MdOutlineLocalOffer color='#8B4513' size={30} className='mx-5 cursor-pointer' title='Events' />
          </Link>

          <Link to="/dashboard-product">
            <FiShoppingBag color='#8B4513' size={30} className='mx-5 cursor-pointer' title='Products' />
          </Link>

          <Link to="/dashboard-order">
            <FiPackage color='#8B4513' size={30} className='mx-5 cursor-pointer' title='Orders' />
          </Link>

          <Link to="/dashboard-messages">
            <BiMessageSquareDetail color='#8B4513' size={30} className='mx-5 cursor-pointer' title='Messages' />
          </Link>
          
          
          <Link to={`/store/${store.id}`} className='flex flex-col items-center justify-center'>
              <img src={`${server}${store.avatar}`} alt="store logo" className="flex h-8 w-8 rounded-full" loading="lazy" title='Account' />
              <span className='text-[#555] text-sm'> {store.name}</span>

          </Link>
          
          
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader