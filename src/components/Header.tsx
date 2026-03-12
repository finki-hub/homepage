import { Menu, Moon, Sparkles, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { DISCORD_URL, GITHUB_URL } from '@/lib/constants';

import { DiscordIcon } from './icons/DiscordIcon';
import { GithubIcon } from './icons/GithubIcon';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const learnifyUrl = 'https://learnify.mk';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '#platforms', label: t.nav.platforms },
    { href: '#projects', label: t.nav.projects },
    { href: '#community', label: t.nav.community },
    { href: '#contribute', label: t.nav.contribute },
  ];

  const isDarkTheme = theme === 'dark';
  const themeLabel = isDarkTheme ? t.theme.dark : t.theme.light;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          className="flex items-center gap-2 group"
          href="#"
        >
          <img
            alt="FINKI Hub Logo"
            className="w-12 h-12 object-contain"
            src="/logo.png"
          />
          <span className="font-semibold text-lg group-hover:text-primary transition-colors">
            {t.brand}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            aria-label={t.theme.toggle}
            className="rounded-xl border-border/60 bg-background/80 text-foreground shadow-sm backdrop-blur-sm hover:bg-accent/70"
            onClick={toggleTheme}
            size="icon"
            title={`${t.theme.toggle}: ${themeLabel}`}
            type="button"
            variant="outline"
          >
            {isDarkTheme ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/50">
            <button
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                language === 'mk'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => {
                setLanguage('mk');
              }}
              type="button"
            >
              MK
            </button>
            <button
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                language === 'en'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => {
                setLanguage('en');
              }}
              type="button"
            >
              EN
            </button>
          </div>

          <Button
            asChild
            className="gap-2 border-[hsl(28_70%_72%/0.7)] bg-[hsl(30_100%_97%/0.88)] text-[hsl(28_88%_42%)] shadow-sm hover:bg-[hsl(30_100%_94%/0.98)] dark:border-[hsl(28_40%_40%/0.7)] dark:bg-[hsl(28_30%_20%/0.7)] dark:text-[hsl(35_95%_72%)] dark:hover:bg-[hsl(28_30%_24%/0.9)]"
            size="sm"
            variant="outline"
          >
            <a
              href={learnifyUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Sparkles className="w-4 h-4" />
              Learnify
            </a>
          </Button>

          <Button
            asChild
            className="gap-2"
            size="sm"
            variant="outline"
          >
            <a
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          </Button>

          <Button
            asChild
            className="gap-2"
            size="sm"
          >
            <a
              href={DISCORD_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <DiscordIcon className="w-4 h-4" />
              {t.discord}
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          type="button"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen ? (
        <div className="md:hidden glass border-t border-border mt-3">
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                href={link.href}
                key={link.href}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              aria-label={t.theme.toggle}
              className="flex items-center justify-between rounded-xl border border-border bg-background/70 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/60"
              onClick={toggleTheme}
              type="button"
            >
              <span>{t.theme.toggle}</span>
              <span className="flex items-center gap-2 text-muted-foreground">
                {isDarkTheme ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {themeLabel}
              </span>
            </button>
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <button
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  language === 'mk'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
                onClick={() => {
                  setLanguage('mk');
                }}
                type="button"
              >
                MK
              </button>
              <button
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
                onClick={() => {
                  setLanguage('en');
                }}
                type="button"
              >
                EN
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                asChild
                className="gap-2 border-[hsl(28_70%_72%/0.7)] bg-[hsl(30_100%_97%/0.88)] text-[hsl(28_88%_42%)] shadow-sm hover:bg-[hsl(30_100%_94%/0.98)] dark:border-[hsl(28_40%_40%/0.7)] dark:bg-[hsl(28_30%_20%/0.7)] dark:text-[hsl(35_95%_72%)] dark:hover:bg-[hsl(28_30%_24%/0.9)]"
                size="sm"
                variant="outline"
              >
                <a
                  href={learnifyUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Sparkles className="w-4 h-4" />
                  Learnify
                </a>
              </Button>
              <Button
                asChild
                className="flex-1 gap-2"
                size="sm"
                variant="outline"
              >
                <a
                  href={GITHUB_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
              <Button
                asChild
                className="flex-1 gap-2"
                size="sm"
              >
                <a
                  href={DISCORD_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <DiscordIcon className="w-4 h-4" />
                  {t.discord}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
