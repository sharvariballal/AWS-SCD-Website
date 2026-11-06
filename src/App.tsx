import { useState } from 'react';
import { StudioNavbar } from './components/StudioNavbar';
import { InteractiveHeroStudio } from './components/InteractiveHeroStudio';
import { ServiceCircuitJammer } from './components/ServiceCircuitJammer';
import { ConferenceMatrix } from './components/ConferenceMatrix';
import { SpeakerShowcase } from './components/SpeakerShowcase';
import { LootBoxVault } from './components/LootBoxVault';
import { TicketDispenser } from './components/TicketDispenser';
import { StudentCrew } from './components/StudentCrew';
import { VenueBlueprint } from './components/VenueBlueprint';
import { FAQStudio } from './components/FAQStudio';
import { StudioFooter } from './components/StudioFooter';
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
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden">
      {/* 1. Studio Sticky Navigation Bar */}
      <StudioNavbar onRegisterClick={() => handleOpenRegistration('Super Early Bird (₹199)')} />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* 2. Interactive Hero Studio with Live 3D Lanyard Student ID Pass Simulator */}
        <InteractiveHeroStudio onRegisterClick={() => handleOpenRegistration('Super Early Bird (₹199)')} />

        {/* 3. Cloud Service Circuit Jammer (Interactive Soundboard & Architecture Event Trigger) */}
        <ServiceCircuitJammer />

        {/* 4. Conference Track Matrix (Detailed timestamps, room tags, .ICS download) */}
        <ConferenceMatrix />

        {/* 5. Featured Speakers & Mentors Showcase (Neo-brutalist Engineer Trading Cards) */}
        <SpeakerShowcase />

        {/* 6. Attendee Loot Box Vault (Physical Swag & Perks unboxing preview) */}
        <LootBoxVault />

        {/* 7. Pass Dispensary Machine (Perforated ticket stub & coupon validator) */}
        <TicketDispenser onRegisterClick={(pass) => handleOpenRegistration(pass)} />

        {/* 8. AWS Student Builder Group PICT Core Crew */}
        <StudentCrew />

        {/* 9. Venue Blueprint & Pune Transit Routes */}
        <VenueBlueprint />

        {/* 10. Frequently Asked Questions Studio */}
        <FAQStudio />
      </main>

      {/* 11. Studio Footer */}
      <StudioFooter onOpenCodeOfConduct={() => setIsCodeOfConductOpen(true)} />

      {/* Student Verification Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistration}
        selectedPass={selectedPass}
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
