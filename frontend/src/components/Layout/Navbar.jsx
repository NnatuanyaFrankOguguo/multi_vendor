import React from 'react'
import styles from '../../styles/styles'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom'

const Navbar = ({active}) => { //received the activeHeading from the Headers component as active
  return (
    <div className={`${styles.normalFlex}`}>
        {
            //doing a loop for the navigation
            navItems && navItems.map((nav, index) => {
                return (
                    <div className="flex">
                        <Link to={nav.url} className={`${active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"} font-[500] px-6 cursor-pointer`}>
                        {nav.title}</Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Navbar