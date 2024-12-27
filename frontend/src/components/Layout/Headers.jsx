import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import leaf from '../../assets/leaf.png'
import {categoriesData, productData} from '../../static/data'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import { BiMenuAltLeft } from 'react-icons/bi'
import DropDown from './DropDown.jsx'

const Header = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchData, setSearchData] = useState(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const term = e.target.value
        setSearchTerm(term);

        const filteredProducts = productData && productData.filter((product) => 
            product.name.toLowerCase().includes(term.toLowerCase())

        )
        setSearchData(filteredProducts);
    }

    const [active, setActive] = useState(false)

    window.addEventListener('scroll', () => {
        if(window.scrollY > 70) {
            setActive(true)
        } else {
            setActive(false)
        }
    })

    const [dropDown, setDropdown] = useState(false)


  return (
    <>
        <div className={`${styles.section}`}>
            <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <Link to='/' className="flex items-center space-x-1">
                        <img src={leaf} alt='logo' className='h-10 w-10/12' />
                        <p className="text-base text-blue-900 font-semibold">FrankFort</p>
                    </Link>
                </div>
                {/* searchbox */}
                <div className='w-[50%] relative'>
                    <input type="text" name="" placeholder="Search Product..." value={searchTerm} onChange={handleSearch} 
                    className='h-[40px] w-full px-2 border-green-300 border-[2px] rounded-md' />
                    <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />
                    {
                        searchData && searchData.length !== 0 ? (
                            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                {
                                    searchData && searchData.map((product, index) => {
                                        const d = product.name

                                        const product_name = d.replace(/\s+/g, '-'); //to remove the spaces on the initial name so each word will be able to come up in the search
                                        return (
                                            <Link to={`/product/${product_name}`}>
                                                <div className="w-full flex items-start-py-3">
                                                    <img src={product.image_Url[0].url} alt="" className='w-[40px] h-[40px] mr-[10px]' />
                                                    <h1>{product.name}</h1>
                                                </div>
                                            </Link>
                                        
                                        )
                                    })
                                }
                            </div>

                        ) : null 
                        
                    }
                </div>

                <div className={`${styles.button}`}>
                    <Link to='/farmer'>
                        <h1 className='text-[#fff] flex items-center mb-1'> Farmer <IoIosArrowForward className="ml-1 mt-1"  /></h1>
                    </Link>
                </div>
            </div>
            
        </div>

        <div className={`${active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null} transition hidden 800px:flex items-center justify-between w-full bg-[#8B4513] h-[65px] rounded-lg`}>
            <div className={`${styles.section} relative ${styles.normalFlex} justify-between bg[#7b4723]`}>
                {/* categories */}
                <div>
                    <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                        <BiMenuAltLeft size={30} className='absolute top-3 left-2 cursor-pointer' />

                        <button className='h-[100%] w-full bg-slate-100 flex justify-between items-center pl-10 font-sans text-md font-[500]  select-none rounded-t-md pb-2 '>
                            All Categories
                        </button>
                        <IoIosArrowDown size={23} className='absolute top-4 right-2 cursor-pointer' onClick={() => setDropdown(!dropDown)} />
                            {
                                dropDown ? (
                                    <DropDown categoriesData= {categoriesData} setDropDown={setDropDown} />
                                ) : null
                            }
                    </div>
                
                </div>

            </div>
        </div>
    </>
  )
}

export default Header