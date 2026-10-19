import HeroSection from './components/HeroSection.jsx';
import Services from './components/Services.jsx';
import Pricing from './components/Pricing.jsx';
import Calculator from './components/Calculator.jsx';
import OneOff from './components/OneOff.jsx';
import HowWeWork from './components/HowWeWork.jsx';
import Expert from './components/Expert.jsx';
import Contacts from './components/Contacts.jsx';

export default function App() {
  return (
    <div className="font-sans text-ink">
      <HeroSection />
      <main>
        <Services />
        <Pricing />
        <Calculator />
        <OneOff />
        <HowWeWork />
        <Expert />
      </main>
      <Contacts />
    </div>
  );
}
