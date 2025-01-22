import React, { useState } from 'react'
import Header from '../components/Layout/Headers'
import styles from '../styles/styles'
import ProfileSidebar from '../components/Profile/ProfileSidebar.jsx'
import ProfileContent from '../components/Profile/ProfileContent.jsx'

const ProfilePage = () => {

    const [active, setActive] = useState(1)


  return (
    <div>
        <Header />
        <div className={` mx-auto flex bg-[#BDE0FE] py-10 pl-[55px]`}>
            <div className='w-[335px]'>
                <ProfileSidebar active={active} setActive={setActive} />
            </div>

            <ProfileContent active={active} />

        </div>
        {/* you may choose to add footer or not */}
    </div>
  )
}

export default ProfilePage