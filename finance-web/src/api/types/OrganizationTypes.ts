import type { PartyRole } from './PartyTypes';

export type CreateOrganizationRequest = {
  name: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  taxOffice?: string;
  taxRegistrationNumber?: string;
  roles: PartyRole[];
};

export type GetOrganizationsResponse = {
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
