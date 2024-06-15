import '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ProblemDetail } from './api/types/Defaults';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ProblemDetail>;
  }
}
