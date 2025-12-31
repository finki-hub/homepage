import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Show } from 'solid-js';

import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from './FontAwesomeIcon';

export const Github = () => {
  const { isLoaded, t } = useApp();

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
              class="inline-flex items-center btn-gradient-blue text-white font-semibold py-4 px-12 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
              href="https://github.com/finki-hub"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon
                class="mr-2"
                icon={faGithub}
              />
              {t('GITHUB_SECTION.BUTTON_TEXT')}
            </a>
          </div>
        </Show>
      </div>
    </section>
  );
};
