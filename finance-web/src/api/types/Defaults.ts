import type { AxiosError } from 'axios';

export type ProblemDetail = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  'invalid-params'?: { [key: string]: string[] };
};

export type ApiError = AxiosError<ProblemDetail>;

export type Pageable = {
  page?: number;
  size?: number;
  sort?: Sort;
};

export type Sort = {
  id: string;
  direction: 'asc' | 'desc';
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
    params.append('page', (pageable.page - 1).toString());
  }

  if (pageable.size !== undefined) {
    params.append('size', pageable.size.toString());
  }

  if (pageable.sort) {
    params.append('sort', `${pageable.sort.id},${pageable.sort.direction}`);
  }

  return `${url}?${params.toString()}`;
}

export function setInvalidParams(
  problem: ProblemDetail | undefined,
  setFieldError: (field: string, message: string) => void
) {
  if (!problem) return false;

  const invalidParams = problem['invalid-params'];

  if (invalidParams) {
    for (const [key, messages] of Object.entries(invalidParams)) {
      for (const message of messages) {
        setFieldError(key, message);
      }
    }

    return true;
  }

  return false;
}
