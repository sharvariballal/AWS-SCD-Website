import { useState } from 'react';
import { CitySkylineCanvas } from './components/CitySkylineCanvas';
import { Navbar } from './components/Navbar';
import { SocialSidebar } from './components/SocialSidebar';
import { HeroSection } from './components/HeroSection';
import { MarqueeCarousel } from './components/MarqueeCarousel';
import { AboutSection } from './components/AboutSection';
import { CloudBuilderGame } from './components/CloudBuilderGame';
import { BuilderTerminal } from './components/BuilderTerminal';
import { CloudPersonaQuiz } from './components/CloudPersonaQuiz';
import { AgendaSection } from './components/AgendaSection';
import { SpotlightSection } from './components/SpotlightSection';
import { SwagLootSection } from './components/SwagLootSection';
import { TicketPassesSection } from './components/TicketPassesSection';
import { TeamSection } from './components/TeamSection';
import { VenueSection } from './components/VenueSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { CodeOfConductModal } from './components/CodeOfConductModal';

export function App() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isCodeOfConductOpen, setIsCodeOfConductOpen] = useState(false);
  const [selectedPass, setSelectedPass] = useState<string>('Super Early Bird (₹199)');

  const handleOpenRegistration = (passType?: string) => {
    if (passType) {
      setSelectedPass(passType);
    }
    setIsRegistrationModalOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden">
      {/* Interactive Skyline Canvas Background */}
      <CitySkylineCanvas />

      {/* Sticky Glassmorphic Navigation Bar with SFX Toggle */}
      <Navbar onRegisterClick={() => handleOpenRegistration()} />

      {/* Fixed Social Media Floating Sidebar */}
      <SocialSidebar />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* 1. Hero Section (Clean, Bold, Countdown to Jan 31 2027, Pune Venue) */}
        <HeroSection onRegisterClick={() => handleOpenRegistration()} />

        {/* 2. Photo Slideshow (Flashback Moments in the Cloud) */}
        <MarqueeCarousel />

        {/* 3. About Section (4 pillars: Learn, Build, Grow, Connect & Stats Ticker) */}
        <AboutSection />

        {/* 4. Interactive Cloud Architecture Simulator Game */}
        <CloudBuilderGame />

        {/* 5. Interactive AWS SBG Developer CLI Terminal */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0D1B2A]/95 border-y border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
              ⚡ AWS SBG CLI TERMINAL
            </span>
            <h3 className="text-2xl font-black text-white">
              Interact with the Summit Console
            </h3>
          </div>
          <BuilderTerminal />
        </section>

        {/* 6. Which AWS Cloud Persona Are You? (Quiz & Badge Generator) */}
        <CloudPersonaQuiz />

        {/* 7. Agenda & Track Schedule (Interactive track filter, room tags, calendar .ics) */}
        <AgendaSection />

        {/* 8. Speakers & Tiered Sponsors Spotlight Grid */}
        <SpotlightSection />

        {/* 9. Official Attendee Swag & Loot Box Preview */}
        <SwagLootSection />

        {/* 10. Book Tickets (4 Blocks: Super Early Bird, Early Bird, General, Squad Pass in ₹ with coupon tester) */}
        <TicketPassesSection onRegisterClick={(pass) => handleOpenRegistration(pass)} />

        {/* 11. Student Builder Group PICT Core Team & Volunteer Leads */}
        <TeamSection />

        {/* 12. Venue Section (Dakkhan Banquet Hall, Ambegoan, Katraj, Nahre, Pune + Transit guides) */}
        <VenueSection />

        {/* 13. FAQ Section */}
        <FAQSection />
      </main>

      {/* 14. Footer with Code of Conduct & Disclaimer */}
      <Footer onOpenCodeOfConduct={() => setIsCodeOfConductOpen(true)} />

      {/* Registration Modal Flow with Student ID verification */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistration}
        selectedPass={selectedPass}
      />

      {/* Code of Conduct Modal */}
      <CodeOfConductModal
        isOpen={isCodeOfConductOpen}
        onClose={() => setIsCodeOfConductOpen(false)}
      />
    </div>
  );
}

export default App;
