import type { AxiosError } from 'axios';
import type {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions
} from 'react-query';

export type ApiMutationOptions<TRequest, TResponse, TContext = unknown> = Omit<
  UseMutationOptions<TResponse, AxiosError<ProblemDetail>, TRequest, TContext>,
  'mutationFn'
>;

export type ApiQueryOptions<
  TResponse,
  TRequest = Empty,
  TQueryKey extends QueryKey = QueryKey
> = UseQueryOptions<TRequest, AxiosError<ProblemDetail>, TResponse, TQueryKey>;

export type ProblemDetail = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
};

export type Pageable = {
  page?: number;
  size?: number;
  sort?: string[];
};

export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
};

// biome-ignore lint/complexity/noBannedTypes:
export type Empty = {};

export function createURL(url: string, pageable: Pageable) {
  const params = new URLSearchParams();

  if (pageable.page !== undefined) {
    params.append('page', pageable.page.toString());
  }

  if (pageable.size !== undefined) {
    params.append('size', pageable.size.toString());
  }

  if (pageable.sort) {
    for (const s of pageable.sort) {
      params.append('sort', s);
    }
  }

  return `${url}?${params.toString()}`;
}
