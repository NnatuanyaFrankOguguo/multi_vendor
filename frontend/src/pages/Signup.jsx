import React, {useEffect} from 'react'
import Signup from '../components/Signup/Signup.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {

  const { loading, isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {
    // Check if the token exists in the cookies (or wherever it's stored)
    if(isAuthenticated === true) {
      // If the user is authenticated, load their user data
      Store.dispatch(loadUser());
    }
    
  }, []);

  return (
    <div>
        <Signup />
    </div>
  )
}

export default SignupPage