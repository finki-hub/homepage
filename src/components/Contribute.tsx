import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { GITHUB_URL } from '@/lib/constants';

import { GithubIcon } from './icons/GithubIcon';

export const Contribute = () => {
  const { t } = useLanguage();

  return (
    <section
      className="py-24"
      id="contribute"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-2xl p-8 md:p-12 border border-primary/20 glow-primary relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t.contribute.title}
              </h2>
              <p className="text-muted-foreground mb-2">
                {t.contribute.subtitle}
              </p>
              <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                {t.contribute.description}
              </p>

              <Button
                asChild
                className="gap-2"
                size="lg"
              >
                <a
                  href={GITHUB_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GithubIcon className="w-4 h-4" />
                  {t.contribute.githubButton}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
