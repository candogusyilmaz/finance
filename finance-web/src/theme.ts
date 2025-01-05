import { Drawer, Modal, createTheme } from '@mantine/core';

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
  components: {
    Modal: Modal.extend({
      defaultProps: {
        radius: 'sm',
        shadow: '0',
        styles: {
          content: {
            border: '1px solid light-dark(var(--mantine-color-dark-2), var(--mantine-color-dark-6))'
          }
        }
      }
    }),
    Drawer: Drawer.extend({
      styles: {
        header: {
          borderBottom: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))'
        },
        body: {
          marginTop: 'var(--mantine-spacing-sm)'
        },
        title: {
          fontWeight: 500
        }
      }
    })
  }
});
