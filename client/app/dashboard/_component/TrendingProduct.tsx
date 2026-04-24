import { Products } from '@/types/dashboard';
import { ShoppingBag, TrendingUp, PackageSearch } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {
  data: Products[];
};

function ProductCard({ data }: { data: Products }) {
  return (
    <div className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 last:border-0 transition-colors hover:bg-gray-50/50">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-gray-50">
          <Image
            src={data.product.thumbnail}
            alt="logo"
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-sm font-semibold text-foreground">
            {data.product.name}{' '}
            <span className="font-normal text-muted-foreground">({data.size})</span>
          </div>
          <div className="text-sm font-semibold text-primary">₹{data.price}</div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2.5">
        <div
          className={`rounded-lg p-1.5 ${
            data.isOutOfStock
              ? 'bg-red-50 text-red-600'
              : 'bg-green-50 text-green-600'
          }`}
        >
          <ShoppingBag size={16} />
        </div>
        <div className="text-sm font-semibold text-muted-foreground">
          {data.sold} sold
        </div>
      </div>
    </div>
  );
}

function TrendingProduct({ data }: Props) {
  const hasProducts = data && data.length > 0;

  return (
    <div className="col-span-3 row-span-3 flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm xl:col-span-1 xl:row-span-7 2xl:row-span-9">
      <div className="flex w-full items-center gap-2.5 border-b border-border px-5 py-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-base font-semibold text-foreground">Trending Products</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {hasProducts ? (
          data.map((product: Products, indx: number) => (
            <ProductCard data={product} key={indx} />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground">
            <PackageSearch className="h-10 w-10 opacity-20" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">No trending products</p>
              <p className="text-xs">Sales data will appear here once orders are placed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrendingProduct;
