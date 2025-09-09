import React from 'react'
import HeroSection from '../components/Career/HeroSection'
import Header from '../components/Common/Header'
import LifeAtLwyd from '../components/Career/LifeAtLwyd'
import Culture from '../components/Career/Culture'
import ScrollingTextSection from "../components/Common/ScrollingTextSection";
import Footer from '../components/Common/Footer'

export default function CareerPage() {
  return (
    <>
    <Header />
    <HeroSection />
    <LifeAtLwyd />
    <Culture />
    <ScrollingTextSection/>
    <Footer/>
    </>
  )
}
