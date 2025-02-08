import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../assets/slim_leavs_ani.json'

const Loader = () => {

    const defaultOptins = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <Lottie options={defaultOptins} width={200} height={200}/>
    </div>
  )
}

export default Loader