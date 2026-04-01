import { Products } from '@/types/dashboard';
import { ShoppingBag, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {
  data: Products[];
};

function ProductCard({ data }: { data: Products }) {
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-opacity-40 px-4 py-2">
      <div className="flex items-center gap-2">
        <div>
          {/* thumbnail */}
          <Image
            src={data.product.thumbnail}
            alt="logo"
            width={56}
            height={56}
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          {/* name,size,price */}
          <div>
            {data.product.name} (<span className="font-serif">{data.size}</span>
            )
          </div>
          <div className="font-clash font-medium text-blue-500">
            ₹{data.price}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <div
          className={`${data.isOutOfStock ? 'bg-blue-300 text-blue-700' : 'bg-red-300 text-red-700'} rounded-2xl p-2`}
        >
          <ShoppingBag size={18} />
        </div>

        <div className="h text-sm font-semibold text-gray-700">
          {data.sold} sold
        </div>
      </div>
    </div>
  );
}

function TrendingProduct({ data }: Props) {
  return (
    <div className="col-span-3 row-span-3 flex h-full flex-col overflow-hidden rounded-xl bg-white xl:col-span-1 xl:row-span-7 2xl:row-span-9">
      <div className="flex w-full items-center gap-3 border-b-2 border-gray-800 border-opacity-40 px-6 py-3 text-start text-xl font-semibold text-gray-800">
        Trending Products
        <TrendingUp color="#60a5fa " />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div>
          {data.map((product: Products, indx: number) => (
            <ProductCard data={product} key={indx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingProduct;
