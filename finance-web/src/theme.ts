import { DEFAULT_THEME, ModalContent, Notification, createTheme } from '@mantine/core';
export const MantineTheme = createTheme({
  autoContrast: true,
  defaultRadius: 'xs',
  fontFamily: 'Public Sans, sans-serif',
  headings: {
    fontFamily: 'Public Sans, sans-serif',
    fontWeight: '600'
  },
  primaryColor: 'blue',
  primaryShade: 6,
  colors: {
    dark: [
      DEFAULT_THEME.colors.dark[0],
      DEFAULT_THEME.colors.dark[1],
      DEFAULT_THEME.colors.dark[2],
      DEFAULT_THEME.colors.dark[3],
      'rgba(255, 255, 255, 0.07)', // mainly used for border colors
      'rgb(42, 42, 42)',
      'rgb(35, 35, 35)',
      'rgb(30, 30, 30)',
      'rgb(18, 18, 18)',
      'rgb(10, 10, 10)'
    ],
    gray: [
      DEFAULT_THEME.colors.gray[0],
      DEFAULT_THEME.colors.gray[1],
      DEFAULT_THEME.colors.gray[2],
      DEFAULT_THEME.colors.gray[3],
      '#e1e6eb',
      DEFAULT_THEME.colors.gray[5],
      DEFAULT_THEME.colors.gray[6],
      DEFAULT_THEME.colors.gray[7],
      DEFAULT_THEME.colors.gray[8],
      DEFAULT_THEME.colors.gray[9]
    ]
  },
  components: {
    ModalContent: ModalContent.extend({
      defaultProps: {
        styles: {
          content: {
            border: '1px solid light-dark(var(--mantine-color-dark-2), var(--mantine-color-dark-6))'
          }
        }
      }
    }),
    Notification: Notification.extend({
      defaultProps: {
        withBorder: true
      }
    })
  }
});
