import {
  faBoxOpen,
  faChalkboardUser,
  faGraduationCap,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Show } from 'solid-js';

import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from './FontAwesomeIcon';

export const About = () => {
  const { isLoaded, t } = useApp();

  return (
    <section class="py-16 md:py-20 px-4 bg-section-2 transition-colors duration-500">
      <div class="container mx-auto max-w-7xl">
        <Show when={isLoaded()}>
          <div>
            <h2 class="font-bold text-center mb-12 text-finki-blue flex items-center justify-center gap-3">
              {t('OFFER_SECTION.TITLE')}
              <FontAwesomeIcon icon={faBoxOpen} />
            </h2>

            <div class="grid md:grid-cols-3 gap-8">
              <div class="card-bg rounded-xl p-6 md:p-8 shadow-xl text-center border-t-4 border-finki-blue transform transition-transform duration-300 hover:scale-105">
                <div class="text-4xl md:text-5xl text-finki-blue mb-4">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>

                <h3 class="text-xl font-semibold mb-2 text-main font-poppins">
                  {t('OFFER_SECTION.FEATURE_1_TITLE')}
                </h3>
                <p class="text-secondary font-poppins text-sm md:text-base">
                  {t('OFFER_SECTION.FEATURE_1_DESCRIPTION')}
                </p>
              </div>

              <div class="card-bg rounded-xl p-6 md:p-8 shadow-xl text-center border-t-4 border-finki-blue transform transition-transform duration-300 hover:scale-105">
                <div class="text-4xl md:text-5xl text-finki-blue mb-4">
                  <FontAwesomeIcon icon={faChalkboardUser} />
                </div>

                <h3 class="text-xl font-semibold mb-2 text-main font-poppins">
                  {t('OFFER_SECTION.FEATURE_2_TITLE')}
                </h3>
                <p class="text-secondary font-poppins text-sm md:text-base">
                  {t('OFFER_SECTION.FEATURE_2_DESCRIPTION')}
                </p>
              </div>

              <div class="card-bg rounded-xl p-6 md:p-8 shadow-xl text-center border-t-4 border-finki-blue transform transition-transform duration-300 hover:scale-105">
                <div class="text-4xl md:text-5xl text-finki-blue mb-4">
                  <FontAwesomeIcon icon={faUsers} />
                </div>

                <h3 class="text-xl font-semibold mb-2 text-main font-poppins">
                  {t('OFFER_SECTION.FEATURE_3_TITLE')}
                </h3>
                <p class="text-secondary font-poppins text-sm md:text-base">
                  {t('OFFER_SECTION.FEATURE_3_DESCRIPTION')}
                </p>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </section>
  );
};
