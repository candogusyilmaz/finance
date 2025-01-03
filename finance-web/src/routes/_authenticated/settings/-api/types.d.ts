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

export type CurrencyResponse = {
  id: number;
  name: string;
  code: string;
  symbol: string;
  exchangeRate: number;
  baseCurrency: boolean;
  invoiceCurrency: boolean;
};

export type CreateCurrencyRequest = {
  name: string;
  code: string;
  symbol: string;
  exchangeRate: number;
  baseCurrency: boolean;
  invoiceCurrency: boolean;
};
