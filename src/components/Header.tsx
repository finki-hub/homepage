import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { DISCORD_URL, GITHUB_URL } from '@/lib/constants';

import { ActionLink } from './header/ActionLink';
import { LanguageToggle } from './header/LanguageToggle';
import { LearnifyButton } from './header/LearnifyButton';
import { ThemeToggleButton } from './header/ThemeToggleButton';
import { DiscordIcon } from './icons/DiscordIcon';
import { GithubIcon } from './icons/GithubIcon';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
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
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          <LearnifyButton />
          <ActionLink
            className="gap-2"
            href={GITHUB_URL}
            icon={<GithubIcon className="w-4 h-4" />}
            label={<span className="hidden xl:inline">GitHub</span>}
          />
          <LanguageToggle
            language={language}
            setLanguage={setLanguage}
          />
          <ThemeToggleButton
            isDarkTheme={isDarkTheme}
            themeLabel={themeLabel}
            toggleLabel={t.theme.toggle}
            toggleTheme={toggleTheme}
          />
          <ActionLink
            className="gap-2"
            href={DISCORD_URL}
            icon={<DiscordIcon className="w-4 h-4" />}
            label={<span className="hidden xl:inline">{t.discord}</span>}
            variant="default"
          />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LearnifyButton pill />

          {/* Mobile menu button */}
          <button
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
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
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen ? (
        <div className="lg:hidden glass border-t border-border mt-3">
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
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
              <ActionLink
                className="flex-1 gap-2"
                href={DISCORD_URL}
                icon={<DiscordIcon className="w-4 h-4" />}
                label={t.discord}
                variant="default"
              />
              <LearnifyButton />
              <ActionLink
                className="flex-1 gap-2"
                href={GITHUB_URL}
                icon={<GithubIcon className="w-4 h-4" />}
                label="GitHub"
              />
            </div>
            <LanguageToggle
              language={language}
              mobile
              setLanguage={setLanguage}
            />
            <ThemeToggleButton
              isDarkTheme={isDarkTheme}
              mobile
              themeLabel={themeLabel}
              toggleLabel={t.theme.toggle}
              toggleTheme={toggleTheme}
            />
          </nav>
        </div>
      ) : null}
    </header>
  );
};
