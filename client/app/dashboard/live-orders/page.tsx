import React from 'react'
import OrderCard from './_componenets/OrderCard'

type Props = {}

const dummyData = [
  {
    id: 'ajlkal',
    orderCode: "234561",
    name: null,
    status: "Pending",
    amount: 345,
    isPack: false,
    isVerified: true,
    invoice:" jsjfla",
    paymentOption: "Cash",
    createdAt: "",
    restaurantId: "fjdalk",
    orders:[
      {
        id: "jkdsfk",
        name: "Paneer Burger",
        variant: "small",
        quantity: 2,
        unitPrice: 50,       
      }
    ]
  }
]

function LiveOrders({}: Props) {
  return (
    <div>LiveOrders

      {
        dummyData.map((data) => (
          <OrderCard data = {data} key={data.id} />
        ))
      }
    </div>
  )
}

export default LiveOrders