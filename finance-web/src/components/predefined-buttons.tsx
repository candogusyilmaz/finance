import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export const CreateButton = Button.withProps({
  size: 'sm',
  px: 'lg',
  fz: 'sm',
  leftSection: <IconPlus size={18} color="white" />
});
