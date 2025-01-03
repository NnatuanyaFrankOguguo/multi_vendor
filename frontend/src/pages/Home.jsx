import React from 'react'
import Header from '../components/Layout/Headers.jsx'
import Hero from '../components/Route/Hero/Hero.jsx'

const Homepage = () => {
  return (
    <div>
        {/* sending the activeHeading as props to recieve the value on the header component */}
        <Header activeHeading={1} />
        <Hero />
    </div>
  )
}

export default Homepage