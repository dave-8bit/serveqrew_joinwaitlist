import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Ambassadors from '../components/Ambassadors';
import Collaborators from '../components/Collaborators';
import Leaderboard from '../components/Leaderboard';
import WaitlistForm from '../components/WaitlistForm';
import FAQ from '../components/FAQ';
import ContactStrip from '../components/ContactStrip';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    // We use bg-slate-950 as the master background for the whole stream
    <main className="min-h-screen bg-slate-950 selection:bg-secondary-teal selection:text-white">
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Social Proof Sections */}
      <Ambassadors />
      <Collaborators />
      
      {/* CONVERSION ZONE 
          The grid layout for Leaderboard and Form. 
          The bg-transparent ensures they sit on the master slate background.
      */}
      <section id="join" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Leaderboard />
          <WaitlistForm />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Floating UI Elements */}
      <ContactStrip />

      {/* Footer */}
      <Footer />
    </main>
  );
}