import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TravelCompanionModal from '../components/common/TravelCompanionModal';
import FloatingCompanionButton from '../components/common/FloatingCompanionButton';
import { useSEO } from '../hooks/useSEO';

export default function Layout({ children }) {
  const [companionOpen, setCompanionOpen] = useState(false);
  useSEO();

  return (
    <>
        <Navbar />
        <main>{children || <Outlet />}</main>
        <Footer />
        <FloatingCompanionButton onClick={() => setCompanionOpen(true)} />
        <TravelCompanionModal open={companionOpen} onClose={() => setCompanionOpen(false)} />
      </>
  );
}
