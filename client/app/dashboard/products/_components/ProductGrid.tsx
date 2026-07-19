import React from 'react';
import ProductCard from './ProductCard';
import { ProductInterface } from '@/types/products';
import { useAppSelector } from '@/redux/redux';
import { USER_ROLE_TYPE } from '@/constants/CommonConstant';

interface Props {
  products: ProductInterface[];
}

const ProductGrid = ({ products }: Props) => {
  const { role, canManage } = useAppSelector((state) => state.auth);
  const shouldShowActions = role === USER_ROLE_TYPE.RESTAURANT || canManage;
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="min-w-[900px]">
        {/* Table Header */}
        <div
          className={`grid ${shouldShowActions ? 'grid-cols-12' : 'grid-cols-10'} gap-4 border-b border-gray-200 bg-gray-50/80 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500`}
        >
          <div className="col-span-1">Image</div>
          <div className="col-span-3">Product Name</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-4">Variants & Pricing</div>
          {shouldShowActions && (
            <div className="col-span-2 text-right pr-6">Actions</div>
          )}
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
