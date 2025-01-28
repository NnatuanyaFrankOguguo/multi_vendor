import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import leaf from '../../assets/leaf.webp'
import { categoriesData, productData} from '../../static/data'
import { AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import { FiChevronDown } from 'react-icons/fi';
import { BiMenuAltLeft } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import DropDown from './DropDown'
import Navbar from './Navbar'
import cart from './shopping_cart.webp'
import { useSelector } from 'react-redux'
import server from '../../server'
import Cart from '../Cart/Cart.jsx'
import Wishlist from '../wishlist/Wishlist.jsx'
import { RxCross1 } from 'react-icons/rx'

const Header = ({activeHeading}) => { //receiving the activeHeading from the HomePage component and send it to the Navbar component

    const [searchTerm, setSearchTerm] = useState('')
    const [searchData, setSearchData] = useState(null)
    //to get the signed in user details that is being stored in the database to display in the frontend
    //import the isAuthenticated from the redux file
    const { isAuthenticated, user } = useSelector((state) => state.user)
    // console.log(user)
    

    const handleSearch = (e) => {
        e.preventDefault()
        const term = e.target.value
        setSearchTerm(term);

        const filteredProducts = productData && productData.filter((product) => 
            product.name.toLowerCase().includes(term.toLowerCase())

        )
        setSearchData(filteredProducts);
    }
    // the logic for the active is when the homepage is being scroll to some certian height it will remain sticky at the top
    const [active, setActive] = useState(false)

    window.addEventListener('scroll', () => {
        if(window.scrollY > 70) {
            setActive(true)
        } else {
            setActive(false)
        }
    })

    const [dropDown, setDropDown] = useState(false)

    //initial for the user names
    const initials = (fname, lname) => {
        const firstLetter = fname.charAt(0).toUpperCase()
        const secondLetter = lname.charAt(0).toUpperCase()
        return `${firstLetter}${secondLetter}`
    }
    // FOR THE CART FUNCTIONALITY
    const [openCart, setOpenCart] = useState(false)

    // FOR THE WISHLIST FUNCTIONALITY
    const [openWishlist, setOpenWishlist] = useState(false)

    //SET OPEN MOBILE SCREEN FOR THE MENU BAR TO POP UP AT THE LEFT
    const [openMobile, setOpenMobile] = useState(false)


    
    



  return (
    <>
        <div className={`${styles.section}`}>
            <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <Link to='/' className="flex items-center space-x-1">
                        <img src={leaf} alt='logo' className='h-10 w-10/12' loading='lazy'/>
                        <p className="text-base text-blue-900 font-semibold">FrankFort</p>
                    </Link>
                </div>
                {/* searchbox */}
                <div className='w-[50%] relative'>
                    <input type="search" name="" placeholder="Search Product..." value={searchTerm} onChange={handleSearch} 
                    className='h-[40px] w-full px-2 border-green-300 border-[2px] rounded-md' />
                    <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />
                    {
                        searchTerm !== '' ? searchData && (
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

                        ) 
                        : null
                    }
                </div>

                <div className={`${styles.button}`}>
                    <Link to='/seller'>
                        <h1 className='text-[#fff] flex items-center mb-1'> Seller Login <IoIosArrowForward className="ml-1 mt-1"  /></h1>
                    </Link>
                </div>
            </div>
            
        </div>

        <div className={`${active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null} transition hidden 800px:flex items-center justify-between w-full bg-[#8B4513] h-[65px] rounded-lg `}>
            <div className={`${styles.section} relative ${styles.normalFlex} justify-between bg[#7b4723] `}>
                {/* categories */}
                <div onClick={() => setDropDown(!dropDown)}>
                    <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                        <BiMenuAltLeft size={30} className='absolute top-3 left-2 cursor-pointer' />

                        <button className='h-[100%] w-full bg-slate-100 flex justify-between items-center pl-10 font-sans text-md font-[500]  select-none rounded-t-md pb-2 '>
                            All Categories
                        </button>
                        <IoIosArrowDown size={23} className='absolute top-4 right-2 cursor-pointer' onClick={() => setDropDown(!dropDown)} />
                        {
                            // dropdown list for when the icon downarrow is clicked
                            dropDown ? (
                                <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
                            ) : null
                        }

                    </div>
                
                </div>

                {/* NOW FOR THE NAVBAR*/}
                <div className={`${styles.normalFlex}`}>
                    <Navbar active={activeHeading} />
                </div>
                    
                {/* for the cart icon, love icons, profile icon */}
                <div className='flex'>
                    <div className={`${styles.normalFlex}`}>
                        <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenWishlist(true)}>
                            <AiOutlineHeart size={30} style={{color: 'rgb(255 255 255 / 83%)'}}/>
                            <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                                0
                            </span>
                        </div>
                    </div>

                    <div className={`${styles.normalFlex}`}>
                        <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenCart(true)}>
                            <img src={cart} style={{width: "30px"}} loading='lazy'/>
                            <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                                1
                            </span>
                        </div>
                    </div>

                    <div className={`${styles.normalFlex}`}>
                        <div className='relative cursor-pointer mr-[15px]'>
                            {
                                isAuthenticated ? (
                                    <Link to={`/profile`} className='flex items-center gap-1  justify-center '>
                                        <img src={user.googleId ? user.avatar : `${server}/images/${user.avatar}`} className="w-[40px] h-[40px] rounded-full"  alt="" /> 
                                        <span className='font-bold'> {user ? (initials(user.fname,user.lname)) : ""} <FiChevronDown size={20} className='text-gray-900' /></span>
                                    </Link> 

                                ) : (
                                    <Link to='/login'><CgProfile size={30} style={{color: 'rgb(255 255 255 / 83%)'}}/></Link>
                                )
                            }
                            
                        </div>
                    </div>

                    {/* CART POPUP */}
                    {
                        openCart ? (
                            <Cart setOpenCart={setOpenCart} />
                        ) : null
                    }

                    {/* WISHLIST POPUP */}
                    {
                        openWishlist ? (
                            <Wishlist setOpenWishlist={setOpenWishlist} />
                        ) : null
                    }
                </div>
            </div>
        </div>

        {/* MOBILE SCREEN HEADER */}

        <div className={` ${active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null} w-full h-[60px] bg-[#8B4513] z-30 top-0 left-0 shadow-md flex items-center justify-between 800px:hidden`}>
            <div className='w-full flex items-center justify-between'>
                <div>
                    <BiMenuAltLeft size={40} className='ml-4 cursor-pointer' color="white" onClick={() => setOpenMobile(true)}/>
                </div>
                <div>
                    <Link to='/' className="flex items-center space-x-1">
                        <img src={leaf} alt='logo' className='h-10 w-10/12' loading='lazy'/>
                        <p className="text-base text-white font-semibold">FrankFort</p>
                    </Link>
                </div>

                <div>
                    <div className="relative mr-[20px]">
                        <img src={cart} style={{width: "30px"}} alt="" loading='lazy' />
                        <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                            1
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* HEADER SIDEBAR from left */}
        {
            openMobile && (
                <div className="fixed w-full bg-[#0000005f] z-40 h-full top-0 left-0">
                    <div className="fixed w-[70%] bg-[#F5F5DC] h-screen top-0 left-0 z-10 overflow-y-scroll">
                        <div className="w-full justify-between flex pr-3">
                            <div>
                                <div className="relative mr-[15px]">
                                    <AiOutlineHeart size={30} className='mt-5 ml-3'/>
                                    <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                                        0
                                    </span>
                                </div>
                            </div>
                            <RxCross1 size={27} className='ml-4 mt-5 cursor-pointer' onClick={() => setOpenMobile(false)}/>  
                        </div>

                        {/* SEARCH BAR */}
                        <div className="my-8 w-[94%] h-[40px] mx-2 relative">
                            <input type="search" placeholder="Search Product..." 
                            className="w-full px-2 py-2 rounded-md border-[2px] border-[#3bc177] text-sm "
                            value={searchTerm} onChange={handleSearch}/>

                            {
                                searchTerm !== '' ? searchData && (
                                    <div className="absolute bg-slate-50 shadow-sm-2 z-10 w-full left-0 p-3">
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

                                )
                                : null 
                                
                            }    
                        </div>

                        {/* Navigation Components */}
                        <Navbar active={activeHeading}  />

                        {/* SELLER */}
                        <div className={`${styles.button} ml-4 h-[25px] w-[125px]`}>
                            <Link to='/seller'>
                                <h1 className='text-[#fff] flex items-center mb-1'> Seller Login <IoIosArrowForward className="ml-1 mt-1"  /></h1>
                            </Link>
                        </div>
                        <br/>
                        {/* Profile */}
                        <div className="flex w-full justify-center">
                            {
                                isAuthenticated ? (
                                    <Link to={`/profile`} className='flex items-center gap-1  justify-center shadow-md p-2 rounded-md'>
                                        <img src={user.googleId ? user.avatar : `${server}/images/${user.avatar}`} className="w-[50px] h-[50px] rounded-full border-[2px] border-green-300  "  alt="" /> 
                                        <span className='font-bold'> {user ? (initials(user.fname,user.lname)) : ""} </span>
                                    </Link> 

                                ) : (
                                    <>
                                        <Link to='/Login' className='text-[18px] pr-[10px] text-[#000000b7]'>Login/</Link>
                                        <Link to='/sign-up' className='text-[18px] text-[#000000b7]'>Sign up</Link>
                                    </>
                                )
                            }
                        </div>

                    </div>
                </div>
            )
        }
    </>
  )
}

export default Header