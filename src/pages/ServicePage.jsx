import Header from '../components/Common/Header'
import WorkTogether from '../components/Common/WorkTogether'
import HeroSection from '../components/Service/HeroSection'
import WhyChooseUs from '../components/Service/WhyChooseUs'
import ScrollingTextSection from '../components/Common/ScrollingTextSection'
import Footer from '../components/Common/Footer'
import WorkSection from '../components/Common/WorkSection'
import OurServices from '../components/Service/OurServices'

export default function ServicePage() {
  return (
    <>
    <Header />
    <HeroSection />
    <OurServices />
    <WhyChooseUs />
    <WorkSection connected />
    <WorkTogether />
    <ScrollingTextSection/>
    <Footer />
    </>
  )
}
