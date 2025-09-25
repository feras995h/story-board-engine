import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  t: (key: string, fallback: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  // Navigation
  home: { ar: 'الرئيسية', en: 'Home' },
  about: { ar: 'من نحن', en: 'About Us' },
  projects: { ar: 'مشاريعنا', en: 'Our Projects' },
  contact: { ar: 'تواصل معنا', en: 'Contact Us' },
  adminPanel: { ar: 'لوحة التحكم', en: 'Admin Panel' },
  
  // Hero Section
  heroTitle: { ar: 'جمعية المحيط الأخضر', en: 'Green Ocean Association' },
  heroSubtitle: { ar: 'للحلول البيئية', en: 'for Environmental Solutions' },
  heroDescription: { ar: 'نعمل معاً من أجل بيئة صحية ومستدامة من خلال الحلول المبتكرة والوعي البيئي المجتمعي', en: 'Working together for a healthy and sustainable environment through innovative solutions and community environmental awareness' },
  learnMore: { ar: 'اعرف المزيد', en: 'Learn More' },
  joinUs: { ar: 'انضم إلينا', en: 'Join Us' },
  
  // About Section
  aboutTitle: { ar: 'من نحن', en: 'About Us' },
  aboutDescription: { ar: 'جمعية المحيط الأخضر للحلول البيئية - رائدة في مجال الحلول المستدامة والوعي البيئي', en: 'Green Ocean Association for Environmental Solutions - Leading in sustainable solutions and environmental awareness' },
  
  // About Cards
  environmentalCulture: { ar: 'ثقافتنا البيئية', en: 'Our Environmental Culture' },
  vision: { ar: 'رؤيتنا', en: 'Our Vision' },
  mission: { ar: 'رسالتنا', en: 'Our Mission' },
  desertification: { ar: 'مكافحة التصحر', en: 'Combating Desertification' },
  
  // Projects Section
  projectsDesc: { ar: 'مشاريعنا البيئية التي تهدف إلى بناء مستقبل أخضر مستدام', en: 'Our environmental projects aimed at building a sustainable green future' },
  year: { ar: 'السنة', en: 'Year' },
  participants: { ar: 'المشاركون', en: 'Participants' },
  treesPlanted: { ar: 'شجرة مزروعة', en: 'Trees Planted' },
  projectDetails: { ar: 'تفاصيل المشروع', en: 'Project Details' },
  
  // Contact Section
  contactDesc: { ar: 'نحن هنا للإجابة على استفساراتكم ومساعدتكم في رحلتكم البيئية', en: 'We are here to answer your questions and help you on your environmental journey' },
  sendMessage: { ar: 'أرسل رسالة', en: 'Send Message' },
  name: { ar: 'الاسم', en: 'Name' },
  email: { ar: 'البريد الإلكتروني', en: 'Email' },
  subject: { ar: 'الموضوع', en: 'Subject' },
  message: { ar: 'الرسالة', en: 'Message' },
  namePlaceholder: { ar: 'اسمك الكامل', en: 'Your full name' },
  emailPlaceholder: { ar: 'your.email@example.com', en: 'your.email@example.com' },
  subjectPlaceholder: { ar: 'موضوع رسالتك', en: 'Subject of your message' },
  messagePlaceholder: { ar: 'اكتب رسالتك هنا...', en: 'Write your message here...' },
  contactInfo: { ar: 'معلومات التواصل', en: 'Contact Information' },
  followUs: { ar: 'تابعنا', en: 'Follow Us' },
  workingHours: { ar: 'ساعات العمل', en: 'Working Hours' },
  sunday: { ar: 'الأحد', en: 'Sunday' },
  thursday: { ar: 'الخميس', en: 'Thursday' },
  friday: { ar: 'الجمعة', en: 'Friday' },
  saturday: { ar: 'السبت', en: 'Saturday' },
  closed: { ar: 'مغلق', en: 'Closed' },
  messageSent: { ar: 'تم إرسال الرسالة', en: 'Message Sent' },
  messageResponse: { ar: 'سنتواصل معك قريباً', en: 'We will contact you soon' },
  
  // Language
  language: { ar: 'اللغة', en: 'Language' },
  arabic: { ar: 'العربية', en: 'Arabic' },
  english: { ar: 'الإنجليزية', en: 'English' }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'ar' | 'en' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const handleSetLanguage = (lang: 'ar' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string, fallback: string) => {
    const translation = translations[key as keyof typeof translations];
    if (translation) {
      return translation[language];
    }
    return fallback;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}