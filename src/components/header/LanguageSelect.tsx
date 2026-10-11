import { ChevronDown } from 'lucide-react';
import { useId } from 'react';

import { isLanguage, type Language, languageNames } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type LanguageSelectProps = {
  readonly label: string;
  readonly language: Language;
  readonly mobile?: boolean;
  readonly setLanguage: (language: Language) => void;
};

export const LanguageSelect = ({
  label,
  language,
  mobile = false,
  setLanguage,
}: LanguageSelectProps) => {
  const id = useId();
  const options = Object.entries(languageNames);

  return (
    <div
      className={cn(
        mobile &&
          'flex items-center justify-between gap-3 pt-4 border-t border-border',
      )}
    >
      <label
        className={mobile ? 'text-sm font-medium' : 'sr-only'}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative min-w-0">
        <select
          className={cn(
            'w-full appearance-none rounded-xl border border-input bg-background py-2 ps-3 pe-9 text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            mobile ? 'min-h-11 text-base' : 'h-10 text-sm',
          )}
          id={id}
          onChange={(event) => {
            const { value } = event.currentTarget;
            if (isLanguage(value)) setLanguage(value);
          }}
          value={language}
        >
          {options.map(([code, name]) => (
            <option
              className="bg-background text-foreground"
              key={code}
              lang={code}
              value={code}
            >
              {name}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
};
