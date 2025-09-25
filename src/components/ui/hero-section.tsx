import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-float">
          <span className="bg-gradient-hero bg-clip-text text-transparent">
            جمعية المحيط الأخضر للحلول البيئية
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          معاً نحو مستقبل أخضر ومستدام للأجيال القادمة
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="default" 
            size="lg"
            className="min-w-[150px] animate-glow bg-primary hover:bg-primary-light text-primary-foreground font-semibold"
          >
            مشاريعنا
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="min-w-[150px] border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
          >
            اكتشف المزيد
          </Button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-4 h-4 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute bottom-1/3 left-10 w-6 h-6 bg-secondary rounded-full animate-float opacity-40" 
           style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-accent rounded-full animate-float opacity-50" 
           style={{ animationDelay: '4s' }} />
    </section>
  );
}