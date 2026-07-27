import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import WhyVisit from "./components/sections/WhyVisit";
import FeaturedDestinations from "./components/sections/FeaturedDestinations";
import Food from "./components/sections/Food";
import Festival from "./components/sections/Festival";
import FutureFeatures from "./components/sections/FutureFeatures";
import TravelCompanionModal from "./components/common/TravelCompanionModal";
import FloatingCompanionButton from "./components/common/FloatingCompanionButton";
import AuthModal from "./components/common/AuthModal";

function App() {
  const [companionOpen, setCompanionOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <Navbar onOpenCompanion={() => setCompanionOpen(true)} onOpenAuth={() => setAuthOpen(true)} />
      <Hero />
      <About />
      <WhyVisit />
      <FeaturedDestinations />
      <Food />
      <Festival />
      <FutureFeatures />
      <Footer onOpenCompanion={() => setCompanionOpen(true)} />

      <FloatingCompanionButton onClick={() => setCompanionOpen(true)} />
      <TravelCompanionModal open={companionOpen} onClose={() => setCompanionOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </AuthProvider>
  );
}

export default App;
