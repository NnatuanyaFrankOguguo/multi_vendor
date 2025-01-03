import React from 'react'
import styles from '../../../styles/styles'
import { Link } from "react-router-dom";
import hero from './hero.webp'

const Hero = () => {
  return (
    <div
    className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover bg-center flex items-center justify-start ${styles.normalFlex}`}
    style={{ backgroundImage: `url(${hero})` }}
    >
        <div className={`w-[90%] 800px:w-[60%] mt-10 flex flex-col items-start px-5 800px:px-20`}>
            <h1
            className={`text-[24px] leading-[1.3] 800px:text-[50px] text-[#f7f6f6] font-[600] capitalize`}
            >
            Your Gateway to <br /> a Vibrant Marketplace
            </h1>
            <p
            className="pt-4 text-[12px] 800px:text-[14px] font-[Poppins] font-[400] text-[#dbf0d3ba]"
            >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
            assumenda? Quisquam itaque exercitationem labore vel, dolore
            quidem asperiores, laudantium temporibus soluta optio consequatur
            aliquam deserunt officia. Dolorum saepe nulla provident.
            </p>
            <Link to="/products" className="inline-block">
            <div
                className={`${styles.button} mt-4 px-8 py-2 800px:mt-5 800px:px-13`}
            >
                <span className="text-[#fff] font-[Poppins] text-[13px] 800px:text-[15px]">
                Shop Now
                </span>
            </div>
            </Link>
        </div>
    </div>

  )
}

export default Hero