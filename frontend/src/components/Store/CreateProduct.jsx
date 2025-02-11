import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {

    const { store } = useSelector((state) => state.store);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [images, setImages] = useState([])
    

  return (
    <div className='border'>
        createproduct
    </div>
  )
}

export default CreateProduct