import { useApp } from '../context/AppContext';
import { Show } from 'solid-js';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from './FontAwesomeIcon';

export function FAQ() {
  const { t, isLoaded } = useApp();

  return (
    <section class="py-16 md:py-20 px-4 bg-section-2 transition-colors duration-500">
      <div class="container mx-auto max-w-4xl">
        <Show when={isLoaded()}>
          <div>
            <h2 class="font-bold text-center mb-12 text-finki-blue flex items-center justify-center gap-3">
              {t('FAQ_SECTION.TITLE')}
              <FontAwesomeIcon icon={faCircleQuestion} />
            </h2>

            <div class="space-y-6">
              <details class="card-bg rounded-lg p-6 shadow-md cursor-pointer transition-colors duration-500 group">
                <summary class="text-xl font-semibold text-main focus:outline-none list-none flex justify-between items-center">
                  {t('FAQ_SECTION.Q1_SUMMARY')}
                  <span class="text-finki-blue transition-transform duration-300 group-open:rotate-180">▼</span>
                </summary>
                <p class="mt-4 text-secondary font-poppins">
                  {t('FAQ_SECTION.Q1_ANSWER')}
                </p>
              </details>

              <details class="card-bg rounded-lg p-6 shadow-md cursor-pointer transition-colors duration-500 group">
                <summary class="text-xl font-semibold text-main focus:outline-none list-none flex justify-between items-center">
                  {t('FAQ_SECTION.Q2_SUMMARY')}
                  <span class="text-finki-blue transition-transform duration-300 group-open:rotate-180">▼</span>
                </summary>
                <p class="mt-4 text-secondary font-poppins">
                  {t('FAQ_SECTION.Q2_ANSWER')}
                </p>
              </details>

              <details class="card-bg rounded-lg p-6 shadow-md cursor-pointer transition-colors duration-500 group">
                <summary class="text-xl font-semibold text-main focus:outline-none list-none flex justify-between items-center">
                  {t('FAQ_SECTION.Q3_SUMMARY')}
                  <span class="text-finki-blue transition-transform duration-300 group-open:rotate-180">▼</span>
                </summary>
                <p class="mt-4 text-secondary font-poppins">
                  {t('FAQ_SECTION.Q3_ANSWER')}
                </p>
              </details>
            </div>
          </div>
        </Show>
      </div>
    </section>
  );
}
