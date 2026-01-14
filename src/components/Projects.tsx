import { Brain, Database, MessageCircle } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { GITHUB_URL } from '@/lib/constants';

import { GithubIcon } from './icons/GithubIcon';

const projectIcons = [Database, MessageCircle, Brain];

export const Projects = () => {
  const { t } = useLanguage();

  return (
    <section
      className="py-24"
      id="projects"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.projects.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {t.projects.items.map((project, index) => {
            const Icon = projectIcons[index];
            if (!Icon) return null;
            return (
              <Card
                className="group glass glass-hover card-glow border-border/50 flex flex-col"
                key={project.name}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Button
                      asChild
                      className="gap-1.5 text-muted-foreground hover:text-foreground"
                      size="sm"
                      variant="ghost"
                    >
                      <a
                        href={`${GITHUB_URL}/${project.name}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <GithubIcon className="w-4 h-4" />
                        {t.projects.repoButton}
                      </a>
                    </Button>
                  </div>
                  <CardTitle className="font-mono text-primary">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between pt-0">
                  <Accordion
                    className="mb-4"
                    collapsible
                    defaultValue={`details-${project.name}`}
                    type="single"
                  >
                    <AccordionItem
                      className="border-border/50"
                      value={`details-${project.name}`}
                    >
                      <AccordionTrigger className="text-sm py-2 hover:no-underline text-muted-foreground hover:text-foreground">
                        {t.projects.detailsButton}
                      </AccordionTrigger>
                      <AccordionContent className="!pt-2">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge
                              className="text-xs bg-secondary/50 border-border/50"
                              key={tag}
                              variant="outline"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* More projects link */}
        <div className="text-center">
          <Button
            asChild
            className="gap-2"
            size="lg"
            variant="outline"
          >
            <a
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="w-4 h-4" />
              {t.projects.moreProjects}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
