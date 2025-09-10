import React from 'react'
import HeroSection from '../components/Career/HeroSection'
import Header from '../components/Common/Header'
import LifeAtLwyd from '../components/Career/LifeAtLwyd'
import Culture from '../components/Career/Culture'
import ScrollingTextSection from "../components/Common/ScrollingTextSection";
import Footer from '../components/Common/Footer'
import OpenRoles from '../components/Career/OpenRoles'
import Faqs from '../components/Career/Faqs'

export default function CareerPage() {
  return (
    <>
    <Header />
    <HeroSection />
    <LifeAtLwyd />
    <Culture />
    <OpenRoles/>
    <Faqs/>
    <ScrollingTextSection/>
    <Footer/>
    </>
  )
}
