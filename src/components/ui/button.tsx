import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './button-variants';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    readonly asChild?: boolean;
    readonly ref?: React.Ref<HTMLButtonElement>;
  };

const Button = ({
  asChild = false,
  className,
  ref,
  size,
  variant,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      ref={ref}
      {...props}
    />
  );
};
Button.displayName = 'Button';

export { Button };
