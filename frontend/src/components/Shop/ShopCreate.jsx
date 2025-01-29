import React, {useState} from 'react'
import google from '../Login/google.png'
import { Link } from 'react-router-dom'
import {AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser} from 'react-icons/ai'
import styles from '../../styles/styles'
import { useNavigate } from 'react-router-dom'
import server from '../../server.js'
import { toast } from 'react-toastify';
import axios from 'axios'

const ShopCreate = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [address, setAddress] = useState()
    const [visibility, setVisibility] = useState(false)
    const [avatar, setAvatar] = useState(null)


    const fileUpload = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {headers: {'Content-Type': 'multipart/form-data'}}
       //now to append all those state object variables into a new form data
       const formData = new FormData();
       //now we have to insert all the data one by one
       formData.append('email', email)
       formData.append('password', password)
       formData.append('name', name)
       formData.append('address', address)
       formData.append('number', phoneNumber)
       formData.append('file', avatar)

        try {
            // const config = {headers: {'Content-Type': 'multipart/form-data'}}
            const response = await axios.post(`${server}/api/users/create-user`, formData, config);
            //alert(response.data.message) //do sweetalert
            console.log(response.data.message);
            toast.success(response.data.message)
            //PUT A LOADER ICON
            // Clear the form
            setEmail('')
            setPassword('')
            setName('')
            setAddress('')
            setPhoneNumber('')
            setAvatar(null)
            // navigate('/')
        } catch (error) {
            console.error(error.response)
            toast.error(error.response.data.message)
            
        }

    }

    

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-[30rem]'>
            <h2 className='mt-1 text-center text-3xl font-extrabold text-gray-900'>
                Register your Store
            </h2>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-v-md'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='flex justify-center'>Fill in your details</div>
                        
                        <div> 
                            <div className='mt-1'>
                                <input type='text' name='name' placeholder="Shop Name"  autoComplete='name' required value={name} onChange={(e) => setName(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />

                            </div>
                        </div>

                        <div>
                            
                            <div className='mt-1'>
                                <input type='email' name='email' placeholder="Email Address"  autoComplete='email' required value={email} onChange={(e) => setEmail(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />

                            </div>
                        </div>

                        <div>
                            
                            <div className='mt-1'>
                                <input type='number' name='Phone' placeholder="Phone Number"  autoComplete='number' required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />

                            </div>
                        </div>

                        <div> 
                            <div className='mt-1'>
                                <input type='address' name='address' placeholder="Shop Address"  autoComplete='address' required value={address} onChange={(e) => setAddress(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />

                            </div>
                        </div>

                        <div>
            
                            <div className='mt-1 relative'>
                                <input type={visibility ? "text" : "password"} name='password' placeholder="Password"  autoComplete='current-password' required value={password} onChange={(e) => setPassword(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />

                                {
                                    visibility ? <AiOutlineEye className="absolute right-2 top-1.5 cursor-pointer" size={25} onClick={() => setVisibility(false)} />
                                    : <AiOutlineEyeInvisible className="absolute right-2 top-1.5 cursor-pointer" size={25} onClick={() => setVisibility(true)} />
                                }

                            </div>
                        </div>

                        <div>
                            <label htmlFor='avatar' className='block text-sm font-medium text-grey-700'>
                            </label>

                            <div className='mt-2 flex items-center'>
                                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                    {
                                        avatar? 
                                        <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover rounded-full" />
                                        : 
                                        <div className="flex items-center justify-center h-8 w-8 text-gray-400">
                                            <AiOutlineUser size={30} />
                                        </div>
                                    }
                                </span>

                                <label htmlFor="file-input" className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 
                                rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                                    <span>Upload an Image</span>
                                    <input type="file" name="avatar" id='file-input' accept='.jp,.jpeg,.png' onChange={fileUpload} 
                                    className='sr-only' required/>
                                </label>

                            </div>
                            
                        </div>


                        <div className={`${styles.normalFlex} justify-between`}>
                            <div className={`${styles.normalFlex}`}>
                                <input type="checkbox" name="remember-me" id="remember-me" required
                                classname="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded " />

                                <label htmlFor="terms" className='ml-2 block text-xs text-gray-500'>By continuing, I agree to the terms of use & privacy policy.</label>

                            </div>
                    

                        </div>

                        <div>
                            <button type='submit' className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
                            text-white bg-blue-600 hover:bg-blue-700'> 
                                Submit
                            </button>
                        </div>

                        <div className={`${styles.normalFlex} w-full`}>
                            <h4>Already have an account?</h4>
                            <Link to="/login" className="text-blue-600 pl-2">
                                Login
                            </Link>
                        </div>



                    </form>

                </div>

            </div>




        </div>


    </div>
  )
}

export default ShopCreate