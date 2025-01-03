import { Button, Checkbox, Group, NumberInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import { useFormMutation } from 'src/hooks/use-form-mutation';
import { z } from 'zod';

interface CreateCurrencyFormProps {
  onSuccess?: () => void;
}

const createCurrencyRequestSchema = z.object({
  code: z.string().length(3, 'Para birimi kodu 3 karakter olmalıdır.'),
  name: z
    .string()
    .min(3, 'Para birimi adı 3 ila 255 karakter arasında olmalıdır.')
    .max(255, 'Para birimi adı 3 ila 255 karakter arasında olmalıdır.'),
  symbol: z.string().min(1, 'Sembol 1 ila 10 karakter arasında olmalıdır.').max(10, 'Sembol 1 ila 10 karakter arasında olmalıdır.'),
  exchangeRate: z.coerce.number().positive('Döviz kuru pozitif olmalıdır.'),
  baseCurrency: z.boolean({ required_error: 'Baz para birimi bilgisi boş olamaz.' }),
  invoiceCurrency: z.boolean({ required_error: 'Fatura para birimi bilgisi boş olamaz.' })
});

export function CreateCurrencyForm({ onSuccess }: CreateCurrencyFormProps) {
  const client = useQueryClient();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      code: '',
      name: '',
      symbol: '',
      exchangeRate: null,
      baseCurrency: false,
      invoiceCurrency: false
    },
    validate: zodResolver(createCurrencyRequestSchema)
  });

  const mutation = useFormMutation(form, {
    mutationFn: (data) => api.post('/currencies', data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['/currencies']
      });
      onSuccess?.();
    }
  });

  return (
    <form onSubmit={form.onSubmit((data) => mutation.mutate(data))}>
      <Stack>
        <TextInput label="Para Birimi Adı" placeholder="Türk Lirası" withAsterisk {...form.getInputProps('name')} />
        <Group grow align="start">
          <TextInput label="Sembol" placeholder="₺" maxLength={10} withAsterisk {...form.getInputProps('symbol')} />
          <TextInput label="Kod" placeholder="TRY" maxLength={3} withAsterisk {...form.getInputProps('code')} />
        </Group>

        <NumberInput
          label="Döviz Kuru"
          placeholder="1.0"
          hideControls
          thousandSeparator=","
          decimalSeparator="."
          withAsterisk
          min={0}
          {...form.getInputProps('exchangeRate')}
        />

        <Checkbox label="Baz Para Birimi" {...form.getInputProps('baseCurrency', { type: 'checkbox' })} />

        <Button mt="sm" w={140} type="submit" ml="auto">
          Kaydet
        </Button>
      </Stack>
    </form>
  );
}
