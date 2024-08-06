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

export type CreateProductPriceRequest = {
  subcontractorId?: number;
  productId: number;
  price: number;
  priceConfirmedById?: number;
  currencyId: number;
  vatRate?: number;
  withholdingTaxRate?: number;
  startDate: string;
  endDate: string;
  description?: string;
};

export type GetProductPricesForPurchaseRequest = {
  companyId: string | number;
  date: string;
};

export type GetProductPricesForPurchaseResponse = {
  id: number;
  productId: number;
  productName: string;
  price: number;
  currencyId: number;
  currencyCode: string;
  currencyRate: string;
  vatRate: number;
  withholdingTaxRate: number;
  priceConfirmedById?: number;
  priceConfirmedByFullName?: string;
};
