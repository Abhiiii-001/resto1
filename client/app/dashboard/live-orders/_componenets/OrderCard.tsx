import { CopyIcon, EllipsisVertical } from 'lucide-react'
import React from 'react'

type Props = {}

function OrderCard({data}: any) {
  return (
    <div className='py-4 px-6 w-[600px] bg-white rounded-xl'>
        {/* First - orderId,status */}
        <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-2'>
                <div>Order ID <span>#{data.orderCode}</span></div>
                <CopyIcon/>
            </div>

            <div className='flex items-center gap-2'>
                <div>{data.status}</div>
                <div>
                    <EllipsisVertical/>
                </div>
            </div>
        </div>

        {/* Name , date , time */}
        <div>
            <div>{data.name ? "data.name" : "Anyoumous"}</div>
            <div className='flex items-center gap-1'>
                <p>Time</p>
                <p>|</p>
                <p>Date</p>
            </div>
        </div>

        {/* Eating loc , payment */}
        <div>
            <div>Eat Location: <span>{data.isPack ? "Take out" : "Eat in"}</span></div>
            <div>Payment Opt: <span>{data.paymentOption}</span></div>
        </div>  

        {/* Suborders */}
        {
            data.orders.map((ord) => (
                <SubOrderCard data={ord} key= {ord.id} />
            ))
        }

        {/* Total and btns */}
        <div className='flex items-center justify-between'>
            <div>
                <p>Total</p>
                <p>${data.amount}</p>
            </div>
            <div className='flex gap-2 items-center'>
                <button>Cancel</button>
                <button>Ready</button>
            </div>
        </div>

    </div>
  )
}


const SubOrderCard = ({data}:any) => {
    return (
        <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-1'>
                <p>{data.quantity}</p>
                <p>x</p>
                <p>{data.name}</p>
                <p>({data.variant})</p>
            </div>
            <div>
                <p>${data.quantity * data.unitPrice}</p>
            </div>
            
        </div>
    )
}

export default OrderCard