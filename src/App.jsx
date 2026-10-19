import HeroSection from './components/HeroSection.jsx';
import Services from './components/Services.jsx';
import Audit from './components/Audit.jsx';
import Expert from './components/Expert.jsx';
import Clients from './components/Clients.jsx';
import Contacts from './components/Contacts.jsx';

export default function App() {
  return (
    <div className="font-sans text-ink">
      <HeroSection />
      <main>
        <Services />
        <Audit />
        <Expert />
        <Clients />
      </main>
      <Contacts />
    </div>
  );
}
