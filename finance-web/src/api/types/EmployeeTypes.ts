type WorksiteResponse = {
  id: number;
  name: string;
};

type GetEmployeesResponse = {
  id: number;
  socialSecurityNumber: string;
  name: string;
  officialEmploymentStartDate: string; // ISO 8601 date string
  officialEmploymentEndDate: string; // ISO 8601 date string
  employmentStartDate: string; // ISO 8601 date string
  employmentEndDate: string; // ISO 8601 date string
  worksite?: WorksiteResponse;
};

type CreateEmployeeRequest = {
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
