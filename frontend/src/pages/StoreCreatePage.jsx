import React, { useEffect } from 'react'
import ShopCreate from '../components/Shop/ShopCreate.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StoreCreatePage = () => {

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
        <ShopCreate />
    </div>
  )
}

export default StoreCreatePage