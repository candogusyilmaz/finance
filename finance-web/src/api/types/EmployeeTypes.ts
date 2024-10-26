import type { ID } from './Defaults';

export type GetEmployeesResponse = {
  id: number;
  socialSecurityNumber: string;
  name: string;
  currentWorksite?: {
    id: number;
    name: string;
  };
  currentOrganization?: {
    id: number;
    name: string;
    formalEmploymentPeriod: {
      startDate: string;
      endDate: string;
    };
    actualEmploymentPeriod: {
      startDate: string;
      endDate: string;
    };
  };
};

export type CreateEmployeeRequest = {
  organizationId: ID;
  individual: CreateIndividualRequest;
  worksiteId?: ID;
  professionId: ID;
  officialEmploymentStartDate: string;
  employmentStartDate: string;
  salary: Salary;
};

type Salary = {
  amount: number;
  currencyId: number;
  startDate: string;
};
