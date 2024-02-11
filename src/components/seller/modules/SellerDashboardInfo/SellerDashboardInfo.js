import Image from "next/image";
import React from "react";

const SellerDashboardInfo = ({ img, title, desc, btn }) => {
  return (
    <div className="flex flex-col justify-between w-full  p-4  h-96">
      <div className="space-y-6">
        <Image src={img} className="w-[70px] h-[70px]" alt="" />
        <h1 className=" font-bold text-gray-700">{title}</h1>
        <p className=" text-sm text-gray-500">{desc}</p>
      </div>
      <div>
        <button className=" border border-blue-500 text-blue-600 w-full p-2 rounded text-sm font-semibold">
          {btn}
        </button>
      </div>
    </div>
  );
};

export default SellerDashboardInfo;
