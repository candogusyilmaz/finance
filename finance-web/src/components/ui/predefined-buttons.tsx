import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export const CreateButton = Button.withProps({
  size: 'sm',
  px: 'md',
  fz: 'sm',
  leftSection: <IconPlus size={18} />
});
