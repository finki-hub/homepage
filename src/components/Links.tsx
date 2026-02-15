import { Calendar, FileText, Video } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const linkIcons = [Video, FileText, Calendar];

export const Links = () => {
  const { t } = useLanguage();

  return (
    <section
      className="py-24"
      id="links"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.links.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.links.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.links.items.map((link, index) => {
            const Icon = linkIcons[index];
            if (!Icon) return null;
            return (
              <a
                href={link.url}
                key={link.name}
                rel="noopener noreferrer"
                target={link.url.startsWith('#') ? undefined : '_blank'}
              >
                <Card className="group glass glass-hover card-glow border-border/50 flex flex-col cursor-pointer transition-transform hover:scale-[1.02] h-full">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {link.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {link.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm text-primary group-hover:underline">
                      Посети ја →
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
