import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faBookOpen, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Show } from 'solid-js';

import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from './FontAwesomeIcon';

export const Header = () => {
  const { changeLanguage, getThemeIcon, isLoaded, lang, t, toggleTheme } =
    useApp();

  return (
    <header class="py-24 md:py-32 px-4 text-center relative overflow-hidden bg-section-1 transition-colors duration-500">
      <div class="absolute top-4 right-4 md:top-8 md:right-8 flex space-x-4 z-20">
        <div class="flex space-x-2">
          <button
            class={`font-semibold py-2 px-3 rounded-full shadow-lg cursor-pointer transition-colors duration-300 text-sm md:text-base ${
              lang() === 'mk'
                ? 'bg-finki-blue text-white'
                : 'card-bg text-main hover:bg-finki-blue hover:text-white'
            }`}
            onClick={() => {
              changeLanguage('mk');
            }}
          >
            МК
          </button>

          <button
            class={`font-semibold py-2 px-3 rounded-full shadow-lg cursor-pointer transition-colors duration-300 text-sm md:text-base ${
              lang() === 'en'
                ? 'bg-finki-blue text-white'
                : 'card-bg text-main hover:bg-finki-blue hover:text-white'
            }`}
            onClick={() => {
              changeLanguage('en');
            }}
          >
            EN
          </button>
        </div>

        <button
          class="card-bg text-main font-semibold py-2 px-3 rounded-full shadow-lg transition-colors duration-500 text-sm md:text-base hover:bg-finki-blue hover:text-white"
          id="theme-toggle"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon icon={getThemeIcon() === 'moon' ? faMoon : faSun} />
        </button>
      </div>

      <div class="container mx-auto max-w-7xl relative z-10">
        <Show when={isLoaded()}>
          <div>
            <div class="flex justify-center mb-6">
              <img
                alt="FINKI Hub Logo"
                class="rounded-full w-24 h-24 md:w-32 md:h-32 shadow-xl"
                src="https://avatars.githubusercontent.com/u/207612794?s=200&v=4"
              />
            </div>
            <h1 class="font-extrabold leading-tight mb-4 text-main">
              {t('HEADER.TITLE')}
            </h1>
            <p class="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-secondary font-poppins">
              {t('HEADER.DESCRIPTION')}
            </p>

            <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <a
                class="inline-flex items-center btn-gradient-blue text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                href="https://discord.com/invite/finki-studenti-810997107376914444"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon
                  class="mr-2"
                  icon={faDiscord}
                />
                {t('HEADER.BUTTON_DISCORD')}
              </a>

              <a
                class="inline-flex items-center btn-gradient-blue text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                href="https://snimki.finki-hub.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon
                  class="mr-2"
                  icon={faBookOpen}
                />
                {t('HEADER.BUTTON_GUIDE')}
              </a>
            </div>
          </div>
        </Show>
      </div>
    </header>
  );
};
