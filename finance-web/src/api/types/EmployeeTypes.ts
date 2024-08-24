type GetEmployeesResponse = {
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
