import React from 'react'
import { useSelector } from 'react-redux'
import server from '../../server'
import styles from '../../styles/styles'

const ShopInfo = ({isOwner}) => {

    const { store } = useSelector((state) => state.store)
    console.log(store)

    const LogoutHandler = () => {
        console.log('logout')
    }

    //add the isVerified === true put a good mark on it
    //if it isnt leave it blank


  return (
    <div className='rounded-md bg-white shadow-sm p-2'>
        <div className='flex flex-col md:flex-row justify-between items-start '>
            {/* First Detail */}
            <div className='flex-1 p-2 '>
                <img src={`${server}${store?.avatar}`} alt="" 
                className='w-[150px] h-[150px] object-cover' loading='lazy'/>
                <h2 className="text-xl font-bold py-3 px-4">{store.name}</h2>
            </div>

            {/* Second Detail  remove the detail two three part*/}
            <div className="flex-1 p-2 ">
                <p className='text-[#200e0ea6] pb-1'><span className='font-bold text-[#555] mr-1'>Phone Number : </span>{store.phoneNumber}</p>
                <p className='text-[#000000a6] pb-1'><span className='font-bold text-[#555] mr-1'>Address : </span>{store.address}</p>
                <div className='flex gap-3 pb-1'>
                    <p className='text-[#000000a6]'><span className='font-bold text-[#555] mr-1'>State : </span>{store.address}</p>
                    <p className='text-[#000000a6]'><span className='font-bold text-[#555] mr-1'>City : </span>{store.address}</p>
                </div>
                <p className='text-[#000000a6] pb-1'><span className='font-bold text-[#555] mr-1'>Shop Ratings : </span>{store.rating}</p>
                <p className='text-[#000000a6] pb-1'><span className='font-bold text-[#555] mr-1'>Total Products : </span>5</p>
                
               
                
            </div>

            {/* third Detail */}
            <div className="flex-1 p-2">
            <h2 className="text-xl font-bold">Account Type : </h2>
            <p>{store.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit possimus nulla quae voluptate nisi soluta minus quasi 
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est nihil libero rerum delectus! reiciendis vitae rem omnis quia, laboriosam non
            repudiandae alias culpa, dolore officiis labore?</p>
            </div>
        </div>

        {
            isOwner && (
                <div className='flex gap-3'>
                    <button className={`${styles.button} text-white py-2 px-4 rounded`}>Edit Profile</button>
                    <button className={`${styles.button}  text-white py-2 px-4 rounded`} onClick={LogoutHandler}>Log Out</button>
                </div>
            )
        }
    </div>
  )
}

export default ShopInfo