import React, { useRef } from 'react'
import styles from '../../../styles/styles'
import { brandingData, categoriesData } from '../../../static/data'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Import icons
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const scrollAmount = 300; // Adjust scroll distance as needed
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
    };

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

        <div className={`${styles.section} mb-12 border-x  border-slate-50`}>
            <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold">
                Explore By Category
            </h1>
            <div className="flex items-center my-5">
                {/* Left Scroll Button */}
                <button className="text-lg font-bold px-2 py-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={() => handleScroll('left')}>
                    <FiChevronLeft size={22} />
                </button>

                {/* Scrollable Container */}
                <div ref={scrollContainerRef} className="flex justify-between items-center gap-7 text-center overflow-x-auto no-scrollbar"
                style={{
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE/Edge
                }} >
                    {categoriesData && categoriesData.map((category) => {
                        const handleSubmit = (category) => { navigate(`/products?category=${category.title}`)};
                        return (
                            <div className="w-full" key={category.id} onClick={() => handleSubmit(category)}>
                                <img src={category.image_Url} alt="" className="w-[10vw] min-w-[100px] cursor-pointer rounded-full transition duration-200 border-[9px] border-gray-200 object-contain"/>
                                <h5 className="text-[max(1.4vw, 16px)] mt-[7px] text-[#545252] cursor-pointer font-bold">
                                    {category.title}
                                </h5>
                            </div>
                        );
                    })}
                </div>

                {/* Right Scroll Button */}
                <button className="text-lg font-bold px-2 py-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={() => handleScroll('right')}>
                    <FiChevronRight size={22} />
                </button>
            </div>
        </div>
        
    </>
  )
}

export default Categories