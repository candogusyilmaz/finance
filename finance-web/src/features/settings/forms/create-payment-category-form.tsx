import { Button, Stack, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import { useFormMutation } from 'src/hooks/use-form-mutation';

interface CreatePaymentCategoryFormProps {
  onSuccess?: () => void;
}

export function CreatePaymentCategoryForm(props: CreatePaymentCategoryFormProps) {
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
      props.onSuccess?.();
    }
  });

  return (
    <form onSubmit={form.onSubmit((data) => mutation.mutate(data))}>
      <Stack>
        <TextInput label="Kategori Adı" placeholder="Kesinti" withAsterisk {...form.getInputProps('name')} />
        <Button mt="sm" w={140} type="submit" ml="auto">
          Kaydet
        </Button>
      </Stack>
    </form>
  );
}
