import { useState } from 'react';
import { StudioNavbar } from './components/StudioNavbar';
import { InteractiveHeroStudio } from './components/InteractiveHeroStudio';
import { MarqueeCarousel } from './components/MarqueeCarousel';
import { CloudCityMap } from './components/CloudCityMap';
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
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden">
      {/* 1. Studio Sticky Navigation Bar */}
      <StudioNavbar onRegisterClick={() => handleOpenRegistration('Early Bird Pass (₹299)')} />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* 2. Advert Hero with Live Ticket Status Marquee & Countdown to 07 Feb 2027 */}
        <InteractiveHeroStudio onRegisterClick={(pass) => handleOpenRegistration(pass || 'Early Bird Pass (₹299)')} />

        {/* 3. Flashback to SCD 2026: Real Authentic Community Moments */}
        <MarqueeCarousel />

        {/* 4. Top-Down Architectural Cloud City District Map (6 Zones Layout) */}
        <CloudCityMap />

        {/* 5. Interactive Arcade Alley Game: Service Circuit Jammer & Serverless Simulator */}
        <ServiceCircuitJammer />

        {/* 6. Agenda & Sessions Matrix (Locked Frosted Teaser Mode) */}
        <ConferenceMatrix />

        {/* 7. Featured Speakers & Call for Speakers (CFP) Showcase */}
        <SpeakerShowcase onOpenCFPModal={() => setIsCFPModalOpen(true)} />

        {/* 8. Official Swag Box & Perks Vault (Curated Mystery Loot Box Preview) */}
        <LootBoxVault />

        {/* 9. Pass Dispensary (Early Bird ₹299 LIVE NOW, KonfHub Direct Provision) */}
        <TicketDispenser onRegisterClick={(pass) => handleOpenRegistration(pass)} />

        {/* 10. Sponsors & Ecosystem Partners Showcase */}
        <SponsorShowcase onOpenSponsorModal={() => setIsSponsorModalOpen(true)} />

        {/* 11. Venue Blueprint & Embedded Google Maps Visual */}
        <VenueBlueprint />

        {/* 12. Frequently Asked Questions Studio */}
        <FAQStudio />
      </main>

      {/* 13. Studio Footer */}
      <StudioFooter onOpenCodeOfConduct={() => setIsCodeOfConductOpen(true)} />

      {/* Student Verification Registration Modal (Fallback for non-KonfHub modes) */}
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
