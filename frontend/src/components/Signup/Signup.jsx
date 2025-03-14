import React, {useState} from 'react'
import google from '../Login/google.png'
import { Link } from 'react-router-dom'
import {AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser} from 'react-icons/ai'
import styles from '../../styles/styles'
import { useNavigate } from 'react-router-dom'
import server from '../../server.js'
import { toast } from 'react-toastify';
import axios from 'axios'

const Signup = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [fname, setFname] = useState()
    const [lname, setLname] = useState()
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
       formData.append('fname', fname)
       formData.append('lname', lname)
       formData.append('file', avatar)

        try {
            // const config = {headers: {'Content-Type': 'multipart/form-data'}}
            const response = await axios.post(`${server}/api/users/create-user`, formData, config);
            toast.success(response.data.message)
            //PUT A LOADER ICON
            // Clear the form
            setEmail('')
            setPassword('')
            setFname('')
            setLname('')
            setAvatar(null)
            // navigate('/')
        } catch (error) {
            
            toast.error(error.response.data.message)
            
        }

    }

    const googleAuth = () => {
        // Implement Google OAuth authentication here
        window.location.href = 'http://localhost:5000/auth/google'
        // console.log('Google OAuth authentication clicked')
    }
    

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-4xl font-bold text-green-800 font-serif'>
            Grow With Us 🌱
        </h2>
        <p className='mt-2 text-center text-sm text-green-600'>
            Join our agricultural community and connect directly with farmers & buyers
        </p>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white/90 backdrop-blur-lg py-8 px-4 shadow-lg rounded-xl sm:px-10 border border-green-100'>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='flex justify-center items-center gap-3 rounded-xl border-2 border-green-200 hover:border-green-500 transition-all duration-300'>
                        <button className='flex items-center gap-2 py-2 px-4 text-gray-600 hover:text-green-800 font-medium' onClick={googleAuth}>
                            <img src={google} className='h-6 w-6' alt="google" />
                            Sign up with Google
                        </button>
                    </div>

                    <div className='flex items-center justify-center space-x-3'>
                        <div className='h-px bg-green-200 w-1/4'></div>
                        <span className='text-sm text-green-500'>Or cultivate your account</span>
                        <div className='h-px bg-green-200 w-1/4'></div>
                    </div>
                    
                    <div className="flex space-x-4">
                        <div className='w-full'>
                            <input 
                                type='text' 
                                name='first-name' 
                                placeholder="First Name"  
                                className='w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-300 placeholder:text-gray-800'
                                value={fname} 
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </div>
                        
                        <div className='w-full'>
                            <input 
                                type='text' 
                                name='last-name' 
                                placeholder="Last Name"  
                                className='w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-300  placeholder:text-gray-800'
                                value={lname} 
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <input 
                            type='email' 
                            name='email' 
                            placeholder="Email Address"  
                            className='w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-300  placeholder:text-gray-800'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='relative'>
                        <input 
                            type={visibility ? "text" : "password"} 
                            name='password' 
                            placeholder="Password"  
                            className='w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-300  placeholder:text-gray-800'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {visibility ? (
                            <AiOutlineEye className="absolute right-3 top-4 cursor-pointer text-green-500 hover:text-green-600" size={22} onClick={() => setVisibility(false)} />
                        ) : (
                            <AiOutlineEyeInvisible className="absolute right-3 top-4 cursor-pointer text-green-500 hover:text-green-600" size={22} onClick={() => setVisibility(true)} />
                        )}
                    </div>

                    <div className='flex items-center space-x-4'>
                        <div className='h-12 w-12 rounded-full border-2 border-green-200 overflow-hidden bg-green-50'>
                            {avatar ? (
                                <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-green-400">
                                    <AiOutlineUser size={24} />
                                </div>
                            )}
                        </div>
                        <label className='flex-1'>
                            <span className='sr-only'>Upload profile photo</span>
                            <input 
                                type="file" 
                                onChange={fileUpload}
                                className='block w-full text-sm text-green-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-green-100 file:text-green-700 hover:file:bg-green-200 transition duration-300'
                            />
                        </label>
                    </div>

                    <div className='flex items-start space-x-2'>
                        <input 
                            type="checkbox" 
                            id="terms" 
                            className='mt-1 h-4 w-4 text-green-600 border-green-300 rounded focus:ring-green-500'
                        />
                        <label htmlFor="terms" className='text-sm text-green-600'>
                            I agree to the <a href="#" className='text-green-700 hover:underline'>Terms of Service</a> and <a href="#" className='text-green-700 hover:underline'>Privacy Policy</a>
                        </label>
                    </div>

                    <button 
                        type='submit' 
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg'
                    >
                        Create Account
                    </button>

                    <p className='text-center text-sm text-green-600'>
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            className='font-semibold text-green-700 hover:text-green-800 hover:underline'
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Signup