import type { PaymentStatus } from './PaymentTypes';

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
  organizationId: number | string;
  individual: CreateIndividualRequest;
  worksiteId?: number;
  professionIds: number[];
  officialEmploymentStartDate: string;
  employmentStartDate: string;
  salary: Salary;
};

type Salary = {
  amount: number;
  currencyId: number;
  startDate: string;
};

export type GetEmployeeResponse = {
  id: number;
  socialSecurityNumber: string;
  name: string;
  birthDate: string;
  currentWorksite?: {
    id: number;
    name: string;
  };
  currentOrganization?: {
    id: number;
    name: string;
    formalEmploymentPeriod: {
      startDate: string;
      endDate: string | null;
    };
    actualEmploymentPeriod: {
      startDate: string;
      endDate: string | null;
    };
  };
  professions: {
    id: number;
    name: string;
  }[];
};

export type GetEmployeeSalaryResponse = {
  id: number;
  employeeId: number;
  wage: number;
  currency: {
    id: number;
    code: string;
  };
  effectivePeriod: {
    startDate: string;
    endDate: string | null;
  };
  createdBy: {
    id: number;
    name: string;
    time: string;
  };
  updatedBy: {
    id: number;
    name: string;
    time: string;
  };
};

export type GetEmployeeEmploymentResponse = {
  id: number;
  employeeId: number;
  formalEmploymentPeriod: {
    startDate: string;
    endDate: string | null;
  };
  actualEmploymentPeriod: {
    startDate: string;
    endDate: string | null;
  };
  organization: {
    id: number;
    name: string;
  };
  createdBy: {
    id: number;
    name: string;
    time: string;
  };
  updatedBy: {
    id: number;
    name: string;
    time: string;
  };
};

export type GetEmployeeAssignmentResponse = {
  id: number;
  employeeId: number;
  period: {
    startDate: string;
    endDate: string | null;
  };
  worksite: {
    id: number;
    name: string;
  };
  createdBy: {
    id: number;
    name: string;
    time: string;
  };
  updatedBy: {
    id: number;
    name: string;
    time: string;
  };
};

export type GetEmployeePaymentResponse = {
  id: number;
  description: string;
  money: {
    baseCurrencyCode: string;
    currencyCode: string;
    currencyRate: number;
    amount: number;
  };
  date: string;
  status: {
    id: number;
    status: PaymentStatus;
    audit: {
      id: number;
      name: string;
      time: string;
    };
  };
  category?: {
    id: number;
    name: string;
  };
  fromParty: {
    id: number;
    name: string;
  };
  toParty: {
    id: number;
    name: string;
  };
  method: {
    id: number;
    name: string;
  };
};
