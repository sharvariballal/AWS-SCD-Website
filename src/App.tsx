import { useState } from 'react';
import { CitySkylineCanvas } from './components/CitySkylineCanvas';
import { Navbar } from './components/Navbar';
import { SocialSidebar } from './components/SocialSidebar';
import { ShutterGateHero } from './components/ShutterGateHero';
import { InteractiveHeroStudio } from './components/InteractiveHeroStudio';
import { CloudCityMap } from './components/CloudCityMap';
import { StageProgramSection } from './components/StageProgramSection';
import { TicketDispenser } from './components/TicketDispenser';
import { PolaroidFlashbackGallery } from './components/PolaroidFlashbackGallery';
import { SponsorShowcase } from './components/SponsorShowcase';
import { VenueBlueprint } from './components/VenueBlueprint';
import { FAQStudio } from './components/FAQStudio';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { SpeakerRegistrationModal } from './components/SpeakerRegistrationModal';
import { SponsorRegistrationModal } from './components/SponsorRegistrationModal';
import { CodeOfConductModal } from './components/CodeOfConductModal';
import { TICKETING_CONFIG } from './config/ticketing';

export function App() {
  const [isGateUnlocked, setIsGateUnlocked] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isCFPModalOpen, setIsCFPModalOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [isCodeOfConductOpen, setIsCodeOfConductOpen] = useState(false);
  const [selectedPass, setSelectedPass] = useState<string>('Early Bird Pass (₹299)');

  const handleOpenRegistration = (passType?: string) => {
    // If KonfHub is configured, redirect directly to KonfHub checkout
    if (TICKETING_CONFIG.provider === 'konfhub' && TICKETING_CONFIG.konfhubEventUrl) {
      window.open(TICKETING_CONFIG.konfhubEventUrl, '_blank');
      return;
    }

    if (passType) {
      setSelectedPass(passType);
    }
    setIsRegistrationModalOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationModalOpen(false);
  };

  return (
    <div
      className={`min-h-screen bg-[#070415] text-[#F8FAFC] font-sans selection:bg-amber-400 selection:text-slate-950 relative ${
        !isGateUnlocked ? 'h-screen overflow-hidden' : 'overflow-x-hidden'
      }`}
    >
      {/* 1. Animated Night Sky Skyline Canvas from main */}
      <CitySkylineCanvas />

      {/* 2. Cinematic Shutter Portal Gate */}
      <ShutterGateHero
        isUnlocked={isGateUnlocked}
        onUnlock={() => setIsGateUnlocked(true)}
        onReplay={() => setIsGateUnlocked(false)}
      />

      {/* 3. Sticky Glassmorphic Navigation Bar from main */}
      {isGateUnlocked && (
        <Navbar
          onRegisterClick={() => handleOpenRegistration('Early Bird Pass (₹299)')}
          onReplayGate={() => {
            setIsGateUnlocked(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />
      )}

      {/* 4. Fixed Social Media Floating Sidebar from main */}
      {isGateUnlocked && <SocialSidebar />}

      {/* 5. Main Content Area: The Home Page (Unlocked after gate sequence finishes) */}
      <main
        className={`relative z-10 transition-opacity duration-700 ${
          !isGateUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        {/* Summit Announcement Billboard & Countdown */}
        <InteractiveHeroStudio onRegisterClick={(pass) => handleOpenRegistration(pass || 'Early Bird Pass (₹299)')} />

        {/* Living Isometric Metropolis Vector Map & 4 Experience Districts */}
        <CloudCityMap />

        {/* Unified Stage & Program: Single-Stage Schedule + Curated Speakers & Open CFP */}
        <StageProgramSection onOpenCFPModal={() => setIsCFPModalOpen(true)} />

        {/* Pass Dispensary & Everything Included In Every Pass (Unified Layout) */}
        <TicketDispenser onRegisterClick={(pass) => handleOpenRegistration(pass)} />

        {/* Compact Authentic Community Flashback Reel (SCD 2026 Archive) */}
        <PolaroidFlashbackGallery />

        {/* Sponsors & Ecosystem Partners Showcase */}
        <SponsorShowcase onOpenSponsorModal={() => setIsSponsorModalOpen(true)} />

        {/* Venue Blueprint & Embedded Google Maps Visual (Single Hall Reality) */}
        <VenueBlueprint />

        {/* Frequently Asked Questions Studio */}
        <FAQStudio />
      </main>

      {/* 6. Footer from main */}
      {isGateUnlocked && (
        <Footer onOpenCodeOfConduct={() => setIsCodeOfConductOpen(true)} />
      )}

      {/* Student Verification Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistration}
        selectedPass={selectedPass}
      />

      {/* Call for Speakers (CFP) Proposal Modal */}
      <SpeakerRegistrationModal
        isOpen={isCFPModalOpen}
        onClose={() => setIsCFPModalOpen(false)}
      />

      {/* Sponsor Inquiry Registration Modal */}
      <SponsorRegistrationModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />

      {/* Code of Conduct Compliance Modal */}
      <CodeOfConductModal
        isOpen={isCodeOfConductOpen}
        onClose={() => setIsCodeOfConductOpen(false)}
      />
    </div>
  );
}

export default App;
