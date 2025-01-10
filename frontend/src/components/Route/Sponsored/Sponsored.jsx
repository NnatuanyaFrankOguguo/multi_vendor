import React from 'react'
import styles from '../../../styles/styles'

const Sponsored = () => {
    // bg-[#21211f]
    
  return (
    <div className={`${styles.section} hidden sm:block bg-[#21211f] py-10 px-5 mb-12 cursor-pointer rounded-xl mt-12`}>
        <div className='flex justify-between w-full'>
            <div className='flex items-start'>
                <img src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png" alt="" style={{width:"150px", objectFit:"contain"}} />
            </div>
            <div className='flex items-start'>
                <img src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png" alt=""  style={{width:"150px", objectFit:"contain"}}/>
            </div>
            <div className='flex items-start'>
                <img src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png" alt=""  style={{width:"150px", objectFit:"contain"}} />
            </div>
            <div className='flex items-start'>
                <img src="https://www.vectorlogo.zone/logos/apple/apple-ar21.png" alt=""  style={{width:"150px", objectFit:"contain"}}/>
            </div>
            <div className='flex items-start'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png" alt=""  style={{width:"150px", objectFit:"contain"}}/>
            </div>

        </div>

    </div>
  )
}

export default Sponsored