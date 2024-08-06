import type { AxiosError } from 'axios';
import { z } from 'zod';

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

// biome-ignore lint/suspicious/noExplicitAny:
export function createURL(url: string, pageable?: Pageable, query?: any) {
  const params = new URLSearchParams();

  if (pageable?.page) {
    params.append('page', (pageable.page - 1).toString());
  }

  if (pageable?.size) {
    params.append('size', pageable.size.toString());
  }

  if (pageable?.sort) {
    params.append('sort', `${pageable.sort.id},${pageable.sort.direction}`);
  }

  if (query) {
    // biome-ignore lint/complexity/noForEach:
    Object.keys(query).forEach((key) => {
      if (query[key]) params.append(key, query[key]);
    });
  }

  return `${url}?${params.toString()}`;
}

export function setInvalidParams(problem: ProblemDetail | undefined, setFieldError: (field: string, message: string) => void) {
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

export type Timestamp = {
  createdAt: string;
  updatedAt: string;
};

export const PageSchema = z.object({
  page: z.number().min(1).optional().default(1).catch(1),
  size: z.number().min(2).max(50).optional().default(20).catch(20),
  sort: z
    .object({
      id: z.string(),
      direction: z.enum(['asc', 'desc'])
    })
    .optional()
    .default({
      id: 'id',
      direction: 'desc'
    })
    .catch({
      id: 'id',
      direction: 'desc'
    })
});
