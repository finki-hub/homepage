import { BookOpen, ExternalLink, GraduationCap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const platformIcons = [BookOpen, GraduationCap];

export const Platforms = () => {
  const { t } = useLanguage();

  return (
    <section
      className="py-24"
      id="platforms"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.platforms.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.platforms.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {t.platforms.items.map((platform, index) => {
            const Icon = platformIcons[index];
            if (!Icon) return null;
            return (
              <Card
                className="group glass glass-hover card-glow border-border/50 flex flex-col"
                key={platform.name}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-mono text-primary">
                    {platform.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end pt-0">
                  <Button
                    asChild
                    className="w-full gap-2"
                    size="sm"
                  >
                    <a
                      href={platform.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.platforms.visitButton}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
