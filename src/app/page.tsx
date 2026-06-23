import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RealityCheck from "@/components/RealityCheck";
import TwoStageSystem from "@/components/TwoStageSystem";
import Curriculum from "@/components/Curriculum";
import Pricing from "@/components/Pricing";
import PaymentInfo from "@/components/PaymentInfo";
import Team from "@/components/Team";
import Instructor from "@/components/Instructor";
import Results from "@/components/Results";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Popup from "@/components/Popup";
import EnrollModal from "@/components/EnrollModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <RealityCheck />
        <TwoStageSystem />
        <Curriculum />
        <Pricing />
        <PaymentInfo />
        <Team />
        <Instructor />
        <Results />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Popup />
      <EnrollModal />
    </>
  );
}
