import type { Language } from '@/lib/i18n';

import { cn } from '@/lib/utils';

type LanguageToggleProps = {
  readonly language: Language;
  readonly mobile?: boolean;
  readonly setLanguage: (language: Language) => void;
};

const languages: Language[] = ['mk', 'en'];

export const LanguageToggle = ({
  language,
  mobile = false,
  setLanguage,
}: LanguageToggleProps) => (
  <div
    className={cn(
      'flex items-center',
      mobile
        ? 'gap-2 pt-4 border-t border-border'
        : 'gap-1 px-2 py-1 rounded-lg bg-secondary/50',
    )}
  >
    {languages.map((option) => (
      <button
        className={cn(
          'rounded font-medium transition-all',
          mobile ? 'px-3 py-1.5 text-sm' : 'px-2 py-1 text-xs',
          language === option
            ? 'bg-primary text-primary-foreground'
            : mobile
              ? 'bg-secondary text-muted-foreground'
              : 'text-muted-foreground hover:text-foreground',
        )}
        key={option}
        onClick={() => {
          setLanguage(option);
        }}
        type="button"
      >
        {option.toUpperCase()}
      </button>
    ))}
  </div>
);
