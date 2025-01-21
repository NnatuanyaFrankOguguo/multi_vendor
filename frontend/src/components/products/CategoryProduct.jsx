import React from 'react';
import { categoriesData } from '../../static/data';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';

const CategoryProduct = () => {

    const navigate = useNavigate();
    const submitHandler = (i) => {
        navigate(`/products?category=${i.title}`);
        window.location.reload();

      // Add your code here to fetch products based on the selected category and update the URL
    }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-10 :px-[20px] md:px-[100px]">
        {categoriesData && categoriesData.map((item, index) => (
            <div
            key={index}
            className={`flex flex-col cursor-pointer`}
            onClick={() => submitHandler(index)}
            >
                <div className='flex items-start '>
                    <img src={item.image_Url} alt="categories" className="w-[60px] h-auto object-cover rounded-md " />
                    <h3 className="m-3 select-none text-sm text-center">{item.title}</h3>
                </div>  
            
            </div>
        ))}
    </div>
  
  )
}

export default CategoryProduct