import React, { Dispatch, SetStateAction } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "@/app/_component/Skelton";
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

function Products({ data , setClickedProduct }: Props) {
  //console.log("Product data", data);
  return (
    <div className="grid grid-cols-1 py-4 px-6 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data ? (
        data.length > 0 ? (
          data.map((prod: any) => {
            return <ProductCard data={prod} key={prod.id} setClickedProduct={setClickedProduct}/>;
          })
        ) : (
         <div className="w-full md:w-[80vw] h-[70vh] flex items-center justify-center">
           <p className="font-semibold">No product added</p>
         </div>
        )
      ) : (
        [...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            additionalClass="w-52 lg:w-64 aspect-square rounded-xl"
          />
        ))
      )}
    </div>
  );
}

export default Products;
