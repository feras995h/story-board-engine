import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

interface HeaderProps {
  onOpenAdmin?: () => void;
}

export function Header({ onOpenAdmin }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const menuItems = [
    { label: t('home', 'الرئيسية'), href: "#home" },
    { label: t('about', 'من نحن'), href: "#about" },
    { label: t('projects', 'مشاريعنا'), href: "#projects" },
    { label: t('contact', 'تواصل معنا'), href: "#contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h2 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              {t('heroTitle', 'المحيط الأخضر')}
            </h2>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            {onOpenAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenAdmin}
                className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Settings className="w-4 h-4" />
                {t('adminPanel', 'لوحة التحكم')}
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {onOpenAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onOpenAdmin();
                      setIsMenuOpen(false);
                    }}
                    className="justify-start gap-2 text-muted-foreground hover:text-primary px-2"
                  >
                    <Settings className="w-4 h-4" />
                    {t('adminPanel', 'لوحة التحكم')}
                  </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}