import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import CustomCursor from "./components/Common/CustomCursor";
import SmoothScroll from "./components/Common/SmoothScroll";

export default function hello() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </>
  );
}
