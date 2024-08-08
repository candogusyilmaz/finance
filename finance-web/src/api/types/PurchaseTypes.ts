export type GetPurchasesResponse = {
  id: number;
  supplier: {
    id: number;
    name: string;
  };
  description: string;
  currency: {
    id: number;
    code: string;
    exchangeRate: number;
  };
  purchaseDate: string;
  official: boolean;
  total: number;
  lastAction: {
    id: number;
    status: PurchaseStatus;
    comment?: string;
    createdAt: string;
  };
};

export type PurchaseStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED';

export type CreatePurchaseRequest = {
  supplierId: number | string;
  description: string;
  purchaseDate: Date;
  currencyId: number | string;
  purchaseItems: CreatePurchaseItemRequest[];
  official: boolean;
};

export type CreatePurchaseItemRequest = {
  productId: number | string;
  description?: string;
  quantity: number;
  unitPrice: number;
  vatRate?: number;
  withholdingTaxRate?: number;
};
