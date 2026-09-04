import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Solutions from '@/components/Solutions';
import HowItWorks from '@/components/HowItWorks';
import DailyGrounding from '@/components/DailyGrounding';
import Industries from '@/components/Industries';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative isolate overflow-x-hidden">
      <Navbar />
      <Hero />
      <Solutions />
      <HowItWorks />
      <DailyGrounding />
      <Industries />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
