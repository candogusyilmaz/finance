import { queryOptions } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import type { ID } from 'src/api/types/Defaults';
import type { GetEmployeeResponse } from '../types';

export function getEmployeeById(employeeId: ID) {
  return api.get<GetEmployeeResponse>(`/employees/${employeeId}`);
}

export function getEmployeeQueryOptions(employeeId: ID) {
  return queryOptions({
    queryKey: ['employee', employeeId],
    queryFn: async () => (await getEmployeeById(employeeId)).data,
    staleTime: 120000
  });
}
