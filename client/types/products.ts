// Product Variant
export interface ProductVariantInterface {
  id: string;
  size: string;
  price: number;
  salePrice: number;
  isOutOfStock: boolean;
  productId: string;
}
export interface CreateProductVariantInterface {
  size: string;
  price: number;
  salePrice?: number;
  productId: string;
}
export interface UpdateProductVariantInterface {
  id: string;
  size?: string;
  price?: number;
  salePrice?: number;
}

// Product
export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  sold: number;
  rating?: number;
  categoryId: string;
  productVariants: ProductVariantInterface[];
  category: {
    name: string;
  };
}
export interface CreateProductInterface {
  name: string;
  description: string;
  thumbnail: File;
  categoryId: string;
}

export interface UpdateProductInterface {
  id: string;
  name?: string;
  description?: string;
  thumbnail?: File;
  rating?: number;
}
