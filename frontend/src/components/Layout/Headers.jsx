import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import leaf from '../../assets/leaf.png'
import {productData} from '../../static/data'
import { AiOutlineSearch } from 'react-icons/ai'

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

  return (
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
                                        // <Link to={`/product/${product_name}`} key={index} className='flex items-center space-x-2'>
                                        //     <img src={product.image} alt={product.name} className='h-10 w-10' />
                                        //     <p className='text-base text-blue-900 font-semibold'>{product.name}</p>
                                        // </Link>
                                    )
                                })
                            }
                        </div>

                    ) : null 
                
                }
            </div>

           

        </div>
    </div>
  )
}

export default Header