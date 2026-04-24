import React from 'react';
import ProductCard from './ProductCard';
import { ProductInterface } from '@/types/products';

interface Props {
  products: ProductInterface[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="min-w-[900px]">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50/80 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <div className="col-span-1">Image</div>
          <div className="col-span-3">Product Name</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-4">Variants & Pricing</div>
          <div className="col-span-2 text-right pr-6">Actions</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {products.map((prod: ProductInterface) => (
            <ProductCard data={prod} key={prod.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
