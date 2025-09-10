import React from 'react'
import Header from '../components/Common/Header'
import ContactSection from '../components/Contact/ContactSection'
import ScrollingTextSection from "../components/Common/ScrollingTextSection";
import Footer from '../components/Common/Footer';
import WhereToFindUs from '../components/Contact/WhereToFindUs';

export default function ContactUsPage() {
  return (
    <>
    <Header />
    <ContactSection />
    <WhereToFindUs/>
    <ScrollingTextSection/>
    <Footer/>
    </>
  )
}
