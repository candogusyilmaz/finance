import { Drawer, type DrawerProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type React from 'react';

export type FrawerProps = {
  title: React.ReactNode;
  drawerProps?: Omit<DrawerProps, 'opened' | 'onClose'>;
  content: (data: { close: () => void }) => React.ReactNode;
  trigger: (data: { open: () => void }) => React.ReactNode;
};

export function Frawer(props: FrawerProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title={props.title} {...props.drawerProps}>
        {props.content({ close })}
      </Drawer>
      {props.trigger({ open })}
    </>
  );
}
