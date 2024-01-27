import React from "react";
import Logo from "../../../../assets/light_logo.svg";
import Image from "next/image";
import { MdOutlineMessage } from "react-icons/md";
import { AiFillBell } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
const Header = () => {
  return (
    <div className=" w-full flex shrink-0 fill-white bg-white justify-center items-center sticky inset-x-0 top-0">
      <div className="bg-black px-20 max-w-80 w-1/6 py-4">
        <Image src={Logo} className=" w-28 shrink-0 fill-white" alt=" " />
      </div>
      <div className=" flex items-center flex-1 justify-between px-4">
        <div>
          <h1 className="text-black text-2xl not-italic font-bold leading-[normal]">
            Dashboard
          </h1>
        </div>
        <div className="flex gap-2 items-center ">
          <MdOutlineMessage className="w-8 h-6 text-gray-500" />
          <AiFillBell className="w-8 h-6 text-gray-500" />
          <div className="flex items-center gap-1">
            <FaUserCircle className=" w-10 h-8 text-gray-500" />
            <p className="font-semibold text-gray-500">Admin name</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
