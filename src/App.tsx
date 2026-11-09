import { useState } from 'react';
import { StudioNavbar } from './components/StudioNavbar';
import { ShutterGateHero } from './components/ShutterGateHero';
import { InteractiveHeroStudio } from './components/InteractiveHeroStudio';
import { StorytellingSection } from './components/StorytellingSection';
import { CloudCityMap } from './components/CloudCityMap';
import { PolaroidFlashbackGallery } from './components/PolaroidFlashbackGallery';
import { ServiceCircuitJammer } from './components/ServiceCircuitJammer';
import { ConferenceMatrix } from './components/ConferenceMatrix';
import { SpeakerShowcase } from './components/SpeakerShowcase';
import { LootBoxVault } from './components/LootBoxVault';
import { TicketDispenser } from './components/TicketDispenser';
import { SponsorShowcase } from './components/SponsorShowcase';
import { VenueBlueprint } from './components/VenueBlueprint';
import { FAQStudio } from './components/FAQStudio';
import { StudioFooter } from './components/StudioFooter';
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
      className={`min-h-screen bg-[#F8F5FF] text-[#1F0B38] font-sans selection:bg-purple-200 selection:text-purple-950 relative ${
        !isGateUnlocked ? 'h-screen overflow-hidden' : 'overflow-x-hidden'
      }`}
    >
      {/* 1. True Locked-Viewport Scrollytelling Portal:
          Locks viewport on load, scrubs video 0.0 to 0.8, and seamlessly transitions to homepage 0.8 to 1.0 */}
      <ShutterGateHero
        isUnlocked={isGateUnlocked}
        onUnlock={() => setIsGateUnlocked(true)}
        onReplay={() => setIsGateUnlocked(false)}
        onQuickRegister={() => handleOpenRegistration('Early Bird Pass (₹299)')}
      />

      {/* 2. Studio Sticky Navigation Bar:
          Hidden during gate entrance; revealed once gate opens and transitions to homepage */}
      {isGateUnlocked && (
        <StudioNavbar
          onRegisterClick={() => handleOpenRegistration('Early Bird Pass (₹299)')}
          onReplayGate={() => setIsGateUnlocked(false)}
        />
      )}

      {/* Main Content Area: The Home Page (Unlocked after gate sequence finishes) */}
      <main
        className={`relative z-10 transition-opacity duration-700 ${
          !isGateUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        {/* Summit Announcement Billboard */}
        <InteractiveHeroStudio onRegisterClick={(pass) => handleOpenRegistration(pass || 'Early Bird Pass (₹299)')} />

        {/* Storytelling Section with Scroll-Driven Text Reveal & 4 Pillars (Big Ideas. Bigger Community) */}
        <section id="storytelling">
          <StorytellingSection />
        </section>

        {/* Interactive Pastel 3D Isometric Cityscape & Location Pins with Left-Side Sliding Info Drawer */}
        <CloudCityMap />

        {/* Tactile Polaroid Camera Flashback Gallery (Replacing Horizontal Marquee) */}
        <PolaroidFlashbackGallery />

        {/* Interactive Arcade Alley Game: Service Circuit Jammer */}
        <ServiceCircuitJammer />

        {/* Agenda & Sessions Matrix */}
        <ConferenceMatrix />

        {/* Featured Speakers & Call for Speakers (CFP) Showcase */}
        <SpeakerShowcase onOpenCFPModal={() => setIsCFPModalOpen(true)} />

        {/* Official Swag Box & Perks Vault */}
        <LootBoxVault />

        {/* Pass Dispensary (Early Bird ₹299 LIVE NOW, KonfHub Direct Provision) */}
        <TicketDispenser onRegisterClick={(pass) => handleOpenRegistration(pass)} />

        {/* Sponsors & Ecosystem Partners Showcase */}
        <SponsorShowcase onOpenSponsorModal={() => setIsSponsorModalOpen(true)} />

        {/* Venue Blueprint & Embedded Google Maps Visual */}
        <VenueBlueprint />

        {/* Frequently Asked Questions Studio */}
        <FAQStudio />
      </main>

      {/* Studio Footer (Shown once on homepage) */}
      {isGateUnlocked && (
        <StudioFooter onOpenCodeOfConduct={() => setIsCodeOfConductOpen(true)} />
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
