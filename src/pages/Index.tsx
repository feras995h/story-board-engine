import { useState } from "react";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { AboutSection } from "@/components/ui/about-section";
import { AdminDashboard } from "@/components/ui/admin-dashboard";

const Index = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="about">
          <AboutSection />
        </section>
      </main>
      
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
};

export default Index;
