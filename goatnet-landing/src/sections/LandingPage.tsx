import Hero from "../components/Hero";
import About from "../components/About";
import Showcase from "../components/Showcase";
import Solutions from "../components/Solutions";
import Footer from "../components/Footer";
import Navbar from "../layout.tsx/Navbar";
import CallToAction from "../components/CallToAction";
import Members from "../components/members";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Showcase />
      <Solutions />
      <CallToAction />
      <Members />
      <Footer />
    </>
  );
};

export default LandingPage;
