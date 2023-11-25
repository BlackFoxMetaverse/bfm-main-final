import Image from 'next/image'
import React from 'react'

const SearchCard = ({img, name}) => {
  return (
    <div className='max-w-[308.311px] max-h-[353.826px] shadow-[0px_1px_61.2px_0px_rgba(0,0,0,0.10)] rounded-[15px]'>
      <div className='w-[308.311px] h-[244.522px] shrink-0'>
        <Image src={img} alt='img' className='max-w-[308.311px] max-h-[244.522px] shrink-0'/>
      </div>
      <div className='p-5 flex flex-col gap-y-2'>
        <div className=' flex justify-between'>
            <div className='text-black text-[10px] not-italic font-normal leading-[normal]'>Wedding Photographer</div>
            <div className='text-neutral-700 text-[10px] not-italic font-medium leading-[normal]'>Lucknow, UP</div>
        </div>
        <div className='text-black not-italic font-semibold leading-[normal]'>
            {name}
        </div>
        <div>
            <button className='text-neutral-700 p-1 m-1 text-[10px] not-italic font-light leading-[normal] bg-[#F8F7FA]'>Photography</button>
            <button className='text-neutral-700 p-1 m-1 text-[10px] not-italic font-light leading-[normal] bg-[#F8F7FA]'>Pre-Wedding</button>
            <button className='text-neutral-700 p-1 m-1 text-[10px] not-italic font-light leading-[normal] bg-[#F8F7FA]'>Videography</button>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
