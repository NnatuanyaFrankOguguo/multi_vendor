import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import leaf from '../../assets/leaf.png'

const Header = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchData, setSearchData] = useState(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const term = e.target.value
        setSearchTerm(term);

        const filteredProducts = productData
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
                <input type="text" name="" placeholder="Search Product..."  />
            </div>

        </div>
    </div>
  )
}

export default Header