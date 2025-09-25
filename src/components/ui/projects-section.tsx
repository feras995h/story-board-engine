import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TreePine, MapPin, Calendar, Users } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const projects = [
  {
    id: 1,
    titleAr: "المحيط الأخضر وليبانا شراكة من أجل الغطاء النباتي",
    titleEn: "Green Ocean and Libyana A Partnership for Vegetation Cover",
    descriptionAr: "وبالشراكة الفاعلة مع شركة ليبانا للهاتف المحمول قامت جمعية المحيط الأخضر للحلول البيئية بتنفيذ حملة تشجير تهدف إلى الإسهام في حماية البيئة ودعم الاستدامة البيئية في عدة مناطق، وقد حققت هذه العملية ثمرة تعاون بناء بين الطرفين حيث تم العمل بشكل منظم ومتكامل على تنفيذ أنشطة ميدانية تضمنت غرس عدد كبير من الأشجار في مواقع مختارة بعناية مع مراعاة الجوانب البيئية والتخطيط الحضري للمناطق المستهدفة",
    descriptionEn: "supporting environmental sustainability in several regions. This campaign represents the fruit of constructive cooperation between both parties, where organized and integrated work was carried out to implement field activities that included planting a large number of trees in carefully selected locations, taking into consideration environmental aspects and urban planning for the targeted areas",
    location: "ليبيا",
    locationEn: "Libya",
    status: "مكتمل",
    statusEn: "Completed",
    year: "2024",
    participants: 150,
    treesPlanted: 500
  }
];

export function ProjectsSection() {
  const { language, t } = useLanguage();
  
  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              {t('projects', 'مشاريعنا')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projectsDesc', 'مشاريعنا البيئية التي تهدف إلى بناء مستقبل أخضر مستدام')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id}
              className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-elegant group"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-3 text-primary group-hover:text-primary-light transition-colors">
                      {language === 'ar' ? project.titleAr : project.titleEn}
                    </CardTitle>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="w-3 h-3" />
                        {language === 'ar' ? project.location : project.locationEn}
                      </Badge>
                      <Badge 
                        variant={project.status === 'مكتمل' ? 'default' : 'outline'} 
                        className="gap-1"
                      >
                        <Calendar className="w-3 h-3" />
                        {language === 'ar' ? project.status : project.statusEn}
                      </Badge>
                    </div>
                  </div>
                  <TreePine className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {language === 'ar' ? project.descriptionAr : project.descriptionEn}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{project.year}</div>
                    <div className="text-sm text-muted-foreground">{t('year', 'السنة')}</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-secondary mb-1">{project.participants}</div>
                    <div className="text-sm text-muted-foreground">{t('participants', 'المشاركون')}</div>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-2xl font-bold text-accent mb-1">{project.treesPlanted}</div>
                    <div className="text-sm text-muted-foreground">{t('treesPlanted', 'شجرة مزروعة')}</div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {t('projectDetails', 'تفاصيل المشروع')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}