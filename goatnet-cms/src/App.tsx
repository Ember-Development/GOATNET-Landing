// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import HeroSectionPage from "./pages/HeroSectionPage"; // ← new import
import { getToken } from "./helper/auth";
import AboutSectionPage from "./pages/AboutSectionPage";
import SolutionsPage from "./pages/SolutionsSection";
import ShowcasePage from "./pages/showcaseSection";
import CredentialPage from "./pages/CredentialSectionPage";
import PartnersPage from "./pages/PartnerSectionPage";

export default function App() {
  const token = getToken();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      {token ? (
        <>
          {/* 1) Dashboard “home” */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            }
          />

          {/* 2) Hero Section CMS */}
          <Route
            path="/dashboard/hero"
            element={
              <DashboardLayout
                header={<h1 className="text-3xl font-semibold">Hero</h1>}
              >
                <HeroSectionPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/about"
            element={
              <DashboardLayout
                header={<h1 className="text-3xl font-semibold">About Us</h1>}
              >
                <AboutSectionPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/solutions"
            element={
              <DashboardLayout
                header={<h1 className="text-3xl font-semibold">Solutions</h1>}
              >
                <SolutionsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/showcase"
            element={
              <DashboardLayout
                header={<h1 className="text-3xl font-semibold">Showcase</h1>}
              >
                <ShowcasePage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/credentials"
            element={
              <DashboardLayout
                header={<h1 className="text-3xl font-semibold">Credentials</h1>}
              >
                <CredentialPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/partners"
            element={
              <DashboardLayout
                header={<h1 className="text-3xl font-semibold">Partners</h1>}
              >
                <PartnersPage />
              </DashboardLayout>
            }
          />

          {/* (You can add more /dashboard/... pages here) */}
        </>
      ) : (
        // If not logged in, redirect everything to /login
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}

      {/* Catch‐all for undefined routes (if logged in, send to /dashboard; otherwise to /login) */}
      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}
