import React, {useState} from 'react'
import google from './google.png'
import { Link } from 'react-router-dom'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import styles from '../../styles/styles'
import axios from 'axios'
import server from '../../server'
import { toast } from'react-toastify';
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visibility, setVisibility] = useState()


    const handleSubmit = async (e) => {
        e.preventDefault()
        // Implement login logic here
        try {
            const response = await axios.post(`${server}/api/users/login-user`, {email, password}, {withCredentials: true})//with credentials the cookies can be sent to the frontend from the backend
            toast.success("Login Success!")
            //console.log(response)
            // localStorage.setItem('token', response.data.token)
            navigate('/')
            window.location.reload(true)
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    }


    const googleAuth = () => {
        // Implement Google OAuth authentication here
        window.location.href = 'http://localhost:5000/auth/google'
        // console.log('Google OAuth authentication clicked')
        // window.location.reload()
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-4xl font-bold text-green-800 font-serif'>
            Welcome Back 🌾
        </h2>
        <p className='mt-2 text-center text-sm text-green-600'>
            Cultivate your agricultural network
        </p>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white/90 backdrop-blur-lg py-8 px-4 shadow-lg rounded-xl sm:px-10 border border-green-100'>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='flex justify-center items-center gap-3 rounded-xl border-2 border-green-200 hover:border-green-500 transition-all duration-300'>
                        <button className='flex items-center gap-2 py-2 px-4 text-gray-700 hover:text-green-800 font-medium' onClick={googleAuth}>
                            <img src={google} className='h-6 w-6' alt="google" />
                            Continue with Google
                        </button>
                    </div>

                    <div className='flex items-center justify-center space-x-3'>
                        <div className='h-px bg-green-200 w-1/4'></div>
                        <span className='text-sm text-green-500'>Or grow with credentials</span>
                        <div className='h-px bg-green-200 w-1/4'></div>
                    </div>

                    <div>
                        <input 
                            type='email' 
                            name='email' 
                            placeholder="Your Email"  
                            className='w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-300  placeholder:text-gray-700'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='relative'>
                        <input 
                            type={visibility ? "text" : "password"} 
                            name='password' 
                            placeholder="Password"  
                            className='w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition duration-300 placeholder:text-gray-700'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {visibility ? (
                            <AiOutlineEye className="absolute right-3 top-4 cursor-pointer text-green-500 hover:text-green-600" size={22} onClick={() => setVisibility(false)} />
                        ) : (
                            <AiOutlineEyeInvisible className="absolute right-3 top-4 cursor-pointer text-green-500 hover:text-green-600" size={22} onClick={() => setVisibility(true)} />
                        )}
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <input 
                                type="checkbox" 
                                id="remember-me" 
                                className='h-4 w-4 text-green-600 border-green-300 rounded focus:ring-green-500'
                            />
                            <label htmlFor="remember-me" className='ml-2 block text-sm text-green-600'>
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a
                                href=".forgot-password"
                                className="font-medium text-green-700 hover:text-green-800 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <button 
                        type='submit' 
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg'
                    >
                        Grow Your Network
                    </button>

                    <p className='text-center text-sm text-green-600'>
                        New to our platform?{' '}
                        <Link 
                            to="/sign-up" 
                            className='font-semibold text-green-700 hover:text-green-800 hover:underline'
                        >
                            Cultivate your account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login