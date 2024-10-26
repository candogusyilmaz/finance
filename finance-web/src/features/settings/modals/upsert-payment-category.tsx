import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { api } from 'src/api/axios';
import { CreateButton } from 'src/components/predefined-buttons';
import { useFormMutation } from 'src/hooks/use-form-mutation';

export function UpsertPaymentCategory() {
  const [opened, { open, close }] = useDisclosure(false);
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
    mutationFn: (data: { name: string }) => api.post('/payment-categories', data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['/payment-categories']
      });
      onClose();
    }
  });

  const onClose = useCallback(() => {
    form.reset();
    close();
  }, [form.reset, close]);

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Yeni Ödeme Kategorisi Oluştur" centered>
        <form onSubmit={form.onSubmit((data) => mutation.mutate(data))}>
          <Stack>
            <TextInput label="Kategori Adı" placeholder="Kesinti" withAsterisk {...form.getInputProps('name')} />
            <Button mt="sm" w={140} type="submit" ml="auto">
              Kaydet
            </Button>
          </Stack>
        </form>
      </Modal>
      <CreateButton variant="light" onClick={open}>
        Yeni ödeme kategorisi oluştur
      </CreateButton>
    </>
  );
}
