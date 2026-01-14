import { Heart } from 'lucide-react';

import { useLanguage } from '@/hooks/useLanguage';
import { DISCORD_URL, GITHUB_URL } from '@/lib/constants';

import { DiscordIcon } from './icons/DiscordIcon';
import { GithubIcon } from './icons/GithubIcon';

export const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { href: '#projects', label: t.nav.projects },
    { href: '#community', label: t.nav.community },
    { href: '#contribute', label: t.nav.contribute },
  ];

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a
              className="flex items-center gap-2"
              href="#"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground text-sm">
                FH
              </div>
              <span className="font-semibold text-lg">{t.brand}</span>
            </a>
            <p className="text-xs text-muted-foreground">
              {t.footer.copyright}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-2">
            <a
              aria-label="GitHub"
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              aria-label="Discord"
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              href={DISCORD_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <DiscordIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Made with love */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            {t.footer.madeWith.split('❤️')[0]?.trim() ?? ''}
            <Heart className="w-3 h-3 text-destructive fill-current inline" />
            {t.footer.madeWith.split('❤️')[1]?.trim() ?? ''}
          </p>
        </div>
      </div>
    </footer>
  );
};
