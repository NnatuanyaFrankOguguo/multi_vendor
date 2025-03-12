import React, { useState } from 'react';
import DashboardHeader from '../../components/Store/Layout/DashboardHeader.jsx';
import DashboardSidebar from '../../components/Store/Layout/DashboardSider.jsx';
import AllEvents from '../../components/Store/AllEvents.jsx';

const StoreAllEvents = () => {
    const [open, setOpen ] = useState(false)
    return (
      <div>
          <DashboardHeader />
          <div  className={`w-full flex items-center justify-between md:flex-row `}>
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
              md:block bg-[#F5F5DC] z-10 h-[calc(100vh - 160px)] md:h-auto overflow-y-auto`}
              style={{ 
                msOverflowStyle: "none",  // For Internet Explorer and Edge
                scrollbarWidth: "none"     // For Firefox
              }}>
              {/* Pass setOpen along with active and setActive */}
              <DashboardSidebar active={33} subActive={6}  setOpen={setOpen} />
            </div>
            <div className="w-full md:w-[calc(100% - 335px)] mt-4 md:mt-0">
                {/* Your product creation form goes here */}
                <AllEvents />
                {/* Add more fields for product details */}
            </div>
          </div>
      </div>
      
    )
}

export default StoreAllEvents