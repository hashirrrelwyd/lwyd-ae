import HeroSection from "../components/Home/HeroSection";
import Header from "../components/Common/Header";
import AboutSection from "../components/Home/AboutSection";
import WorkSection from "../components/Home/WorkSection";
import OurService from "../components/Home/OurService";
import Footer from "../components/Common/Footer";
import ScrollingTextSection from "../components/Common/ScrollingTextSection";
import ContactUs from "../components/Home/ContactUs";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <WorkSection/>
      <OurService/>
      <ContactUs/>
      <ScrollingTextSection/>
      <Footer/>
    </>
  );
}
