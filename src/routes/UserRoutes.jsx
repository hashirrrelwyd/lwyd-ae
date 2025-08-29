import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ScrollToTop from "../utils/ScrollToTop";

export default function UserRoutes() {
  return (
    <>
    <ScrollToTop/>
    <Routes>
        <Route path="/" element={<HomePage/>} />
    </Routes>
    </>
  )
}
