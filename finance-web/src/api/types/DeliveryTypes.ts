export const DeliveryItemStatusValues = ['DELIVERED', 'RETURNED'] as const;

export type DeliveryItemStatus = (typeof DeliveryItemStatusValues)[number];

export type GetUndeliveredItemsReponse = {
  purchaseItemId: number;
  productName: string;
  remainingQuantity: number;
};

export type CreateDeliveryRequest = {
  senderId: number;
  description?: string;
  currencyId: number;
  price: number;
  deliveryDate: string;
  deliveryItems: CreateDeliveryItemRequest[];
  shouldCreateInvoice: boolean;
};

export type CreateDeliveryItemRequest = {
  purchaseItemId: number;
  quantity: number;
  description?: string;
  status: DeliveryItemStatus;
};
