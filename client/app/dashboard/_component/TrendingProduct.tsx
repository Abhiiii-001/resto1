import Loader from "@/components/common/Loader";
import { useGetDashboardDataQuery } from "@/redux/api/dashboard";
import { ProductInterface } from "@/redux/api/products";
import { useAppSelector } from "@/redux/redux";
import { ShoppingBag, TrendingUp } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {};

// const data = [
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 220,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 190,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 100,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: true,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
//   {
//     name: "Burger",
//     thumbnail:
//       "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1738784302/my-files/eq5xvc4r731awlkbhyg2.png",
//     size: "Small",
//     price: 200,
//     sold: 20,
//     isOutOfStock: false,
//   },
// ];

interface ProuctInterface {
  product: {
    name: string,
    thumbnail: string
  }
  size: string;
  price: number;
  sold: number;
  isOutOfStock: boolean;
}

function ProductCard({ data }: { data: ProuctInterface }) {
  return (
    <div className="w-full py-2 border-b-2 border-opacity-40 px-4 flex items-center justify-between">
      <div className=" flex items-center gap-2 ">
        <div>{/* thumbnail */}

            <Image src={data.product.thumbnail} alt="logo" width={56} height={56} />

        </div>
        <div className="flex flex-col items-start gap-1">
          {/* name,size,price */}
          <div>
            {data.product.name}{" "}(<span className="font-serif">{data.size}</span>)
          </div>
          <div className="font-clash text-blue-500 font-medium">₹{data.price}</div>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <div className={`${data.isOutOfStock ? "text-blue-700 bg-blue-300" : "text-red-700 bg-red-300"} p-2 rounded-2xl`}>
          <ShoppingBag size={18} />
        </div>

        <div className="text-sm font-semibold h text-gray-700">{data.sold} sold</div>
      </div>
    </div>
  );
}

function TrendingProduct({}: Props) {

  const { isAuthenticated , restaurantId } = useAppSelector((state) => state.auth);
  const {data: DashboardDataResponse , isLoading} = useGetDashboardDataQuery(restaurantId)

  if(isLoading) return <Loader/>
  const data = DashboardDataResponse.data.products

  return (
    <div className=" row-span-3 col-span-3 xl:col-span-1 xl:row-span-7 2xl:row-span-9 rounded-xl h-full bg-white flex flex-col overflow-hidden">
      <div className="w-full px-6 text-start text-xl font-semibold flex gap-3 items-center text-gray-800 py-3 border-b-2 border-opacity-40 border-gray-800">
        Trending Products
        <TrendingUp color="#60a5fa "/>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div>
          {data.map((product: any, indx:number) => (
            <ProductCard data={product} key={indx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingProduct;
