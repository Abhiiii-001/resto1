import { Box, LineChart, LucideIcon, QrCode, TimerReset, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

type Props = {}

function StatsCard({title,content,gain,icon,color}: {
    title: string,
    content: string,
    gain: number | null,
    icon: LucideIcon
    color: string
}) {
    const Icon = icon;
    return (
        <div className='bg-white flex flex-col items-start lg:max-w-[270px] justify-between gap-8 px-4 py-3 rounded-xl'>
            <div className=' flex flex-row w-full lg:gap-12 items-center justify-between'>

                <div className='flex flex-col items-start justify-center gap-2'>
                    <p className=' text-[0.95rem] font-medium text-gray-800'>{title}</p>
                    <p className='font-semibold text-[1.4rem]'>
                        {title === "Total Earning" ? "₹ " : ''}{content}</p>
                </div>

                <div className={` ${color}  p-2 rounded-2xl`}>
                    <Icon width={28} height={28}/>
                </div>

            </div>

            {
                gain ? 
                <div className={`flex gap-1 items-center`}>
                <div className={`${gain > 0 ? "text-green-400" : "text-red-400"} flex gap-1`}>
                {
                    gain > 0 ? <TrendingUp/> : <TrendingDown/>
                }
                {" "}
                {gain}%
                {" "}
                </div>
                {
                   gain > 0 ? "up " : "down" 
                } from yesterday
            </div> : 
            <div className='text-sm'>
                <sup className='text-pink-500'>*</sup>
                Check live product for more details
            </div>
            }

        </div>
    )
}

const data = {
    totalEarning: "25000",
    totalOrders: "400",
    totalQRScan: "6000",
    pendingOrder: "20",
    earningGain: -1.3,
    ordersGain: 2.5,
    qrGain: 4
}
function Stats({}: Props) {
  return (
    <div className='row-span-2 xl:row-span-2 col-span-3 2xl:col-span-2'>
       <div className='w-full flex flex-wrap gap-6 items-center justify-between'>

        <StatsCard
           title = {"Total Earning"}
           content= {data.totalEarning}
           gain={data.earningGain}
           icon = {LineChart}
           color={"bg-purple-300 text-purple-700"}
        />
        <StatsCard
           title = {"Total Orders"}
           content= {data.totalOrders}
           gain={data.ordersGain}
           icon = {Box}
           color={"bg-yellow-300 text-yellow-700"}
        />
        <StatsCard
           title = {"Total QR Scan"}
           content= {data.totalQRScan}
           gain={data.qrGain}
           icon = {QrCode}
           color={"bg-green-300 text-green-700"}
        />
        <StatsCard
           title = {"Total Pending"}
           content= {data.pendingOrder}
           gain={null}
           icon = {TimerReset}
           color={"bg-orange-300 text-orange-700"}
        />



       </div>
    </div>
  )
}

export default Stats