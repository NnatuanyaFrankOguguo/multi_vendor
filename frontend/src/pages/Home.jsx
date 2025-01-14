import React from 'react'
import Header from '../components/Layout/Headers.jsx'
import Hero from '../components/Route/Hero/Hero.jsx'
import Categories from '../components/Route/Category/Categories.jsx'
import BestDeals from '../components/Route/BestDeals/BestDeals.jsx'
import FeaturedProducts from '../components/Route/FeaturedProducts/FeaturedProducts.jsx'
import Events from '../components/Route/Events/Events.jsx'
import Sponsored from '../components/Route/Sponsored/Sponsored.jsx'
import Footer from '../components/Layout/Footer.jsx'
const Homepage = () => {

  // Nigeria's online B2B/B2C growing marketplace—your hassle-free hub for quality agriculture. 
  // We connect farmers, buyers, and suppliers, making trading seamless and stress-free. 
  //Enjoy quick and easy buying while we take care of the rest—quality products, seamless delivery, and a stress-free experience!
  //when doing the component tell chatgpt to structure it with a nice layout and design font color orange, bisque, green, n image on the right or video


  return (
    <div>
        {/* sending the activeHeading as props to recieve the value on the header component */}
        <Header activeHeading={1} />
        <Hero />
        <Categories />
        <BestDeals />
        <Events />
        <FeaturedProducts />
        <Sponsored />
        <Footer />
    </div>
  )
}

export default Homepage