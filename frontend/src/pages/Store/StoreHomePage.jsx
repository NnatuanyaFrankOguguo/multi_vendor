import React from 'react'
import styles from '../../styles/styles.jsx'
import ShopInfo from '../../components/Store/ShopInfo.jsx'
import ShopProfileData from '../../components/Store/ShopProfileData.jsx'
const StoreHomePage = () => {
  return (
    <div className={` bg-[#f5f5f5] py-10`}>
        {/* ShopInfo Section */}
        <ShopInfo isOwner={true} />
        
        {/* ShopProfileData Section sending value if its owner so that the owner can edit it if not then its users and they cannot edit it*/}
        <div className={`${styles.section} mt-8`}>
          <hr className=" border-[#d3d1d1]"/>
          <ShopProfileData isOwner={true} />
        </div>
    </div>
  )
}

export default StoreHomePage