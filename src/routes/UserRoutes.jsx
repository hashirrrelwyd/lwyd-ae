import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ScrollToTop from "../utils/ScrollToTop";
import AboutPage from "../pages/AboutPage";

export default function UserRoutes() {
  return (
    <>
    <ScrollToTop/>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
    </Routes>
    </>
  )
}
