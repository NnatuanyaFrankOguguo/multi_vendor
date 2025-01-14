import React from 'react'
import Header from '../components/Layout/Headers'
import EventCard from '../components/Route/Events/EventCard'

const Events = () => {
  return (
    <div>
        <Header activeHeading={4} /> 
        <EventCard active={true} />
        <EventCard active={true} />

    </div>
  )
}

export default Events