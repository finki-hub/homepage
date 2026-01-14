import { ArrowDown, Scale, Shield, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { DISCORD_URL } from '@/lib/constants';

import { DiscordIcon } from './icons/DiscordIcon';

export const Hero = () => {
  const { t } = useLanguage();

  const badges = [
    { icon: Sparkles, label: t.hero.badge1 },
    { icon: Scale, label: t.hero.badge2 },
    { icon: Shield, label: t.hero.badge3 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 hero-gradient overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in">
            {badges.map((badge) => (
              <Badge
                className="px-3 py-1.5 gap-1.5 bg-secondary/80 border border-border/50 backdrop-blur-sm"
                key={badge.label}
                variant="secondary"
              >
                <badge.icon className="w-3.5 h-3.5 text-primary" />
                {badge.label}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="text-gradient">{t.hero.title}</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground mt-3">
              {t.hero.titleAccent}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Button
              asChild
              className="glow-primary-sm px-8"
              size="lg"
            >
              <a href="#projects">
                {t.hero.cta}
                <ArrowDown className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              className="px-8 gap-2"
              size="lg"
              variant="outline"
            >
              <a
                href={DISCORD_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <DiscordIcon className="w-5 h-5" />
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce opacity-50">
            <ArrowDown className="w-6 h-6 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};
