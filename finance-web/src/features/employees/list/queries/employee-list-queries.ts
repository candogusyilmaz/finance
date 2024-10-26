import { queryOptions } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import { type Page, type Pageable, createURL } from 'src/api/types/Defaults';
import type { GetEmployeesResponse } from 'src/api/types/EmployeeTypes';

export function getEmployees(pageable: Pageable) {
  return api.get<Page<GetEmployeesResponse>>(createURL('/employees', pageable));
}

export function getEmployeesQueryOptions(pageable: Pageable) {
  return queryOptions({
    queryKey: ['employees', pageable],
    queryFn: async () => (await getEmployees(pageable)).data,
    staleTime: 120000
  });
}
