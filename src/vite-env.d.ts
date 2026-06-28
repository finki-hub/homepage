import 'vite/client';

declare global {
  /* eslint-disable @typescript-eslint/consistent-type-definitions -- module augmentation requires interface declaration merging */
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly VITE_POSTHOG_HOST?: string;
    readonly VITE_POSTHOG_KEY?: string;
  }
  /* eslint-enable @typescript-eslint/consistent-type-definitions -- restore for the rest of the file */
}
