import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
const UserCount = ({ title, number, percent, day, color }) => {
  return (
    <div className="w-[24%] hover:shawod hover:shadow-gray-500 shrink-0 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] flex  gap-2 px-8 py-4 bg-white rounded-[20px]">
      <div className="w-full space-y-1">
        <div>
          <p className="text-[#111] text-sm not-italic font-semibold leading-[50px] tracking-[0.28px] uppercase">
            {title}
          </p>
        </div>
        <div>
          <p
            style={{ color: color }}
            className={`text-2xl not-italic font-bold leading-[normal]`}
          >
            {number}
          </p>
        </div>
        <div>
          <div
            style={{ backgroundColor: color }}
            className={`w-full p-0.5  shrink-0 rounded-[var(--numberLength,0px)]`}
          ></div>
          <p className="text-[#333] text-sm not-italic font-bold leading-[normal] uppercase">
            {" "}
            {percent}
          </p>
        </div>
        <p className="text-[#666] text-xs not-italic font-normal leading-5">
          {day}
        </p>
      </div>
      <div className="">
        <HiOutlineDotsVertical />
      </div>
    </div>
  );
};

export default UserCount;
