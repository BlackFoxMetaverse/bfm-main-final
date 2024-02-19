"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/dark_logo.svg";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { LuBellDot } from "react-icons/lu";
import { FaAngleDown, FaAnglesDown } from "react-icons/fa6";
import Location from "@/components/DeviceLocation/location";
import instance from "@/utils/axios";

const Header = ({ isSeller }) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;

  const [userLocation, setUserLocation] = useState(null);
  const [isBusiness, setisBusiness] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.get("/user/user", {
        headers: {
          token: token,
        },
      });
      if (res?.status === 200) {
        console.log(res.data?.data);
        setIsLogin(true);
        setUserData(res.data.data);
      } else if (res?.status === 401) {
        setIsLogin(false);
      } else {
        setIsLogin(false);
        throw new Error("Something went wrong!!");
      }
    } catch (error) {
      return error?.message;
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <main
      className={`flex flex-col justify-end items-center top-0 w-full fixed z-50`}
    >
      <Location onLocationChange={handleLocationChange} />
      <div className="mx-auto w-full max-w-[1920px] flex items-center justify-between py-4 rounded-b-xl bg-white px-12 shadow-md ">
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
          {isSeller && isLogin && userData?.isSeller && (
            <div className="pr-[32px] justify-start items-center gap-[4.5rem] inline-flex">
              <button
                type="button"
                className="text-neutral-600 text-xl font-bold"
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => setisBusiness(!isBusiness)}
                className="pr-[21px] py-[2.50px] justify-start items-start gap-3 inline-flex relative"
              >
                <div className="text-neutral-600 text-xl font-bold">
                  My Business
                </div>
                <div
                  className={`w-6 ${
                    isBusiness ? "rotate-180" : "rotate-0"
                  } transition-all ease-in-out duration-500 self-stretch justify-center items-center inline-flex`}
                >
                  <FaAngleDown className="w-6 h-6" />
                </div>
                <div
                  className={`absolute inset-x-0 top-full bg-gray-800/95 p-5 rounded-2xl space-y-4 ${
                    isBusiness ? "translate-y-0 z-0" : "-translate-y-full -z-30"
                  } transition-all duration-150`}
                >
                  <p className="text-white text-2xl font-bold font-['Neue Helvetica']">
                    Orders
                  </p>
                  <p className="text-white text-2xl font-bold font-['Neue Helvetica']">
                    Earnings
                  </p>
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center h-full lg:gap-[30px] gap-[11px]">
          {!isSeller && (
            <button
              onClick={() => userData?.isSeller ? router.push("/seller/dashboard") : router.push("/seller")}
              className="text-[color:var(--Foundation-Green-green-400,#58975B)] text-xl not-italic font-medium leading-[100%] tracking-[-1px]"
            >
              Become a Seller
            </button>
          )}
          {isLogin ? (
            <div className="flex items-center h-full lg:gap-[30px] gap-[11px]">
              <button>
                <LuBellDot className="lg:text-2xl text-2xl" />
              </button>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() =>
                    isSeller ? "" : router.push("/client/settings")
                  }
                  className="w-12 h-12 rounded-full flex justify-center items-center overflow-hidden"
                >
                  <img
                    src={s3Url + userData?.image}
                    alt={userData?.image}
                    className="w-full h-full object-cover"
                  />
                </button>
                {/* <FaAngleDown /> */}
              </div>
            </div>
          ) : (
            <div className="flex items-center h-full lg:gap-[30px] gap-[11px]">
              <button
                onClick={() => {
                  isSeller
                    ? router.replace("/auth/login")
                    : router.replace("/client/auth/login");
                }}
                className="flex bg-[#282828] h-full items-center gap-2.5 lg:px-[23px] lg:py-[7px] px-[11.754px] py-[3.577px] rounded-[34px] text-white lg:text-xl text-[10.22px] not-italic font-normal leading-[normal]"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  isSeller
                    ? router.replace("/auth/login")
                    : router.replace("/client/auth/login");
                }}
                className="lg:flex hidden h-full items-center gap-2.5 px-[23px] py-[7px] rounded-[34px] text-black text-xl not-italic font-normal leading-[normal]"
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Header;
