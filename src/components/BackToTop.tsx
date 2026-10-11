import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const scrollToTop = () => {
  window.scrollTo({ behavior: 'auto', top: 0 });
};

export const BackToTop = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      aria-label={t.backToTop}
      className="fixed bottom-6 right-[calc(1.5rem+var(--removed-body-scroll-bar-size,0px))] z-50 rounded-full shadow-lg glow-primary-sm animate-fade-in"
      onClick={scrollToTop}
      size="icon"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};
