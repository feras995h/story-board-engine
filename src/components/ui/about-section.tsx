import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Target, MessageSquare, TreePine } from "lucide-react";

const sections = [
  {
    icon: TreePine,
    title: "ثقافتنا البيئية",
    content: "نؤمن بأن البيئة ليست مجرد محيط نعيش فيه، بل هي مسؤولية مشتركة من جميعنا. من خلال الممارسة اليومية، يتوسع الوعي ويترسخ قناعة راسخة بأن التغيير يبدأ من ثقافتنا البيئية."
  },
  {
    icon: Target,
    title: "رؤيتنا",
    content: "بيئة صحية ومستدامة يقودها وعي مجتمعي ومسؤول."
  },
  {
    icon: MessageSquare,
    title: "رسالتنا",
    content: "تعزيز الحلول البيئية المبتكرة ونشر الوعي البيئي من خلال مشاريع تعليمية مستدامة وتبني أنماط مشاركة مجتمعية وتشجيعها ميدانياً."
  },
  {
    icon: Leaf,
    title: "مكافحة التصحر",
    content: "يعد التصحر من أخطر التحديات البيئية التي تواجه العالم اليوم، خاصة في المناطق الجافة. لقدرة الأرض على الإنتاج تتناقص تدريجياً بسبب الأنشطة البشرية."
  }
];

export function AboutSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              من نحن
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            جمعية المحيط الأخضر للحلول البيئية - رائدة في مجال الحلول المستدامة والوعي البيئي
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <section.icon className="w-6 h-6" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}