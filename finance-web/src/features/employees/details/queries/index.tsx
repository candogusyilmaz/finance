import { queryOptions } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import type { ID } from 'src/api/types/Defaults';
import type { GetEmployeeResponse } from '../types';

export const getEmployeeById = (employeeId: ID) => api.get<GetEmployeeResponse>(`/employees/${employeeId}`);

export const getEmployeeQueryOptions = (employeeId: ID) =>
  queryOptions({
    queryKey: ['employee', employeeId],
    queryFn: async () => (await getEmployeeById(employeeId)).data,
    staleTime: 120000
  });
