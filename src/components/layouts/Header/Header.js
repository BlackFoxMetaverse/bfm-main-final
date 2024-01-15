"use client";

import { usePathname } from "next/navigation";
import React from "react";
import logo from "../../../assets/dark_logo.svg";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { LuBellDot } from "react-icons/lu";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  return (
    <main
      className={`flex flex-col justify-end items-center lg:pt-[57px] pt-[38.5px] pb-[1.113px] px-0 w-full`}
    >
      <div className="mx-auto w-11/12 flex items-center justify-between">
        <div className="flex items-center lg:gap-[25px] gap-0.5">
          <Image
            src={logo}
            alt=""
            className="w-[52.443px] h-[16.492px] lg:w-[77.515px] lg:h-[24.376px]"
          />
          <div className="flex justify-center items-center  focus:outline-none lg:gap-[8.04px] gap-[5.44px] p-[5.439px] lg:p-[8.04px]">
            <HiLocationMarker className="lg:text-2xl text-sm text-[#4461F2]" />
            <select
              name=""
              id=""
              className="text-black lg:text-[20.904px] text-[9.999px] not-italic font-medium leading-[17.697px]"
            >
              <option value="New Delhi">New Delhi, India</option>
              <option value="Jaipur">Jaipur, India</option>
            </select>
          </div>
        </div>
        <form
          action="search"
          className="max-w-[523px] w-full bg-black/20 py-3 px-5 lg:flex hidden justify-center items-center shrink-0 rounded-[37px]"
        >
          <label
            htmlFor="tags"
            className="w-full flex justify-center items-center gap-5"
          >
            <BsSearch className="text-xl" />
            <input
              type="text"
              name="tags"
              id="tags"
              className="w-full bg-transparent text-[15.969px] not-italic font-normal leading-[normal] focus:outline-none"
              placeholder="Search Tags"
            />
          </label>
          <button type="submit" className="hidden"></button>
        </form>
        <div className="flex items-center h-full lg:gap-[30px] gap-[11px]">
          <button>
            <LuBellDot className="lg:text-3xl text-2xl" />
          </button>
          <Link
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
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Header;
