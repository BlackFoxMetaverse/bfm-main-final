"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/logos/white_fox.svg";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { LuBellDot } from "react-icons/lu";
import { FaAngleDown, FaAnglesDown } from "react-icons/fa6";
import Location from "@/components/DeviceLocation/location";
import instance from "@/utils/axios";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";

const Header = ({ isSeller }) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;

  const pathname = usePathname();
  const [isScrolling, setScrolling] = useState(false);
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

  useEffect(() => {
    const scrolling = () => {
      if (window.scrollY >= 69) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", scrolling);

    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, [isScrolling]);

  return (
    <main
      className={`flex flex-col justify-end items-center top-0 w-full fixed z-50 transition-all duration-500 ease-in-out ${
        pathname.startsWith("/client/username") ||
        pathname.startsWith("/client/settings")
          ? "bg-black"
          : isScrolling
          ? "bg-black"
          : "bg-transparent"
      }`}
    >
      <Location onLocationChange={handleLocationChange} />
      <div
        className={`mx-auto w-11/12 max-w-[1920px] h-[5rem] flex items-center justify-between rounded-b-xl`}
      >
        <div className="flex items-center lg:gap-[3.6rem] gap-0.5">
          <Link
            href={"/"}
            className="w-[99px] h-[30px] relative flex-col justify-start items-start inline-flex"
          >
            <Image
              src={logo}
              alt=""
              className="w-[52.443px] h-[16.492px] lg:w-[87.515px] lg:h-[34.376px]"
            />
          </Link>
          {userLocation !== null && (
            <div className="max-w-[181.33px] h-8 pl-2 pr-[10.67px] py-[5.33px] text-white text-sm font-normal leading-[14px] rounded-2xl justify-center items-center gap-[2.67px] flex">
              <div className="w-6 h-6 justify-center items-center flex">
                <IoLocationOutline className="text-base" />
              </div>
              <div className="text-white text-sm font-normal leading-[14px]">
                New Delhi, India
              </div>
            </div>
          )}
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
              onClick={() =>
                userData?.isSeller
                  ? router.push("/seller/dashboard")
                  : router.push("/seller")
              }
              className="text-white text-[19px] font-bold font-['Helvetica Neue'] leading-[12.80px]"
            >
              Become a Seller
            </button>
          )}
          <button></button>
          {isLogin ? (
            <div className="flex items-center h-full lg:gap-[30px] gap-[11px]">
              <LuBellDot className="lg:text-2xl text-2xl text-white" />
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
            <button
              type="button"
              onClick={() => router.push("/client/auth/login")}
              className="w-[94px] h-[48.98px] px-7 pt-[10.49px] pb-[10.48px] rounded border border-white justify-center items-center inline-flex"
            >
              <p className="text-white text-lg font-bold font-['Helvetica Neue'] leading-7">
                Join
              </p>
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Header;
