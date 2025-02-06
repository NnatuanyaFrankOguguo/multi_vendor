import React, { useEffect } from 'react'
import LoginStore from '../components/Login/LoginStore.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginStorePage = () => {

  const { isStoreAuthenticated, isLoading } = useSelector((state) => state.store)
  const navigate = useNavigate()

  useEffect(() => {
    if(isStoreAuthenticated === true) {
      // Redirect to home page if user is already authenticated
      navigate(`/dashboard`)
    }
  }, [isLoading, isStoreAuthenticated]) //if these dependencies change then the useEffect will render or run again


  return (
    <div>
        <LoginStore />
    </div>
  )
}

export default LoginStorePage