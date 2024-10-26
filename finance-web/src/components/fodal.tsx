import { Modal, type ModalProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type React from 'react';

export type FodalProps = {
  title: React.ReactNode;
  modalProps?: Omit<ModalProps, 'opened' | 'onClose'>;
  content: (data: { close: () => void }) => React.ReactNode;
  trigger: (data: { open: () => void }) => React.ReactNode;
};

export function Fodal(props: FodalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={props.title} centered {...props.modalProps}>
        {props.content({ close })}
      </Modal>
      {props.trigger({ open })}
    </>
  );
}
