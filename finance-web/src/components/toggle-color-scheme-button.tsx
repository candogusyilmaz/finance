import { ActionIcon, type ActionIconProps, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

function ToggleColorSchemeButton(props: ActionIconProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <>
      <ActionIcon onClick={toggleColorScheme} variant="subtle" color="gray" aria-label="Toggle color scheme" {...props}>
        {colorScheme === 'dark' && <IconSun color="yellow" size={20} />}
        {colorScheme === 'light' && <IconMoon color="black" size={20} />}
      </ActionIcon>
    </>
  );
}

export default ToggleColorSchemeButton;
