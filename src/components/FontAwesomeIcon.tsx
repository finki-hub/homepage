import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type FontAwesomeIconProps = {
  class?: string;
  icon: IconDefinition;
};

export const FontAwesomeIcon = (props: FontAwesomeIconProps) => (
  <svg
    aria-hidden="true"
    class={`inline-block ${props.class ?? ''}`}
    height="1em"
    role="img"
    style={{ 'vertical-align': '-0.125em' }}
    viewBox={`0 0 ${props.icon.icon[0]} ${props.icon.icon[1]}`}
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={
        typeof props.icon.icon[4] === 'string'
          ? props.icon.icon[4]
          : (props.icon.icon[4][0] ?? '')
      }
      fill="currentColor"
    />
  </svg>
);
