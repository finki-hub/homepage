import {
  BookOpen,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Video,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

const platformIcons = [BookOpen, GraduationCap, Video, Sparkles];

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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-6xl mx-auto">
          {t.platforms.items.map((platform, index) => {
            const Icon = platformIcons[index];
            const isLearnify = platform.url.includes('learnify.mk');
            if (!Icon) return null;
            return (
              <Card
                className={cn(
                  'group glass glass-hover card-glow border-border/50 flex flex-col',
                  isLearnify &&
                    'card-glow-learnify overflow-hidden border-[hsl(28_70%_72%/0.4)] shadow-[0_20px_40px_-34px_hsl(28_88%_52%/0.35)] dark:border-[hsl(28_40%_40%/0.45)] dark:shadow-[0_20px_40px_-34px_hsl(28_88%_52%/0.22)]',
                )}
                key={platform.name}
              >
                {isLearnify ? (
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-[hsl(32_92%_58%)] to-transparent opacity-90 dark:via-[hsl(35_95%_68%)]" />
                ) : null}
                <CardHeader className="pb-4">
                  <div className="flex items-start mb-3">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors',
                        isLearnify &&
                          'bg-[linear-gradient(135deg,hsl(30_100%_96%),hsl(45_100%_97%))] group-hover:bg-[linear-gradient(135deg,hsl(30_100%_94%),hsl(45_100%_95%))] dark:bg-[linear-gradient(135deg,hsl(28_46%_20%),hsl(34_32%_24%))] dark:group-hover:bg-[linear-gradient(135deg,hsl(28_46%_24%),hsl(34_32%_28%))]',
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-6 h-6 text-primary',
                          isLearnify &&
                            'text-[hsl(28_88%_52%)] dark:text-[hsl(35_95%_68%)]',
                        )}
                      />
                    </div>
                  </div>
                  <CardTitle
                    className={cn(
                      'text-primary',
                      isLearnify &&
                        'text-[hsl(28_88%_46%)] dark:text-[hsl(35_95%_72%)]',
                    )}
                  >
                    {platform.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end pt-0">
                  <Button
                    asChild
                    className={cn(
                      'w-full gap-2',
                      isLearnify &&
                        'border-[hsl(28_70%_72%/0.7)] bg-[hsl(30_100%_97%/0.86)] text-[hsl(28_88%_42%)] hover:bg-[hsl(30_100%_94%/0.96)] dark:border-[hsl(28_40%_40%/0.7)] dark:bg-[hsl(28_30%_20%/0.7)] dark:text-[hsl(35_95%_72%)] dark:hover:bg-[hsl(28_30%_24%/0.9)]',
                    )}
                    size="sm"
                    variant={isLearnify ? 'outline' : 'default'}
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
