import { Button, Modal, type ModalProps, Stack, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { api } from 'src/api/axios';
import { CreateButton } from 'src/components/predefined-buttons';
import { useFormMutation } from 'src/hooks/use-form-mutation';

export function CreateProfessionModalButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <CreateProfessionModal opened={opened} onClose={close} />
      <CreateButton variant="light" onClick={open}>
        Yeni meslek oluştur
      </CreateButton>
    </>
  );
}

export function CreateProfessionModal(props: ModalProps) {
  const client = useQueryClient();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: ''
    },
    validate: {
      name: hasLength({ min: 3, max: 50 }, '3 ila 50 karakter arasında olmalıdır.')
    }
  });

  const mutation = useFormMutation(form, {
    mutationFn: (data: { name: string }) => api.post('/professions', data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['/professions']
      });
      onClose();
    }
  });

  const onClose = useCallback(() => {
    form.reset();
    props.onClose();
  }, [form.reset, props.onClose]);

  return (
    <Modal title="Yeni Meslek Oluştur" centered {...props} onClose={onClose}>
      <form onSubmit={form.onSubmit((data) => mutation.mutate(data))}>
        <Stack>
          <TextInput label="Meslek Adı" placeholder="Meslek" withAsterisk {...form.getInputProps('name')} />
          <Button mt="sm" w={140} type="submit" ml="auto">
            Kaydet
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
