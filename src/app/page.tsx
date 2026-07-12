import React from "react";
import Navbar from "../components/layout/Navbar";
import AnimatedBlobs from "../components/ui/AnimatedBlobs";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import AISection from "../components/sections/AISection";
import Modules from "../components/sections/Modules";
import DashboardShowcase from "../components/sections/DashboardShowcase";
import MobileApp from "../components/sections/MobileApp";
import Industries from "../components/sections/Industries";
import Integrations from "../components/sections/Integrations";
import Testimonials from "../components/sections/Testimonials";
import Pricing from "../components/sections/Pricing";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Animated Gradients */}
      <AnimatedBlobs />

      {/* Navigation */}
      <Navbar />

      {/* Landing Content */}
      <main className="relative z-10 w-full">
        <Hero />
        <Features />
        <AISection />
        <Modules />
        <DashboardShowcase />
        <MobileApp />
        <Industries />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
