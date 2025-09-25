import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import heroBackground from "@/assets/hero-background.jpg";

export function HeroSection() {
  const { t } = useLanguage();
  
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
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-hero bg-clip-text text-transparent">
            {t('heroTitle', 'جمعية المحيط الأخضر')}
          </span>
          <br />
          <span className="text-3xl md:text-4xl text-foreground/90">
            {t('heroSubtitle', 'للحلول البيئية')}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
          {t('heroDescription', 'نعمل معaً من أجل بيئة صحية ومستدامة من خلال الحلول المبتكرة والوعي البيئي المجتمعي')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="bg-gradient-hero hover:opacity-90 transition-all duration-300 shadow-glow hover:shadow-xl group"
          >
            <Leaf className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            {t('learnMore', 'اعرف المزيد')}
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/30 text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            {t('joinUs', 'انضم إلينا')}
            <ArrowLeft className="w-5 h-5 ml-2" />
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