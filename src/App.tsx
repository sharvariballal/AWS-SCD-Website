import { useState } from 'react';
import { CitySkylineCanvas } from './components/CitySkylineCanvas';
import { Navbar } from './components/Navbar';
import { SocialSidebar } from './components/SocialSidebar';
import { HeroSection } from './components/HeroSection';
import { MarqueeCarousel } from './components/MarqueeCarousel';
import { AboutSection } from './components/AboutSection';
import { AgendaSection } from './components/AgendaSection';
import { SpotlightSection } from './components/SpotlightSection';
import { TicketPassesSection } from './components/TicketPassesSection';
import { VenueSection } from './components/VenueSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';

export function App() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const handleOpenRegistration = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden">
      {/* Interactive Skyline Canvas Background */}
      <CitySkylineCanvas />

      {/* Sticky Glassmorphic Navigation Bar */}
      <Navbar onRegisterClick={handleOpenRegistration} />

      {/* Fixed Social Media Floating Sidebar */}
      <SocialSidebar />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* 1. Hero Section (Simple, Clean, Countdown to Jan 31 2027, Pune Venue) */}
        <HeroSection onRegisterClick={handleOpenRegistration} />

        {/* 2. Photo Slideshow (Pure Photos Only, No unnecessary headings or locations) */}
        <MarqueeCarousel />

        {/* 3. About Section (Custom user text, 4 pillars, no 3 audience cards) */}
        <AboutSection />

        {/* 4. Agenda Section (Teaser badge only, no email input, no sneak peek) */}
        <AgendaSection />

        {/* 5. Speakers & Tiered Sponsors Spotlight Grid */}
        <SpotlightSection />

        {/* 6. Book Tickets (4 Blocks: Super Early Bird, Early Bird, General, Group Discount in ₹) */}
        <TicketPassesSection onRegisterClick={handleOpenRegistration} />

        {/* 7. Venue Section (Dakkhan Banquet Hall, Ambegoan, Katraj, Nahre, Pune) */}
        <VenueSection />

        {/* 8. FAQ Section */}
        <FAQSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Registration Modal Flow */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistration}
      />
    </div>
  );
}

export default App;
