import React from "react";
import { LuUserSquare2 } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
const SideNavBar = () => {
  return (
    <div className="fixed w-1/6 h-[90%] max-w-80 flex flex-col p-6 bg-white ">
      <div className="flex-grow  space-y-8">
        <div className=" flex justify-start text-white items-start gap-2 px-6 py-2 shrink-0 rounded-lg bg-[#5932EA]">
          <LuUserSquare2 className=" w-5 h-5" />
          <p className="  text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            User Management
          </p>
        </div>
        <div className="text-[#9197B3] flex justify-start cursor-pointer items-center gap-2 px-6 py-2 shrink-0 rounded-lg ">
          <MdOutlinePayment />
          <p className=" text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            Income/payments
          </p>
        </div>
        <div className="text-[#9197B3] flex justify-start cursor-pointer items-center gap-2 px-6 py-2 shrink-0 rounded-lg ">
          <TbSettings2 />
          <p className=" text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            Admin Management
          </p>
        </div>
        <div className="text-[#9197B3] flex justify-start cursor-pointer items-center gap-2 px-6 py-2 shrink-0 rounded-lg ">
          <TbSettings2 />
          <p className=" text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            Setting
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-8  items-start ">
        <div className="flex justify-center items-center cursor-pointer gap-2">
          <div>
            <FaRegCircleUser className=" w-8 h-8" />
          </div>
          <div className="">
            <p className="text-black text-sm not-italic font-normal leading-[normal] tracking-[0.14px]">
              Admin
            </p>
            <p className="text-[#757575] text-xs not-italic font-normal leading-[normal] tracking-[0.12px]">
              Project Manager
            </p>
          </div>
        </div>
        <div className="flex text-[#E53935] justify-center items-center cursor-pointer gap-2">
          <CiLogout />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
