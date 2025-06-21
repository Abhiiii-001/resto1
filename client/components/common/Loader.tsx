import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='w-full h-full flex items-center justify-center bg-transparent relative backdrop-blur-sm '>
        <div className='loader'></div>
        <div className='absolute rotate-[-20deg] font-serif text-[#F5A463] font-semibold animate-pulse'>Restro</div>
    </div>
  )
}

export default Loader