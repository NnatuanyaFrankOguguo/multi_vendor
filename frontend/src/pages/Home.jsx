import React from 'react'
import Header from '../components/Layout/Headers.jsx'
import Hero from '../components/Route/Hero/Hero.jsx'
import Categories from '../components/Route/Category/Categories.jsx'
import BestDeals from '../components/Route/BestDeals/BestDeals.jsx'

const Homepage = () => {
  return (
    <div>
        {/* sending the activeHeading as props to recieve the value on the header component */}
        <Header activeHeading={1} />
        <Hero />
        <Categories />
        <BestDeals />
    </div>
  )
}

export default Homepage