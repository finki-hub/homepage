import { BookOpen, Check } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/hooks/useLanguage';
import { DISCORD_URL } from '@/lib/constants';

import { DiscordIcon } from './icons/DiscordIcon';

export const Community = () => {
  const { t } = useLanguage();
  const [isRulesOpen, setIsRulesOpen] = useState(false);

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

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Features Card */}
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <DiscordIcon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Discord</CardTitle>
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

          {/* Rules Card */}
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">
                {t.community.rulesTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {t.community.rulesItems.map((rule, index) => (
                  <li
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                    key={`community-rule-${rule}`}
                  >
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    {rule}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                onClick={() => {
                  setIsRulesOpen(true);
                }}
                variant="outline"
              >
                {t.community.rulesButton}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Rules Modal */}
        <Dialog
          onOpenChange={setIsRulesOpen}
          open={isRulesOpen}
        >
          <DialogContent className="max-w-lg glass">
            <DialogHeader>
              <DialogTitle className="text-xl">{t.rules.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {t.rules.items.map((rule, index) => (
                <div
                  className="flex gap-3"
                  key={`rules-item-${rule}`}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
            <DialogClose asChild>
              <Button
                className="w-full"
                variant="outline"
              >
                {t.rules.close}
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
