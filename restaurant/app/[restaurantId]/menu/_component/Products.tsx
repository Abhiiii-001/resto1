import React, { Dispatch, SetStateAction } from "react";
import ProductCard from "./ProductCard";
import { ProductInterface } from "@/redux/api/data";

type Props = {
  data: ProductInterface[];
  setClickedProduct: Dispatch<SetStateAction<ProductInterface | null>>
};

// const data = [
//     {
//         id:1,
//         name: "Cheese Burger"
//     },
//     {
//         id:2,
//         name: "Paneer Burger"
//     },
//     {
//         id:3,
//         name: "Chicken Burger"
//     },
//     {
//         id:4,
//         name: "Veg Burger"
//     },
// ]

function Products({ data, setClickedProduct }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 py-4 px-4 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
      {data ? (
        data.length > 0 ? (
          data.map((prod: ProductInterface) => (
            <ProductCard data={prod} key={prod.id} setClickedProduct={setClickedProduct} />
          ))
        ) : (
          <div className="col-span-full h-64 flex items-center justify-center">
            <p className="text-gray-400 font-semibold">No products in this category</p>
          </div>
        )
      ) : (
        [...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
            <div className="aspect-square bg-gray-100" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-100 rounded-full w-3/4" />
              <div className="h-3 bg-gray-100 rounded-full w-1/3" />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Products;
