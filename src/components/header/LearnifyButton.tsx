import { Sparkles } from 'lucide-react';

import { LEARNIFY_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { ActionLink } from './ActionLink';

type LearnifyButtonProps = {
  readonly className?: string;
  readonly pill?: boolean;
};

const learnifyButtonClassName =
  'gap-2 border-[hsl(28_70%_72%/0.7)] bg-[hsl(30_100%_97%/0.88)] text-[hsl(28_88%_42%)] shadow-sm hover:bg-[hsl(30_100%_94%/0.98)] dark:border-[hsl(28_40%_40%/0.7)] dark:bg-[hsl(28_30%_20%/0.7)] dark:text-[hsl(35_95%_72%)] dark:hover:bg-[hsl(28_30%_24%/0.9)]';

export const LearnifyButton = ({
  className,
  pill = false,
}: LearnifyButtonProps) => (
  <ActionLink
    className={cn(
      learnifyButtonClassName,
      pill && 'h-9 gap-1.5 rounded-full px-3',
      className,
    )}
    href={LEARNIFY_URL}
    icon={<Sparkles className="w-4 h-4" />}
    label="Learnify"
  />
);
