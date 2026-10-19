import HeroSection from './components/HeroSection.jsx';
import Services from './components/Services.jsx';
import Audit from './components/Audit.jsx';
import Process from './components/Process.jsx';
import Expert from './components/Expert.jsx';
import Contacts from './components/Contacts.jsx';

export default function App() {
  return (
    <div className="font-sans text-ink">
      <HeroSection />
      <main>
        <Services />
        <Audit />
        <Process />
        <Expert />
      </main>
      <Contacts />
    </div>
  );
}
