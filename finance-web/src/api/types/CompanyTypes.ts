export type CreateCompanyRequest = {
  name: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  taxOffice?: string;
  taxRegistrationNumber?: string;
};

export type GetCompaniesResponse = {
  id: number;
  name: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  taxOffice?: string;
  taxRegistrationNumber?: string;
  createdAt: string;
  updatedAt: string;
};
