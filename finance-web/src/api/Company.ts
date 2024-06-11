import { useMutation, useQuery } from 'react-query';
import { api } from './axios';
import type { CompanyResponse, CreateCompanyRequest } from './types/Company';
import {
  createURL,
  type ApiMutationOptions,
  type ApiQueryOptions,
  type Empty,
  type Page,
  type Pageable
} from './types/Defaults';

export function useCreateCompany(
  options?: ApiMutationOptions<CreateCompanyRequest, Empty>
) {
  return useMutation({
    ...options,
    mutationFn: async (data: CreateCompanyRequest) => {
      return await api.post('/companies', data);
    }
  });
}

export function useGetCompanies(
  page: Pageable,
  options?: ApiQueryOptions<Page<CompanyResponse>>
) {
  return useQuery({
    queryKey: ['companies', page],
    queryFn: async () => {
      return (
        await api.get<Page<CompanyResponse>>(createURL('/companies', page))
      ).data;
    },
    cacheTime: 6000,
    ...options
  });
}
