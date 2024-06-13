import { useMutation, useQuery } from 'react-query';
import { api } from './axios';
import {
  createURL,
  type ApiMutationOptions,
  type ApiQueryOptions,
  type Empty,
  type Page,
  type Pageable
} from './types/Defaults';
import type {
  CreateProductRequest,
  ProductResponse
} from './types/ProductTypes';

export function useCreateProduct(
  options?: ApiMutationOptions<CreateProductRequest, Empty>
) {
  return useMutation({
    ...options,
    mutationFn: async (data: CreateProductRequest) => {
      return await api.post('/products', data);
    }
  });
}

export function useDeleteCompany(options?: ApiMutationOptions<number, Empty>) {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await api.delete(`/products/${id}`);
    }
  });
}

export function useGetProducts(
  page: Pageable,
  options?: ApiQueryOptions<Page<ProductResponse>>
) {
  return useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      return (
        await api.get<Page<ProductResponse>>(createURL('/products', page))
      ).data;
    },
    cacheTime: 6000,
    ...options
  });
}
