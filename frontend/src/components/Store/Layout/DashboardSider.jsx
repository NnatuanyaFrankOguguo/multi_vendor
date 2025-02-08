import React, { useState } from 'react'
import { FiChevronDown, FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { BiMessageAltDetail } from 'react-icons/bi';
import {AiOutlineGift } from 'react-icons/ai';
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({active, setOpen}) => {

    const [ openDropDown, setOpenDropDown ] = useState({})

    const toggleDropdown = (id) => {
        setOpenDropDown((prev) => ({
            ...prev,
            [id]: !prev[id] // Toggle the specific menu item
        }))
    }

    const dashboardItems = [
        {id: 1, link: '/dashboard', name: 'Dashboard', icon: RxDashboard },
        {id: 2, link: '/dashboard-orders', name: 'All Orders', icon: FiShoppingBag },
        {id: 32, name: 'All Products', icon: FiPackage,
            subMenu: [
                {id: 4, link: '/dashboard-products', name: 'Manage Products' },
                {id: 5, link: '/dashboard-product-create', name: 'Create Product' },
                //{id: 33, link: '/dashboard-product-edit', name: 'Edit Product', icon: FiPackage },    
            ]
        },
        {id: 33, name: 'All Events', icon: MdOutlineLocalOffer, 
            subMenu: [
                {id: 6, link: '/dashboard-events', name: 'Manage Events' },
                {id: 7, link: '/dashboard-event-create', name: 'Create Event' },
                //{id: 34, link: '/dashboard-event-edit', name: 'Edit Event', icon: FiPackage },    
            ]
        },
        {id: 8, link: '/dashboard-promotion', name: 'Promotions', icon: VscNewFile },
        {id: 9, link: '/dashboard-withdraw-money', name: 'Withdraw Money', icon: CiMoneyBill },
        {id: 10, link: '/dashboard-messages', name: 'Shop Inbox', icon: BiMessageAltDetail },
        {id: 11, link: '/dashboard-coupons', name: 'Discount Codes', icon: AiOutlineGift },
        {id: 11, link: '/dashboard-refunds', name: 'Refunds', icon: HiOutlineReceiptRefund },
        {id: 13, link: '/dashboard-settings', name: 'Settings', icon: CiSettings },
        
    ]




  return (
    <div className='w-full h-[89vh] overflow-y-scroll sticky top-0 left-0 z-11' style={{ 
        msOverflowStyle: "none",  // For Internet Explorer and Edge
        scrollbarWidth: "none"     // For Firefox
      }}>
        {/*single items*/}
        
        {
            dashboardItems.map((menuItem,index) => {
                const Icon = menuItem.icon; // Get the icon component dynamically
                const isOpen = openDropDown[menuItem.id] || false; //check if the dropdown is open for this menu item

                return(
                    <div key={index} className='w-full'>
                        <div className="flex w-full items-center justify-between p-4 hover:bg-[#F5E1A4]"  onClick={() => menuItem.subMenu && toggleDropdown(menuItem.id)
                           
                        }>
                            <Link to={menuItem.link || '#'} className='w-full flex items-center'>
                                <Icon size={30} color={`${active === menuItem.id ? '#8B4513' : ''}`} title={menuItem.name} />
                                <h5 className={`pl-2 text-[16px] font-[500] flex w-full ${active === menuItem.id? 'text-[#8B4513]' : 'text-[#555]'}`}>
                                    {menuItem.name} 
                                </h5>
                            </Link>
                            {menuItem.subMenu && <FiChevronDown size={26} className={`text-gray-900 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
                        </div>
                        {/* Dropdown Menu */}
                        {
                            menuItem.subMenu && isOpen && (
                            <div className='ml-10 '>
                                {
                                    menuItem.subMenu && menuItem.subMenu.map((subMenu, index) => {
                                        return(
                                            <Link key={index} to={subMenu.link || '#'} className={`px-4 py-2 hover:bg-[#F5E1A4] rounded-md block text-[16px] font-[500] ${active === subMenu.id? 'text-[#8B4513]' : 'text-[#555]'}`}>
 
                                                {subMenu.name} 
                                                
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            )
                        }
                    </div>
                )
            })
        }

            
    </div>
  )
}

export default DashboardSidebar