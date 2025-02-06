import React, {useState} from 'react'
import google from './google.png'
import { Link } from 'react-router-dom'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import styles from '../../styles/styles'
import axios from 'axios'
import server from '../../server'
import { toast } from'react-toastify';
import { useNavigate } from 'react-router-dom'
const LoginStore = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visibility, setVisibility] = useState()


    const handleSubmit = async (e) => {
        e.preventDefault()
        // Implement login logic here
        try {
            const response = await axios.post(`${server}/api/v2/stores/login-store`, {email, password}, {withCredentials: true})//with credentials the cookies can be sent to the frontend from the backend
            toast.success("Login Success!")
            //console.log(response)
            navigate('/dashboard') //with the store login no need to do a navigate to take the seller to the shop we will do it on the frontend (to call our loadStore() action so that we on load if its the store/seller token it takes them to the to shop page)
            window.location.reload(true)
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    }



  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Login to your Store account
            </h2>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-v-md'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                    
                            <div className='mt-1'>
                                <input type='email' name='email' placeholder="Your Email"  autoComplete='email' required value={email} onChange={(e) => setEmail(e.target.value)}
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

                        <div className={`${styles.normalFlex} justify-between`}>
                            <div className={`${styles.normalFlex}`}>
                                <input type="checkbox" name="remember-me" id="remember-me" required
                                classname="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded " />

                                <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-500'>Remember me</label>

                            </div>
                            
                           
                            <div className="text-sm">
                                <a
                                href=".forgot-password"
                                className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                Forgot your password?
                                </a>
                            </div>

                        </div>

                        <div>
                            <button type='submit' className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
                            text-white bg-blue-600 hover:bg-blue-700'> 
                                Submit
                            </button>
                        </div>

                        <div className={`${styles.normalFlex} w-full`}>
                            <h4>Not have any account?</h4>
                            <Link to="/store-create" className="text-blue-600 pl-2">
                                Sign Up
                            </Link>
                        </div>



                    </form>

                </div>

            </div>




        </div>


    </div>
  )
}

export default LoginStore