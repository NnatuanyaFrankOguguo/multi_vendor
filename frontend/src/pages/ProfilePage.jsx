// In ProfilePage.jsx
import React, { useState } from 'react'
import Header from '../components/Layout/Headers'
import ProfileSidebar from '../components/Profile/ProfileSidebar.jsx'
import ProfileContent from '../components/Profile/ProfileContent.jsx'

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header />
      <div className={`mx-auto flex flex-col md:flex-row bg-[#BDE0FE] py-10 pl-[25px] 800px:pl-[55px]`}>
        {/* Mobile Menu Button */}
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <button 
            onClick={() => setOpen(!open)}
            className="p-3 bg-white rounded-full shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div className={`w-full md:w-[335px] fixed md:relative bottom-0 left-0 transform transition-transform duration-300 shadow-md rounded-md
          ${open ? 'translate-y-0' : 'translate-y-full md:translate-y-0'} 
          md:block bg-[#D8F3FF] z-10 h-[calc(100vh - 160px)] md:h-auto overflow-y-auto`}
          style={{ 
            msOverflowStyle: "none",  // For Internet Explorer and Edge
            scrollbarWidth: "none"     // For Firefox
          }}>
          {/* Pass setOpen along with active and setActive */}
          <ProfileSidebar active={active} setActive={setActive} setOpen={setOpen} />
        </div>

        {/* Content */}
        <div className="w-full md:w-[calc(100% - 335px)] mt-4 md:mt-0">
          <ProfileContent active={active} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
