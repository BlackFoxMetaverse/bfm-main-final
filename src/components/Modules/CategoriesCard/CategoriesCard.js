import Image from "next/image";
import React from "react";
import suggestionImage from "@/assets/suggestionImage3.png";
const CategoriesCard = ({
  id,
 name,
  mainImage
}) => {
  return (
    <div className="relative">
      <div className="w-[306px] relative shrink-0 rounded-xl">
        <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
        <Image src={mainImage} className="w-[306px] h-[172px]" alt="" />
      </div>
      <div className="text-white absolute inset-0 flex w-full h-full justify-center items-center text-[26px] not-italic font-medium leading-[22.012px] ">{name}</div>
    </div>
  );
};

export default CategoriesCard;
