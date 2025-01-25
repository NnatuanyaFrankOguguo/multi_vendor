import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RxPerson } from 'react-icons/rx';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { AiOutlineCreditCard, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import server from '../../server';

// Sidebar Menu Configuration
const sideBarMenuConfig = [
  { id: 1, title: 'Profile', icon: RxPerson },
  { id: 2, title: 'Orders', icon: HiOutlineShoppingBag },
  { id: 3, title: 'Refunds', icon: HiOutlineReceiptRefund },
  { id: 4, title: 'Inbox', icon: AiOutlineMessage, navigateTo: '/inbox' },
  { id: 5, title: 'Track Orders', icon: MdOutlineTrackChanges },
  { id: 6, title: 'Payment Methods', icon: AiOutlineCreditCard },
  { id: 7, title: 'Address', icon: TbAddressBook },
  { id: 8, title: 'Log out', icon: AiOutlineLogout, isLogout: true },
];

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  // Logout Handler
  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${server}/api/users/logout`, { withCredentials: true });
      toast.success(response.data.message);
      window.location.reload(true); // Ensure token is cleared and the profile UI updates
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Handle Sidebar Item Click
  const handleClick = (menu, index) => {
    setActive(index);

    if (menu.navigateTo) {
      navigate(menu.navigateTo);
    }

    if (menu.isLogout) {
      logoutHandler();
    }
  };

  return (
    <div className="w-full bg-[#D8F3FF] shadow-sm rounded-[10px] p-4 pt-8">
      {sideBarMenuConfig.map((menu, index) => {
        const isActive = active === index + 1; // Match the `active` state with index+1
        const Icon = menu.icon; // Get the icon component dynamically

        return (
          <div
            key={menu.id}
            className="flex items-center cursor-pointer w-full mb-6"
            onClick={() => handleClick(menu, index + 1)}
          >
            {/* Icon with dynamic color based on active state */}
            <Icon size={30} color={isActive ? 'red' : ''} title={menu.title}/>
            <span className={`pl-3 ${isActive ? 'text-red-500' : ''} 800px:block hidden `} >
              {menu.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileSidebar;




// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { RxPerson } from 'react-icons/rx'
// import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
// import {MdOutlineTrackChanges } from 'react-icons/md';
// import { TbAddressBook } from 'react-icons/tb';
// import { AiOutlineCreditCard, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai'
// import axios from 'axios';
// import { toast } from'react-toastify';
// import server from '../../server';

// const ProfileSidebar = ({active, setActive}) => {
    
//     const navigate = useNavigate();

//     const logoutHandler = async() => {
//         try {
//             const response = await axios.get(`${server}/api/users/logout`, { withCredentials: true });
//             toast.success(response.data.message)
//             window.location.reload(true) // this is to make sure that after the user is logged out token that been cleared from cookie storage the page refreshes that if the user goes back to the homepage the profile pic will not display
//             navigate('/login')
            
//         } catch (error) {
//             toast.error(error.response.data.message)  
//         }
//     }

//     const sideBarMenu = [
//         {
//             id: 1,
//             title: 'Profile',
//             icon: (isActive) => ( <RxPerson size={30} color={isActive ? 'red' : ''} />),
//             onClick: (index) => setActive(index)
//         },
//         {
//             id: 2,
//             title: 'Orders',
//             icon: (isActive) => (<HiOutlineShoppingBag size={30} color={isActive ? 'red' : '' } /> ),
//             onClick: (index) => setActive(index)
//         },
//         {
//             id: 3,
//             title: 'Refunds',
//             icon: (isActive) => (<HiOutlineReceiptRefund size={30} color={isActive ? 'red' : '' } />),
//             onClick: (index) => setActive(index)
//         },
//         {
//             id: 4,
//             title: 'Inbox',
//             icon: (isActive) => (<AiOutlineMessage size={30} color={isActive ? 'red' : '' } />),
//             onClick: (index) => setActive(index) || navigate('/inbox')
//         },
//         {
//             id: 5,
//             title: 'Track Orders',
//             icon: (isActive) => (<MdOutlineTrackChanges size={30} color={isActive ? 'red' : '' } />),
//             onClick: (index) => setActive(index)
//         },
//         {
//             id: 6,
//             title: 'Payment Methods',
//             icon: (isActive) => (<AiOutlineCreditCard size={30} color={isActive ? 'red' : '' } />),
//             onClick: (index) => setActive(index)
//         },
//         {
//             id: 7,
//             title: 'Address',
//             icon: (isActive) => (<TbAddressBook size={30} color={isActive ? 'red' : '' } />),
//             onClick: (index) => setActive(index)
//         },
//         {
//             id: 8,
//             title: 'Log out',
//             icon: (isActive) => (<AiOutlineLogout size={30} color={isActive ? 'red' : '' } />),
//             onClick: (index) => setActive(index) || logoutHandler()
//         },
        

//     ]

//   return (
//     <div className='w-full bg-[#D8F3FF] shadow-sm rounded-[10px] p-4 pt-8'>
//         {
//             sideBarMenu && sideBarMenu.map((menu, index) => ( //index starts with 0
//                 <div className="flex items-center cursor-pointer w-full mb-6" key={index} onClick={ () => menu.onClick(index + 1) }>
//                     {menu.icon(active === index + 1)}
//                     <span className={`pl-3 ${active === index + 1 ? 'text-red-500' : ''}`}>
//                         {menu.title}
//                     </span> 
        
//                 </div>
//             ))
//         }
       
//         {/* we can use map... put it in a list to iterate through them but later or want to do it this way */}
        

//     </div>
//   )
// }

// export default ProfileSidebar