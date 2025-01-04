import React from 'react'
import styles from '../../../styles/styles'
import { brandingData, categoriesData } from '../../../static/data'
import { useNavigate } from 'react-router-dom'

const Categories = () => {

    const navigate = useNavigate()

  return (
    <>
        <div className={`${styles.section} hidden sm:block`}>
            <div className={`branding my-12 flex justify-between w-full shadow-md bg-white p-5 rounded-md `}>
                {
                    brandingData && brandingData.map((brand, index) => (
                        <div className='flex items-start' key={index}>
                            {brand.icon}
                            <div className='px-3'>
                                <h5 className='font-bold text-sm md:text-base'>{brand.title}</h5>
                                <p className='text-xs md:text-sm'>{brand.Description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

        <div className={`${styles.section} mb-12`}>
            <h1 className=' text-2xl sm:text-2xl md:text-2xl lg:text-2xl  font-bold'>Explore By Category</h1>
            <div className='flex justify-between items-center gap-7 text-center my-5 overflow-x-auto' style={{
                scrollbarWidth: 'none', //firefox
                msOverflowStyle: 'none', //IE/Edge
            }}>
                {
                    categoriesData && categoriesData.map((category) => {
                        const handleSubmit = (category) => {
                            navigate(`/products?category=${category.title}`)
                        }
                        return (
                            <div className='w-full ' 
                            key={category.id} onClick={() => handleSubmit(category)}>
                                <img src={category.image_Url} alt="" className='w-[10vw] min-w-[100px] cursor-pointer rounded-full transition duration-200 border-[9px] border-gray-200 object-contain'/>
                                <h5 className={`text-[max(1.4vw, 16px)] mt-[7px] text-[#545252] cursor-pointer font-bold`}>{category.title}</h5>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        
    </>
  )
}

export default Categories