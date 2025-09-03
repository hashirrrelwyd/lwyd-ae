import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ScrollToTop from "../utils/ScrollToTop";
import AboutPage from "../pages/AboutPage";
import ServicePage from "../pages/ServicePage";
import WorkPage from "../pages/WorkPage";
import CareerPage from "../pages/CareerPage";
import ContactUsPage from "../pages/ContactUsPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";

export default function UserRoutes() {
  return (
    <>
    <ScrollToTop/>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/service" element={<ServicePage/>} />
        <Route path="/work" element={<WorkPage/>} />
        <Route path="/career" element={<CareerPage/>} />
        <Route path="/contact" element={<ContactUsPage/>} />
        <Route path="/privacy" element={<PrivacyPolicy/>} />
        <Route path="/terms" element={<TermsConditions/>} />
    </Routes>
    </>
  )
}
