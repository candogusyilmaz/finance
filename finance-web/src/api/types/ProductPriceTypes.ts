import type { ID } from './Defaults';

export type GetProductPricesResponse = {
  id: number;
  supplier?: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
  currency: {
    id: number;
    code: string;
    name: string;
  };
  price: number;
  priceConfirmedBy?: {
    id: number;
    displayName: string;
  };
  vatRate?: number;
  withholdingTaxRate?: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: number;
    displayName: string;
  };
  updatedBy: {
    id: number;
    displayName: string;
  };
};

export type CreateProductPriceRequest = {
  supplierId?: number;
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
  supplierId: ID;
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
