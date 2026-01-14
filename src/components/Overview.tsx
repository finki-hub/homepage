import { Bell, Bot, Globe, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const icons = [Users, Globe, Bot, Bell];

export const Overview = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 section-gradient">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t.overview.title}
        </h2>
        <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-12" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.overview.cards.map((card, index) => {
            const Icon = icons[index];
            if (!Icon) return null;
            return (
              <Card
                className="group glass glass-hover card-glow border-border/50"
                key={card.title}
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
