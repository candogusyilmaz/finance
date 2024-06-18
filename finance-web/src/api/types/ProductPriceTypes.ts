export type GetProductPricesResponse = {
  id: number;
  subcontractor?: CompanyResponse;
  product: ProductResponse;
  currency: CurrencyResponse;
  price: number;
  priceConfirmedBy?: UserResponse;
  vatRate?: number;
  withholdingTaxRate?: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserResponse;
  updatedBy: UserResponse;
};

export type CompanyResponse = {
  id: number;
  name: string;
};

export type ProductResponse = {
  id: number;
  name: string;
};

export type CurrencyResponse = {
  id: number;
  code: string;
  name: string;
};

export type UserResponse = {
  id: number;
  displayName: string;
};
