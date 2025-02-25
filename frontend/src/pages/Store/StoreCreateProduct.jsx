import React, { useState } from 'react'
import DashboardHeader from '../../components/Store/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../../components/Store/Layout/DashboardSider.jsx'
import CreateProduct from '../../components/Store/CreateProduct.jsx'

const StoreCreateProduct = () => {
    const [open, setOpen ] = useState(false)
  return (
    <div className='flex flex-col items-center justify-center w-full p-5'>
      <div className='w-full max-w-3xl bg-white shadow-lg rounded-lg p-6'>
        <h2 className='text-2xl font-semibold text-center mb-6'>Create Product</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700'>Name <span className='text-red-500'>*</span></label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} 
              className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='Enter product name' />
          </div>
          
          <div>
            <label className='block text-gray-700'>Description <span className='text-red-500'>*</span></label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' rows='3' placeholder='Enter product description'></textarea>
          </div>

          <div>
            <label className='block text-gray-700'>Category <span className='text-red-500'>*</span></label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500'>
              <option value='' disabled>Select a Category</option>
              {/* categoriesData.map can be added dynamically */}
              <option value='Electronics'>Electronics</option>
              <option value='Clothing'>Clothing</option>
            </select>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>Original Price</label>
              <input type='number' value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)}
                className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='Original Price' />
            </div>
            <div>
              <label className='block text-gray-700'>Price (with Discount) <span className='text-red-500'>*</span></label>
              <input type='number' value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)}
                className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='Discount Price' />
            </div>
          </div>

          <div>
            <label className='block text-gray-700'>Product Stock <span className='text-red-500'>*</span></label>
            <input type='number' value={stock} onChange={(e) => setStock(e.target.value)}
              className='mt-1 w-full border rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500' placeholder='Enter product quantity' />
          </div>

          <div>
            <label className='block text-gray-700'>Upload Images <span className='text-red-500'>*</span></label>
            <input type='file' id='upload' className='hidden' multiple onChange={handleImageChange} />
            <div className='grid grid-cols-5 gap-2 mt-2'>
              {[...Array(5)].map((_, index) => (
                <div key={index} className='w-20 h-20 border rounded-md flex items-center justify-center relative'>
                  {images[index] ? (
                    <img src={URL.createObjectURL(images[index])} alt='Product' className='w-full h-full object-cover rounded-md' />
                  ) : (
                    <label htmlFor='upload' className='cursor-pointer'>
                      <AiOutlinePlusCircle size={30} className='text-gray-500' />
                    </label>
                  )}
                  {index === 0 && images.length > 0 && (
                    <span className='absolute top-0 left-0 bg-yellow-500 text-white text-xs px-1 rounded-br-md'>Main</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-center'>
            <button type='submit' className='px-5 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700'>
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StoreCreateProduct