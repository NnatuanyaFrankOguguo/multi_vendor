import React from 'react'
import Header from '../components/Layout/Headers.jsx'

const Homepage = () => {
  return (
    <div>
        {/* sending the activeHeading as props to recieve the value on the header component */}
        <Header activeHeading={1} />
    </div>
  )
}

export default Homepage