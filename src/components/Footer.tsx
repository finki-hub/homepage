import { useApp } from '../context/AppContext';
import { Show } from 'solid-js';

export function Footer() {
  const { t, isLoaded } = useApp();

  return (
    <footer class="py-8 text-center text-secondary bg-section-1 transition-colors duration-500 border-t border-footer">
      <div class="container mx-auto max-w-4xl text-center">
        <Show when={isLoaded()}>
          <p class="mb-2 font-poppins">
            {t('FOOTER')}
          </p>
        </Show>
      </div>
    </footer>
  );
}
