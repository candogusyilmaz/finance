import { Button, LoadingOverlay, Stack, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import type { ID } from 'src/api/types/Defaults';
import { useFormMutation } from 'src/hooks/use-form-mutation';

interface UpdateProfessionFormProps {
  professionId: ID;
  onSuccess?: () => void;
}

export function UpdateProfessionForm({ professionId, onSuccess }: UpdateProfessionFormProps) {
  const client = useQueryClient();

  const query = useQuery({
    queryKey: ['/professions', professionId],
    queryFn: async () => {
      const result = (await api.get<{ id: ID; name: string }>(`/professions/${professionId}`)).data;
      form.setFieldValue('name', result.name);
      return result;
    },
    staleTime: Number.POSITIVE_INFINITY
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: query.data?.name ?? ''
    },
    validate: {
      name: hasLength({ min: 3, max: 50 }, '3 ila 50 karakter arasında olmalıdır.')
    }
  });

  const mutation = useFormMutation(form, {
    mutationFn: (data: { name: string }) => api.patch(`/professions/${professionId}`, data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['/professions']
      });
      onSuccess?.();
    }
  });

  return (
    <form onSubmit={form.onSubmit((data) => mutation.mutate(data))}>
      <LoadingOverlay visible={query.isPending} />
      <Stack>
        <TextInput label="Meslek Adı" placeholder="Meslek" withAsterisk {...form.getInputProps('name')} />
        <Button mt="sm" w={140} type="submit" ml="auto" loading={mutation.isPending}>
          Kaydet
        </Button>
      </Stack>
    </form>
  );
}
