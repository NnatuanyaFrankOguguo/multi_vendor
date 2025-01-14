import React from 'react'
import styles from '../../../styles/styles'
import CountDown from './CountDown.jsx'
const EventCard = ({active}) => {
  return (
    <div className={` ${active ? "unset" : "mb-12"} w-full block bg-white rounded-lg lg:flex p-2 mb-12`}>
        <div className="w-full lg:[50%] m-auto">
            <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" /> {/*image suppose to be dynamic but for now  static */}
        </div>

        <div className='w-full lg:[w-50%] flex flex-col justify-center'>
            <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum et autem at voluptates dolor error ad maiores a, provident consequatur. Ratione, doloremque
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, sint aut. In itaque sunt tenetur perspiciatis ullam at magni aperiam, nihil nisi explicabo odio.
                ducimus reiciendis in sit aliquam esse sequi, facere sunt, quisquam laudantium?
            </p>

            <div className="flex py-2 justify-between">
                <div className="flex">
                    <h5 className='font-[500px] text-[17px] text-[#d55b45] pr-3 line-through'>
                        ₦990,000
                    </h5>
                    <h5 className='font-bold text-[18px] text-[#333] font-Roboto'>
                        ₦750,000
                    </h5>
                </div>
                <span className='pr-3 font-[400] text-[15px] text-[#44a55e]'>
                    120 sold
                </span>
            </div>

            <CountDown />  {/*countdown suppose to be dynamic but for now static */}

        </div>
    </div>
  )
}

export default EventCard