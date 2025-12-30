import { useApp } from '../context/AppContext';
import { Show } from 'solid-js';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from './FontAwesomeIcon';

export function Github() {
  const { t, isLoaded } = useApp();

  return (
    <section class="py-16 md:py-20 px-4 bg-section-1 transition-colors duration-500">
      <div class="container mx-auto max-w-7xl text-center">
        <Show when={isLoaded()}>
          <div>
            <h2 class="font-bold mb-8 text-finki-blue">
              {t('GITHUB_SECTION.TITLE')}
            </h2>

            <p class="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 font-poppins">
              {t('GITHUB_SECTION.DESCRIPTION')}
            </p>

            <a
              href="https://github.com/finki-hub"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center btn-gradient-blue text-white font-semibold py-4 px-12 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faGithub} class="mr-2" />
              {t('GITHUB_SECTION.BUTTON_TEXT')}
            </a>
          </div>
        </Show>
      </div>
    </section>
  );
}
