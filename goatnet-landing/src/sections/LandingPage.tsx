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

  const handleSubmit = async (data: UserInfo) => {
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwJfGXgtTLeKIegi_WfV02uroAszJqf_hUN9_dwDkNB8u0aNeEW7xREtwemx6dN8n1-8Q/exec",
        {
          method: "POST",
          mode: "no-cors", // Required for Apps Script, disables error reporting
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Submitted to Google Sheet:", data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <>
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero />
      <About />
      <Solutions />
      <Showcase />
      <CallToAction onOpenModal={() => setModalOpen(true)} />
      <Members onOpenModal={() => setModalOpen(true)} />
      <Footer />

      <UserTypeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
