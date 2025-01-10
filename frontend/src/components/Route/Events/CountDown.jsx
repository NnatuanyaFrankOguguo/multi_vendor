import React, { useEffect, useState } from 'react'

const CountDown = () => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
        
      return () => clearTimeout(timer);
    })

    function calculateTimeLeft() {
      const difference = +new Date('2025-01-11') - +new Date() //now // its supposed to be a dynamic day coming from the backend but we will make it static
      let timeLeft = {};
      
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        }
      }

      return timeLeft;
      
    }

    const timerComponents = Object.keys(timeLeft).map((interval) => {
      if(!timeLeft[interval])
      {
        return null;
      }

      return(
        <span className='text-[25px] text-[#4475ad]'>
          {timeLeft[interval]} {interval}{" "}
        </span>
      )
      
    })

  return (
    <div>
        {timerComponents.length ? timerComponents : <span className='text-[red] text-[25px]'>Time's up!</span>}
    </div>
  )
}

export default CountDown