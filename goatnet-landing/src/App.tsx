import { Routes, Route } from "react-router-dom";
import PageWrapper from "./layout.tsx/PageWrapper";
import LandingPage from "./sections/LandingPage";
import CrdntlPage from "./layout.tsx/CrdntlPage";
import "./App.css";
import AboutUsPage from "./layout.tsx/AboutPage";

export default function App() {
  return (
    <PageWrapper>
      <Routes>
        {/* Home */}
        <Route path="/" element={<LandingPage />} />
        {/* Nested pages */}
        <Route path="/crdntl" element={<CrdntlPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        {/* (Optionally, a catch-all 404 route) */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </PageWrapper>
  );
}
