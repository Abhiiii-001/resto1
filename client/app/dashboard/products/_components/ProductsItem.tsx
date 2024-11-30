import React from 'react'
import ProductCard from './ProductCard'
import { ProductInterface } from '@/redux/api/products'

interface Props {
    products: any
}

// const products = [
//     {   
//         id: "1",
//         name: "Samosa",
//         thumbnail: "https://imgs.search.brave.com/uKqvNBeFwufVI5mqy3uuWO2yKeKRjGJFakYqwOe8PAI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIvQnVy/Z2VyLVBORy1IRC1R/dWFsaXR5LnBuZw",
//         sold: 10,
//         productVariants: [
//             {
//                 size: "S",
//                 salePrice: 15,
//                 price: 25,
//                 isOutOfStock: true
//             },
//             {
//                 size: "M",
//                 salePrice: 15,
//                 price: 25,
//                 isOutOfStock: false
//             },
//         ]
//     },
//     {   
//         id: "2",
//         name: "Samosa",
//         thumbnail: "https://imgs.search.brave.com/uKqvNBeFwufVI5mqy3uuWO2yKeKRjGJFakYqwOe8PAI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIvQnVy/Z2VyLVBORy1IRC1R/dWFsaXR5LnBuZw",
//         sold: 10,
//         productVariants: [
//             {
//                 size: "S",
//                 salePrice: 15,
//                 price: 25,
//                 isOutOfStock: false
//             },
//             {
//                 size: "M",
//                 salePrice: 15,
//                 price: 25,
//                 isOutOfStock: false
//             },
//         ]
//     },
//     {   
//         id: "3",
//         name: "Samosa",
//         thumbnail: "https://imgs.search.brave.com/VrV_uY0el5MfgZ8UHHdqTOE4fBzy4y0fJ0_8bdbOMFk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIvQnVy/Z2VyLVBORy1IRC1R/dWFsaXR5LnBuZw",
//         sold: 10,
//         productVariants: [
//             {
//                 size: "S",
//                 salePrice: 15,
//                 price: 25,
//                 isOutOfStock: false
//             },
//         ]
//     },
//     {   
//         id: "4",
//         name: "Samosa",
//         thumbnail: "https://imgs.search.brave.com/VrV_uY0el5MfgZ8UHHdqTOE4fBzy4y0fJ0_8bdbOMFk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIvQnVy/Z2VyLVBORy1IRC1R/dWFsaXR5LnBuZw",
//         sold: 10,
//         productVariants: [
//             {
//                 size: "S",
//                 salePrice: 15,
//                 price: 25,
//                 isOutOfStock: false
//             },
//             {
//                 size: "M",
//                 salePrice: 15,
//                 price: 25,
//                 isOutOfStock: true
//             },
//             {
//                 size: "L",
//                 salePrice: 15,
//                 price: 25,
//                 isOutOfStock: true
//             },

//         ]
//     },
// ]


const ProductsItem = ({products}: Props) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        {
            //@ts-ignore
           products && products.map((prod,index) => {
                return <ProductCard data = {prod} key={index} />
            })
        }
    </div>
  )
}

export default ProductsItem