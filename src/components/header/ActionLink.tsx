import type { ReactNode } from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';

type ActionLinkProps = {
  readonly className?: string;
  readonly href: string;
  readonly icon: ReactNode;
  readonly label: ReactNode;
  readonly size?: ButtonProps['size'];
  readonly variant?: ButtonProps['variant'];
};

export const ActionLink = ({
  className,
  href,
  icon,
  label,
  size = 'sm',
  variant = 'outline',
}: ActionLinkProps) => (
  <Button
    asChild
    className={className}
    size={size}
    variant={variant}
  >
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {icon}
      {label}
    </a>
  </Button>
);
