import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { badgeVariants } from './badge-variants';

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {};

const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <div
    className={cn(badgeVariants({ variant }), className)}
    {...props}
  />
);

export { Badge };
