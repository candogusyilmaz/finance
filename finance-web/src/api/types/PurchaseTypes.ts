export type GetPurchasesResponse = {
  id: number;
  worksite: {
    id: number;
    name: string;
  };
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

export type PurchaseStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED' | 'IN_PROGRESS';

export type CreatePurchaseRequest = {
  worksiteId: number;
  supplierId: number;
  description: string;
  purchaseDate: Date;
  currencyId: number;
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
