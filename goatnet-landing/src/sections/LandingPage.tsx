// src/sections/LandingPage.tsx
import { useState } from "react";
import Navbar from "../layout.tsx/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Showcase from "../components/Showcase";
import Solutions from "../components/Solutions";
import CallToAction from "../components/CallToAction";
import Members from "../components/members";
import Footer from "../components/Footer";
import UserTypeModal, { type UserInfo } from "../components/UserTypeModal";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleUserSubmit = (data: UserInfo) => {
    console.log("Submitted user info:", data);
    // TODO: send to your API or newsletter service
  };

  return (
    <>
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero />
      <About />
      <Showcase />
      <Solutions />
      <CallToAction onOpenModal={() => setModalOpen(true)} />
      <Members />
      <Footer />

      <UserTypeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleUserSubmit}
      />
    </>
  );
}
