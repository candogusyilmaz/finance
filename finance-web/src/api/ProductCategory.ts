import { useQuery } from 'react-query';
import { api } from './axios';
import type { ApiQueryOptions } from './types/Defaults';
import type { ProductCategoryResponse } from './types/ProductTypes';

export function useGetProductCategories(
  options?: ApiQueryOptions<ProductCategoryResponse[]>
) {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      return (await api.get<ProductCategoryResponse[]>('/product-categories'))
        .data;
    },
    staleTime: 1200000,
    cacheTime: 1200000,
    ...options
  });
}
