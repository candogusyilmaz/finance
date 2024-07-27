import { type MantineColorsTuple, createTheme } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#fff8e1',
  '#ffefcc',
  '#ffdd9b',
  '#ffca64',
  '#ffba38',
  '#ffb01b',
  '#ffab09',
  '#e39500',
  '#ca8500',
  '#af7100'
];

export const MantineTheme = createTheme({
  autoContrast: true,
  defaultRadius: 'sm',
  fontFamily: 'Rubik, sans-serif',
  primaryColor: 'myColor',
  colors: {
    myColor
  }
});
