import React, { useState } from 'react'
import server from '../../server'
import { useSelector } from 'react-redux'
import { AiOutlineCamera } from 'react-icons/ai'

const ProfileContent = ({active}) => {
    const {user} = useSelector((state) => state.user)
    const [fname, setFname] = useState(user && user.fname)
    const [lname, setLname] = useState(user && user.lname)
    const [email, setEmail] = useState(user && user.email)
    const [number, setNumber] = useState(null)
    const [zipcode, setZipcode] = useState(null)


  return (
    <div className='w-full'>
        {
            active === 1 && (
                <>
                    <div className='flex justify-center w-full'>
                        <div className="relative">
                            <img src={user.googleId ? user.avatar : `${server}/images/${user.avatar}`} className="w-[125px] h-[100px] rounded-full object-cover border-[3px] border-[#3ad132]"  alt="profile" /> 
                            <div className=' absolute border w-[25px] h-[25px] bg-[#3ad132] rounded-full flex items-center justify-center cursor-pointer bottom-[5px] right-[5px]'>
                                <AiOutlineCamera />
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='w-full px-5 border flex flex-col'>
                        <form action="">
                            <div className="w-full flex pb-3">
                                <div className="w-[25%]">
                                    <label className='block pb-2'>First Name</label>
                                    <input type="text" name="first-name" value={fname} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setFname(e.target.value)} />
                                </div>
                                <div className="w-[25%]">
                                    <label className='block pb-2'>Last Name</label>
                                    <input type="text" name="last-name" value={lname} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setLname(e.target.value)} />
                                </div>
                                
                            </div>

                            <div className="w-full flex pb-3"> 
                                <div className="w-[50%]">
                                    <label className='block pb-2'>Email Address</label>
                                    <input type="email" name="email" value={email} className='border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setEmail(e.target.value)} />
                                </div>  
                        
                    
                            </div>

                            <div className="w-full flex pb-3"> 
                                <div className="w-[25%]">
                                    <label className='block pb-2'>Phone Number</label>
                                    <input type="tel" name="phone-number" value={number} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setNumber(e.target.value)} />
                                </div> 
                                <div className="w-[25%]">
                                    <label className='block pb-2'>Zip Code</label>
                                    <input type="number" name="zip-code" value={zipcode} className='border border-gray-300 rounded-md w-half p-2 focus:outline-none focus:border-blue-500' onChange={(e) => setZipcode(e.target.value)} />
                                </div>  
                        
                    
                            </div>
                            
                        </form>
                    </div>
                </>
            ) 
        }
    </div>
  )
}

export default ProfileContent