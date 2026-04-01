import React from 'react';
import ProductCard from './ProductCard';
import { ProductInterface } from '@/redux/api/products';
import Image from 'next/image';
import { AlertCircleIcon, Edit, Trash, Trash2 } from 'lucide-react';

interface Props {
  products: ProductInterface[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className="min-w-[900px]">
      <div className="mt-4 grid w-full grid-cols-12 gap-8 overflow-x-scroll rounded-t-xl border border-[#B9B9B9] bg-gray-100 px-6 py-4 text-sm font-bold text-gray-700 text-opacity-90">
        <div className="col-span-2">Image</div>
        <div className="col-span-3">Product Name </div>
        <div className="col-span-2">Category</div>
        <div className="col-span-3">Variants</div>
        <div className="col-span-2 ml-4">Action</div>
      </div>
      {products.map((prod: any) => (
        <ProductCard data={prod} key={prod.id} />
      ))}
    </div>
  );
};

export default ProductGrid;
