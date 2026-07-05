import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Curriculum from "@/components/Curriculum";
import ClassFormat from "@/components/ClassFormat";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Instructor from "@/components/Instructor";
import Results from "@/components/Results";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Popup from "@/components/Popup";
import EnrollModal from "@/components/EnrollModal";
import FreeClassModal from "@/components/FreeClassModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Curriculum />
        <ClassFormat />
        <Pricing />
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
      <FreeClassModal />
    </>
  );
}
