import { Check, LoaderCircle, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

import { useDiscordCommunity } from '../hooks/useDiscordCommunity';
import { DiscordIcon } from './icons/DiscordIcon';

export const Community = () => {
  const { t } = useLanguage();
  const {
    extraMembersCount,
    hasError,
    inviteUrl,
    isLoading,
    onlineCount,
    totalMembersCount,
    visibleMembers,
  } = useDiscordCommunity();

  return (
    <section
      className="py-24 section-gradient"
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

        <div className="max-w-5xl mx-auto">
          <Card className="glass relative overflow-hidden border-border/50">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--glow-primary)/0.18),transparent_32%),linear-gradient(135deg,hsl(var(--background)/0.96),hsl(var(--card)/0.92))]" />
            <div className="pointer-events-none absolute -right-16 top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <CardContent className="relative p-0">
              <div className="border-b border-border/50 px-6 py-8 md:px-8 md:py-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl space-y-5">
                    <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      <DiscordIcon className="h-4 w-4" />
                      {t.community.discordTitle}
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        {t.community.subtitle}
                      </h3>
                      <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                        {t.community.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
                    <div className="inline-flex items-center gap-3 rounded-2xl border border-border/50 bg-background/45 px-4 py-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Users className="h-4 w-4" />
                      </span>

                      <div>
                        <div className="text-2xl font-semibold leading-none text-foreground">
                          {isLoading
                            ? '--'
                            : (totalMembersCount?.toLocaleString() ?? '--')}
                        </div>
                        <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                          {t.community.totalMembersLabel}
                        </div>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full gap-2 sm:w-auto lg:w-full"
                    >
                      <a
                        href={inviteUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <DiscordIcon className="h-4 w-4" />
                        {t.community.joinButton}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 px-6 py-6 md:grid-cols-2 md:px-8">
                {t.community.features.map((feature) => (
                  <div
                    className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/35 px-4 py-4"
                    key={feature}
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/50 bg-background/45 px-6 py-5 md:px-8">
                {isLoading ? (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
                    {t.community.widgetLoading}
                  </div>
                ) : null}

                {!isLoading && (hasError || onlineCount === null) ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t.community.widgetError}
                  </p>
                ) : null}

                {!isLoading &&
                !hasError &&
                onlineCount !== null &&
                visibleMembers.length > 0 ? (
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        {t.community.activeMembers}
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-foreground">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--glow-primary)/0.6)]" />
                        <span className="truncate">
                          <span className="font-semibold text-foreground">
                            {onlineCount.toLocaleString()}
                          </span>{' '}
                          {t.community.onlineLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex flex-nowrap -space-x-2 overflow-hidden pr-1">
                        {visibleMembers.map((member) => (
                          <img
                            alt={member.username}
                            className="h-9 w-9 rounded-full border-2 border-background object-cover"
                            key={member.id}
                            loading="lazy"
                            src={member.avatar_url}
                            title={member.username}
                          />
                        ))}

                        {extraMembersCount > 0 ? (
                          <div className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary px-2 text-xs font-semibold text-primary-foreground">
                            +{extraMembersCount}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null}

                {!isLoading &&
                !hasError &&
                onlineCount !== null &&
                visibleMembers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t.community.noMembers}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
