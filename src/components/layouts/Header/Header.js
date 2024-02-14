"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import logo from "../../../assets/dark_logo.svg";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { LuBellDot } from "react-icons/lu";
import Link from "next/link";
import Avatar from "../../../assets/avatar.svg";
import { FaAngleDown } from "react-icons/fa6";
import Location from "@/components/DeviceLocation/location";

const Header = ({ isSeller }) => {
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  console.log(userLocation);

  return (
    <main
      className={`flex flex-col justify-end items-center top-0 w-full fixed z-50 `}
    >
      <Location onLocationChange={handleLocationChange} />
      <div className="mx-auto w-full max-w-[1920px] flex items-center justify-between rounded-b-xl bg-white px-12 py-1 shadow-md ">
        <div className="flex items-center lg:gap-[65px] gap-0.5">
          <Image
            src={logo}
            alt=""
            className="w-[52.443px] h-[16.492px] lg:w-[87.515px] lg:h-[34.376px]"
          />
          {/* <div  className="flex justify-center items-center rounded-full text-xs focus:outline-none text-[#784DC7] bg-[#E9DFFC] lg:gap-[2.04px] gap-[5.44px] p-[5.439px] lg:px-[8px]">
            <HiLocationMarker className="lg:text-xl text-xs text-[#784DC7]" />
            New Delhi,India
          </div> */}
        </div>

        <div className="flex items-center h-full lg:gap-[30px] gap-[11px]">
          {!isSeller && (
            <buttom className="text-[color:var(--Foundation-Green-green-400,#58975B)] text-xl not-italic font-medium leading-[100%] tracking-[-1px]">
              Become a Seller
            </buttom>
          )}
          <button>
            <LuBellDot className="lg:text-2xl text-2xl" />
          </button>
          <div className="flex items-center justify-center">
            <div className=" w-12 h-12 rounded-full flex">
              <Image src={Avatar} alt="" />
            </div>
            <FaAngleDown />
          </div>
          {/* <Link
            href={"/auth/register"}
            className="flex bg-[#282828] h-full items-center gap-2.5 lg:px-[23px] lg:py-[7px] px-[11.754px] py-[3.577px] rounded-[34px] text-white lg:text-xl text-[10.22px] not-italic font-normal leading-[normal]"
          >
            Sign Up
          </Link>
          <Link
            href={"/auth/login"}
            className="lg:flex hidden h-full items-center gap-2.5 px-[23px] py-[7px] rounded-[34px] text-black text-xl not-italic font-normal leading-[normal]"
          >
            Log In
          </Link> */}
        </div>
      </div>
    </main>
  );
};

export default Header;
