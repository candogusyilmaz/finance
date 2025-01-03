import { Button, Stack, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import { useFormMutation } from 'src/hooks/use-form-mutation';

interface CreateProductUnitFormProps {
  onSuccess?: () => void;
}

export function CreateProductUnitForm(props: CreateProductUnitFormProps) {
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
      props.onSuccess?.();
    }
  });

  return (
    <form onSubmit={form.onSubmit((data) => mutation.mutate(data))}>
      <Stack>
        <TextInput label="Birim Adı" maxLength={50} placeholder="Kilogram" withAsterisk {...form.getInputProps('name')} />
        <TextInput label="Sembol" maxLength={8} placeholder="kg" withAsterisk {...form.getInputProps('symbol')} />
        <Button mt="sm" w={140} type="submit" ml="auto">
          Kaydet
        </Button>
      </Stack>
    </form>
  );
}
