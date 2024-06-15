export type CreateProductRequest = {
  name: string;
  description: string;
  productUnitId?: number;
  productType: ProductType;
  productCategoryId?: number;
};

export type ProductType = 'SERVICE' | 'PRODUCT';

export type GetProductsResponse = {
  id: number;
  name: string;
  category: GetProductCategoriesResponse;
  unit: GetProductUnitsResponse;
  type: ProductType;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type GetProductCategoriesResponse = {
  id: number;
  name: string;
  description?: string;
};

export type GetProductUnitsResponse = {
  id: number;
  name: string;
};
