import { useMantineColorScheme } from '@mantine/core';

const Brand = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="Layer_1"
      x={0}
      y={0}
      viewBox="0 0 276.284 315"
      aria-labelledby={'canverse'}
      stroke={colorScheme === 'light' ? 'black' : '#1fc9ff'}
      strokeWidth={2}
      width={28}
      height={28}
    >
      <g id="color_index_0" fill={colorScheme === 'light' ? 'black' : '#1fc9ff'}>
        <path d="M276.284 217.188H0L138.142 0l138.142 217.188zM13.658 209.69h248.968L138.142 13.973 13.658 209.689z" />
        <path d="M184.165 172.683H92.119l46.023-72.357 46.023 72.357zm-78.389-7.5h64.731L138.142 114.3l-32.366 50.885zM35.521 252.074h205.242v7.499H35.521zM94.534 279.788h87.216v7.499H94.534zM120.943 307.501h34.397V315h-34.397z" />
      </g>
    </svg>
  );
};

export default Brand;
