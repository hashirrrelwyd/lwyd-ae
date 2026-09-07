import React from 'react'
import Header from '../components/Common/Header'
import HeroSection from '../components/About/HeroSection'
import AboutUs from '../components/About/AboutUs'
import WhatDrivesUs from '../components/About/WhatDrivesUs'
import Team from '../components/About/Team'
import Footer from '../components/Common/Footer'
import WorkTogether from '../components/Common/WorkTogether'
import ScrollingTextSection from '../components/Common/ScrollingTextSection'

export default function AboutPage() {
  return (
    <>
    <Header/>
    <HeroSection />
    <AboutUs />
    <WhatDrivesUs />
    <Team />
    <WorkTogether/>
    <ScrollingTextSection/>
    <Footer />
    </>
  )
}
