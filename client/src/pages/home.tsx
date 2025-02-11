import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { PageTransition } from "@/components/layout/page-transition";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
          <ContactSection />
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}