export type CreateProductRequest = {
  name: string;
  description: string;
  productUnitId?: number;
  productType: ProductType;
  productCategoryId?: number;
};

export type ProductType = 'SERVICE' | 'PRODUCT';

export type ProductResponse = {
  id: number;
  name: string;
  category: ProductCategoryResponse;
  unit: ProductUnitResponse;
  type: ProductType;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductCategoryResponse = {
  id: number;
  name: string;
  description?: string;
};

export type ProductUnitResponse = {
  id: number;
  name: string;
};
