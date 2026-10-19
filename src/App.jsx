import HeroSection from './components/HeroSection.jsx';
import Services from './components/Services.jsx';
import Advantages from './components/Advantages.jsx';
import Clients from './components/Clients.jsx';
import Contacts from './components/Contacts.jsx';

export default function App() {
  return (
    <div className="text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
      <HeroSection />
      <main>
        <Services />
        <Advantages />
        <Clients />
      </main>
      <Contacts />
    </div>
  );
}
