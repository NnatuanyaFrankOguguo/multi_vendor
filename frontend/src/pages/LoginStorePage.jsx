import React, { useEffect } from 'react'
import LoginStore from '../components/Login/LoginStore.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginStorePage = () => {

  const { isStoreAuthenticated, store } = useSelector((state) => state.store)
  const navigate = useNavigate()

  useEffect(() => {
    if(isStoreAuthenticated === true) {
      // Redirect to home page if user is already authenticated
      navigate(`/store/${store._id}`)
    }
  }, [])


  return (
    <div>
        <LoginStore />
    </div>
  )
}

export default LoginStorePage