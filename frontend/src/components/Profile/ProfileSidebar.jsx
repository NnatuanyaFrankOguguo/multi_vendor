import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RxPerson } from 'react-icons/rx'
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import {MdOutlineTrackChanges } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { AiOutlineCreditCard, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai';

const ProfileSidebar = ({active, setActive}) => {
    
    const navigate = useNavigate();

    const sideBarMenu = [
        {
            id: 1,
            title: 'Profile',
            icon: (isActive) => ( <RxPerson size={30} color={isActive ? 'red' : ''} />),
            onClick: (index) => setActive(index)
        },
        {
            id: 2,
            title: 'Orders',
            icon: (isActive) => (<HiOutlineShoppingBag size={30} color={isActive ? 'red' : '' } /> ),
            onClick: (index) => setActive(index)
        },
        {
            id: 3,
            title: 'Refunds',
            icon: (isActive) => (<HiOutlineReceiptRefund size={30} color={isActive ? 'red' : '' } />),
            onClick: (index) => setActive(index)
        },
        {
            id: 4,
            title: 'Inbox',
            icon: (isActive) => (<AiOutlineMessage size={30} color={isActive ? 'red' : '' } />),
            onClick: (index) => setActive(index) || navigate('/inbox')
        },
        {
            id: 5,
            title: 'Track Orders',
            icon: (isActive) => (<MdOutlineTrackChanges size={30} color={isActive ? 'red' : '' } />),
            onClick: (index) => setActive(index)
        },
        {
            id: 6,
            title: 'Payment Methods',
            icon: (isActive) => (<AiOutlineCreditCard size={30} color={isActive ? 'red' : '' } />),
            onClick: (index) => setActive(index)
        },
        {
            id: 7,
            title: 'Address',
            icon: (isActive) => (<TbAddressBook size={30} color={isActive ? 'red' : '' } />),
            onClick: (index) => setActive(index)
        },
        {
            id: 8,
            title: 'Log out',
            icon: (isActive) => (<AiOutlineLogout size={30} color={isActive ? 'red' : '' } />),
            onClick: (index) => setActive(index)
        },
        

    ]

  return (
    <div className='w-full bg-[#D8F3FF] shadow-sm rounded-[10px] p-4 pt-8'>
        {
            sideBarMenu && sideBarMenu.map((menu, index) => ( //index starts with 0
                <div className="flex items-center cursor-pointer w-full mb-6" key={index} onClick={ () => menu.onClick(index + 1)}>
                    {menu.icon(active === index + 1)}
                    <span className={`pl-3 ${active === index + 1 ? 'text-red-500' : ''}`}>
                        {menu.title}
                    </span> 
        
                </div>
            ))
        }
       
        {/* we can use map... put it in a list to iterate through them but later or want to do it this way */}
        

    </div>
  )
}

export default ProfileSidebar