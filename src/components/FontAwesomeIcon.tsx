interface FontAwesomeIconProps {
  icon: any;
  class?: string;
}

export function FontAwesomeIcon(props: FontAwesomeIconProps) {
  const { icon } = props;

  // Handle both icon object formats
  const iconData = icon.icon || icon;
  const [width, height, , , pathData] = iconData;
  const path = typeof pathData === 'string' ? pathData : pathData?.[0] || '';

  return (
    <svg
      class={`inline-block ${props.class || ''}`}
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width="1em"
      height="1em"
      style={{ "vertical-align": "-0.125em" }}
    >
      <path
        fill="currentColor"
        d={path}
      />
    </svg>
  );
}
