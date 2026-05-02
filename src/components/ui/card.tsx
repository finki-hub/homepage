import * as React from 'react';

import { cn } from '@/lib/utils';

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly ref?: React.Ref<HTMLDivElement>;
};

const Card = ({ className, ref, ...props }: DivProps) => (
  <div
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className,
    )}
    ref={ref}
    {...props}
  />
);
Card.displayName = 'Card';

const CardHeader = ({ className, ref, ...props }: DivProps) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    ref={ref}
    {...props}
  />
);
CardHeader.displayName = 'CardHeader';

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  readonly ref?: React.Ref<HTMLHeadingElement>;
};

const CardTitle = ({ children, className, ref, ...props }: CardTitleProps) => (
  <h3
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
  </h3>
);
CardTitle.displayName = 'CardTitle';

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  readonly ref?: React.Ref<HTMLParagraphElement>;
};

const CardDescription = ({
  className,
  ref,
  ...props
}: CardDescriptionProps) => (
  <p
    className={cn('text-sm text-muted-foreground', className)}
    ref={ref}
    {...props}
  />
);
CardDescription.displayName = 'CardDescription';

const CardContent = ({ className, ref, ...props }: DivProps) => (
  <div
    className={cn('p-6 pt-0', className)}
    ref={ref}
    {...props}
  />
);
CardContent.displayName = 'CardContent';

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
