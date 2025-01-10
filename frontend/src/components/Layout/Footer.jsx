import React from 'react'
import logo from '../../assets/leaf.webp'
import { Link } from 'react-router-dom'
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineTwitter,
  } from "react-icons/ai";
import { footerProductLinks, footercompanyLinks, footerSupportLinks } from '../../static/data';

const Footer = () => {
  return (
    <div className=' bg-[#556e2a] text-white'>
        <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#131313] py-7'>
            <h1 className='lg:text-3xl text-2xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5'>
                <span className='text-[#56d879]'>Susbcribe </span> to our weekly <br/>
                newsletter for events and offers!
            </h1>

            <div>
                <input type="text" required placeholder='Enter your Email...' 
                className='text-gray-500 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none' />
                <button className='bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2 rounded-md text-white md:w-auto w-full'>
                    Submit
                </button>
            </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-[150px] sm:px-8 px-5 py-12 sm:text-center">
            <ul className='px-5 text-center sm:text-start flex sm:block flex-col items-center'>
                <div className='flex items-center space-x-2 '>
                    <Link to='/' className="flex items-center space-x-1">
                        <img src={logo} alt='logo' className='h-10 w-10/12' loading='lazy'/>
                        <p className="text-base font-semibold">FrankFort</p>
                    </Link>
                </div>
                <br />
                <p className='font-bold w-[250px] text-[15px]'>Harvesting Connections, Growing Futures to Cultivating Quality, Connecting Farmers. </p>
                <div className='flex item-center mt-[15px]'>
                    <AiFillFacebook size={25} className="cursor-pointer" />
                    <AiOutlineTwitter
                    size={25}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    />
                    <AiFillInstagram
                    size={25}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    />
                    <AiFillYoutube
                    size={25}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    />

                </div>
            </ul>

            <ul className="text-center sm:text-start">
                <h1 className='mb-1 font-semibold text-[18px]'> Company </h1>
                {footerProductLinks.map((link) => {
                    return (
                        <li key={link.name}>
                            <Link className='text-gray-200 hover:text-teal-400 duration-300 text-md cursor-pointer leading-6'>
                                {link.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <ul className="text-center sm:text-start ">
                <h1 className='mb-1 font-semibold text-[18px]'> Shop </h1>
                {footercompanyLinks.map((link) => {
                    return (
                        <li key={link.name}>
                            <Link className='text-gray-200 hover:text-teal-400 duration-300 text-md cursor-pointer leading-6'>
                                {link.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <ul className="text-center sm:text-start ">
                <h1 className='mb-1 font-semibold text-[18px]'> Support </h1>
                {footerSupportLinks.map((link) => {
                    return (
                        <li key={link.name}>
                            <Link className='text-gray-200 hover:text-teal-400 duration-300 text-md cursor-pointer leading-6'>
                                {link.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>

            
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center pt-2 text-gray-200 text-md pb-8'>
                <span>
                    © Copyright 2025 FrankFurt, All rights reserved.
                </span>
                <span>Terms • privacy policy</span>
                <div className='sm:block flex items-center justify-center w-full'>
                    <img src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75" alt="" />

                </div>
            </div>
    </div>
  )
}

export default Footer