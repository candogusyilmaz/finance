import type { ID } from 'src/api/types/Defaults';

export type ProfessionResponse = {
  id: string;
  name: string;
};

export type PaymentCategoryResponse = {
  id: string;
  name: string;
};

export type ProductCategoryResponse = {
  id: string;
  name: string;
  description?: string;
};

export type ProductUnitResponse = {
  id: string;
  name: string;
  symbol: string;
};

export type UpsertProfessionRequest = { name: string } | { id: ID; name: string };
