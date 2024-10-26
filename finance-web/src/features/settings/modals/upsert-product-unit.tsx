import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { api } from 'src/api/axios';
import { CreateButton } from 'src/components/predefined-buttons';
import { useFormMutation } from 'src/hooks/use-form-mutation';

export function UpsertProductUnit() {
  const [opened, { open, close }] = useDisclosure(false);
  const client = useQueryClient();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      symbol: ''
    },
    validate: {
      name: hasLength({ min: 3, max: 50 }, '3 ila 50 karakter arasında olmalıdır.'),
      symbol: hasLength({ min: 1, max: 8 }, '1 ila 8 karakter arasında olmalıdır.')
    }
  });

  const mutation = useFormMutation(form, {
    mutationFn: (data: { name: string }) => api.post('/product-units', data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['/product-units']
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
      <Modal opened={opened} onClose={onClose} title="Yeni Ürün Birimi Oluştur" centered>
        <form onSubmit={form.onSubmit((data) => mutation.mutate(data))}>
          <Stack>
            <TextInput label="Birim Adı" maxLength={50} placeholder="Kilogram" withAsterisk {...form.getInputProps('name')} />
            <TextInput label="Sembol" maxLength={8} placeholder="kg" withAsterisk {...form.getInputProps('symbol')} />
            <Button mt="sm" w={140} type="submit" ml="auto">
              Kaydet
            </Button>
          </Stack>
        </form>
      </Modal>
      <CreateButton variant="light" onClick={open}>
        Yeni ürün birimi oluştur
      </CreateButton>
    </>
  );
}
