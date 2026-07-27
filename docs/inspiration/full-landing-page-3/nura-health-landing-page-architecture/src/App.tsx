import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Philosophy from "./components/Philosophy";
import Protocol from "./components/Protocol";
import Membership from "./components/Membership";
import Footer from "./components/Footer";
import NoiseOverlay from "./components/NoiseOverlay";

export default function App() {
  return (
    <div className="noise-overlay relative bg-cream text-charcoal overflow-x-hidden">
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Membership />
      </main>
      <Footer />
    </div>
  );
}
