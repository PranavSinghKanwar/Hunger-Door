import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
function Home() {
  return (
    <div>
      <Navbar/>
      <Carousel />
      <div>
        <Card />
      </div>
      <Footer />
    </div>
  )
}

export default Home
