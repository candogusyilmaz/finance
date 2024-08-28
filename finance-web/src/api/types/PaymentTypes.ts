export const PaymentStatusValues = ['PENDING', 'COMPLETED', 'CANCELLED'] as const;

export type PaymentStatus = (typeof PaymentStatusValues)[number];
