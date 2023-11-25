import Image from 'next/image'
import React from 'react'

const SuggestionCard = ({id,avater,mainImage,userName,description,sideImage1,sideImage2,sideImage3}) => {
  return (
    <div>
      {/* <div className="grid  md:grid-cols-2  grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pt-8 my-10"> */}
          
            <div key={id}>
              <div className="block p-2 w-[300px] md:p-4 text-start justify-start bg-[#1B1B1B]  rounded-lg shadow dark:border-gray-700 ">
                <div className="flex gap-2 hover:cursor-pointer text-start justify-start mb-4">
                  <div className="relative">
                    <Image src={avater} className="w-10 h-10" alt="" />
                    <span className="absolute bottom-2 md:bottom-0 right-0">
                      <svg className="md:w-6 md:h-6 w-4 h-4 " viewBox="0 0 24 24" fill="none" xmlns="http:www.w3.org/2000/svg">
                        <path
                          d="M10.7528 2.45031C11.4428 1.86031 12.5728 1.86031 13.2728 2.45031L14.8528 3.81031C15.1528 4.07031 15.7128 4.28031 16.1128 4.28031H17.8128C18.8728 4.28031 19.7428 5.15031 19.7428 6.21031V7.91031C19.7428 8.30031 19.9528 8.87031 20.2128 9.17031L21.5728 10.7503C22.1628 11.4403 22.1628 12.5703 21.5728 13.2703L20.2128 14.8503C19.9528 15.1503 19.7428 15.7103 19.7428 16.1103V17.8103C19.7428 18.8703 18.8728 19.7403 17.8128 19.7403H16.1128C15.7228 19.7403 15.1528 19.9503 14.8528 20.2103L13.2728 21.5703C12.5828 22.1603 11.4528 22.1603 10.7528 21.5703L9.17281 20.2103C8.87281 19.9503 8.31281 19.7403 7.91281 19.7403H6.18281C5.12281 19.7403 4.25281 18.8703 4.25281 17.8103V16.1003C4.25281 15.7103 4.04281 15.1503 3.79281 14.8503L2.44281 13.2603C1.86281 12.5703 1.86281 11.4503 2.44281 10.7603L3.79281 9.17031C4.04281 8.87031 4.25281 8.31031 4.25281 7.92031V6.20031C4.25281 5.14031 5.12281 4.27031 6.18281 4.27031H7.91281C8.30281 4.27031 8.87281 4.06031 9.17281 3.80031L10.7528 2.45031Z"
                          fill="#408CFF"
                        />
                        <path
                          d="M8.38281 11.9981L10.7928 14.4181L15.6228 9.57812"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-white md:text-base text-xs text-start p-0 m-0 font-semibold">{userName}</p>
                    <span className="text-[#65676B] md:text-base text-[10px]">{description}</span>
                  </div>
                </div>
                <div className=" overflow-hidden grid grid-cols-5 w-full  lg:h-[284px] gap-2">
                  <div className="col-span-3 rounded-lg overflow-hidden">
                    <Image className="max-w-[150.886px]  " src={mainImage} alt="" />
                  </div>
                  <div className="col-span-2 overflow-hidden w-full">
                    <Image className="mb-3 max-h-[121.937px] max-w-[121.937px] " src={sideImage1} alt="" />
                    <Image className="mb-3 max-h-[121.937px] max-w-[121.937px] " src={sideImage2} alt="" />
                    <Image className="mb-3 max-h-[121.937px] max-w-[121.937px]" src={sideImage3} alt="" />
                  </div>
                </div>
              </div>
            </div>
          
        </div>
    // </div>
  )
}

export default SuggestionCard
