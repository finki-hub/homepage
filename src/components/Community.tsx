import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { DISCORD_URL } from '@/lib/constants';

import { DiscordIcon } from './icons/DiscordIcon';

export const Community = () => {
  const { t } = useLanguage();

  return (
    <section
      className="py-24"
      id="community"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.community.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.community.subtitle}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Features Card */}
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <DiscordIcon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">
                {t.community.discordTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {t.community.features.map((feature) => (
                  <li
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                    key={feature}
                  >
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full gap-2"
              >
                <a
                  href={DISCORD_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <DiscordIcon className="w-4 h-4" />
                  {t.community.joinButton}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
