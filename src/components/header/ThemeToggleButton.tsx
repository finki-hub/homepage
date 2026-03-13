import { Moon, Sun } from 'lucide-react';

type ThemeToggleButtonProps = {
  readonly isDarkTheme: boolean;
  readonly mobile?: boolean;
  readonly themeLabel: string;
  readonly toggleLabel: string;
  readonly toggleTheme: () => void;
};

export const ThemeToggleButton = ({
  isDarkTheme,
  mobile = false,
  themeLabel,
  toggleLabel,
  toggleTheme,
}: ThemeToggleButtonProps) => {
  const Icon = isDarkTheme ? Sun : Moon;

  if (mobile) {
    return (
      <button
        aria-label={toggleLabel}
        className="flex items-center justify-between rounded-xl border border-border bg-background/70 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/60"
        onClick={toggleTheme}
        type="button"
      >
        <span>{toggleLabel}</span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
          {themeLabel}
        </span>
      </button>
    );
  }

  return (
    <button
      aria-label={toggleLabel}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-accent/70"
      onClick={toggleTheme}
      title={`${toggleLabel}: ${themeLabel}`}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
};
