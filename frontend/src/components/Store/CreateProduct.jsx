import React, { useState } from 'react';
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from 'react-icons/ai';

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [stock, setStock] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product submitted");
    // Add your submit logic here
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImages([...e.target.files]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll"
        style={{ 
          msOverflowStyle: "none",  // For Internet Explorer and Edge
          scrollbarWidth: "none"     // For Firefox
        }}
      >
        <h5 className="text-[30px] font-Poppins text-center">
          Create Product
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="pb-2 block">
              Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm" 
              placeholder="Enter Your Product Name"
            />
          </div>

          <div className="my-4">
            <label className="pb-2 block">
              Description <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm" 
              placeholder="Enter Your Product Description"
            />
          </div>

          <div className="my-4">
            <label className="pb-2 block">
              Category <span className="text-red-500">*</span>
            </label>
            <select 
              name="category"
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-2 border h-[35px] rounded-[5px]"
            >
              <option value="" disabled>Select a Category</option>
              {categoriesData && categoriesData.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="my-4">
            <label className="pb-2 block">
              Tags
            </label>
            <input 
              type="text" 
              name="tags" 
              value={tags} 
              onChange={(e) => setTags(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm" 
              placeholder="Enter Your Product Tags"
            />
          </div>

          <div className="my-4">
            <label className="pb-2 block">
              Original Price
            </label>
            <input 
              type="number" 
              name="originalPrice" 
              value={originalPrice} 
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm" 
              placeholder="Enter Your Product Price"
            />
          </div>

          <div className="my-4">
            <label className="pb-2 block">
              Price (with Discount) <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              name="discountPrice" 
              value={discountPrice} 
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm" 
              placeholder="Enter Discounted Price"
            />
          </div>

          <div className="my-4">
            <label className="pb-2 block">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              name="stock" 
              value={stock} 
              onChange={(e) => setStock(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm" 
              placeholder="Enter Your Product Quantity"
            />
          </div>

          <div className="my-4">
            <label className="pb-2 block">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <input 
              type="file" 
              name="images" 
              id="upload" 
              className="hidden" 
              multiple 
              onChange={handleImageChange}
            />
            <div className="w-full flex items-center flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {images && images.map((img, index) => (
                <img 
                  key={index} 
                  src={URL.createObjectURL(img)} 
                  alt="Product" 
                  className="w-[100px] h-[100px] object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center my-4">
            <button 
              type="submit" 
              className="w-full px-5 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
