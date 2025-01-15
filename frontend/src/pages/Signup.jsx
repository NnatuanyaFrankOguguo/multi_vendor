import React, {useEffect} from 'react'
import Signup from '../components/Signup/Signup.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {

  const { loading, isAuthenticated } = useSelector((state) => state.user)

  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated === true) {
      // Redirect to home page if user is already authenticated
      navigate("/")
    }

    
  }, []);

  return (
    <div>
        <Signup />
    </div>
  )
}

export default SignupPage