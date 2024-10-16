import { notifications } from '@mantine/notifications';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { SetFieldError } from 'node_modules/@mantine/form/lib/types';
import type { ProblemDetail } from 'src/api/types/Defaults';

type MutationOptions<TData, TError, TVariables, TContext> = UseMutationOptions<TData, TError, TVariables, TContext> & {};

function setInvalidParams(problem: ProblemDetail | undefined, setFieldError: (field: string, message: string) => void) {
  if (!problem) return false;

  const invalidParams = problem['invalid-params'];

  if (!invalidParams) return false;

  for (const [key, messages] of Object.entries(invalidParams)) {
    for (const message of messages) {
      setFieldError(key, message);
    }
  }

  return true;
}

export function useFormMutation<TData, TVariables, TContext = unknown>(
  form: { setFieldError: SetFieldError<string> },
  mutationOptions: MutationOptions<TData, AxiosError<ProblemDetail>, TVariables, TContext>
) {
  return useMutation<TData, AxiosError<ProblemDetail>, TVariables, TContext>({
    ...mutationOptions,
    onError: (error, variables, context) => {
      mutationOptions.onError?.(error, variables, context);

      const invalidParams = setInvalidParams(error.response?.data, form.setFieldError);

      if (!invalidParams && error.response?.data.detail) {
        notifications.show({
          id: 'http-error',
          message: error.response.data.detail,
          color: 'red'
        });
      }
    }
  });
}
