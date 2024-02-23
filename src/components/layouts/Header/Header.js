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
import { IoLocationOutline, IoLogOutOutline } from "react-icons/io5";
import Link from "next/link";

const UserProfile = ({ name, profilePic }) => {
  const [options, setOptions] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOptions(!options)}
      className="flex gap-2.5 justify-between items-center text-base leading-6 text-white relative"
    >
      <div className="grow font-bold  justify-center px-3 py-2.5 italic rounded tracking-wide border border-solid border-black border-opacity-10">
        {name}
      </div>
      {/* <img src={profilePic} alt={name} className="my-auto w-6 aspect-square" /> */}
      <FaAngleDown
        className={`${
          options ? "rotate-180" : "rotate-0"
        } transition-all duration-300 ease-in-out`}
      />
      <div
        className={`min-h-[175px] bg-white flex flex-col rounded absolute inset-x-0 ${
          options ? "top-full translate-y-3" : "-top-full scale-y-0"
        } stroke-black py-3 transition-all duration-300 ease-in-out transform gap-2`}
      >
        <div className="flex-grow flex flex-col w-11/12 mx-auto gap-2 justify-around items-end">
          <Link
            href={"/client/settings"}
            className="text-neutral-700 text-lg font-medium leading-normal"
          >
            Account
          </Link>
          <Link
            href={"/client/settings"}
            className="text-neutral-700 text-lg font-medium leading-normal"
          >
            Security
          </Link>
          <Link
            href={"/client/settings"}
            className="text-neutral-700 text-lg font-medium leading-normal"
          >
            Notification
          </Link>
          <Link
            href={"/client/settings"}
            className="text-neutral-700 text-lg font-medium leading-normal"
          >
            Purchase History
          </Link>
        </div>
        <div className="h-[0px] w-11/12 mx-auto border border-black"></div>
        <button
          type="button"
          className="justify-end mt-2 w-11/12 mx-auto text-red-500 text-base font-bold leading-normal items-center gap-[5px] inline-flex"
        >
          <p className="">LogOut</p>
          <IoLogOutOutline className="text-2xl" />
        </button>
      </div>
    </button>
  );
};

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
            <div className="max-w-[181.33px] h-8 pl-2 pr-[10.67px] py-[5.33px] text-white 3xl:text-lg md:text-base text-sm font-normal leading-[14px] rounded-2xl justify-center items-center gap-[2.67px] flex">
              <div className="w-6 h-6 justify-center items-center flex">
                <IoLocationOutline className="text-lg" />
              </div>
              <div className="text-white 3xl:text-lg md:text-base text-sm font-normal leading-[14px]">
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

        <div className="flex items-center h-full lg:gap-4 gap-2">
          {!isSeller && (
            <button
              onClick={() =>
                userData?.isSeller
                  ? router.push("/seller/dashboard")
                  : router.push("/seller")
              }
              className="bg-white rounded p-4 text-[19px] font-bold leading-[12.80px]"
            >
              Become a Seller
            </button>
          )}
          <button></button>
          {!isLogin ? (
            <div className="flex items-center h-full lg:gap-[30px] gap-[11px]">
              {/* <LuBellDot className="lg:text-2xl text-2xl text-white" /> */}
              <button
                type="button"
                className="w-[111px] h-[42px] pl-4 pr-[17px] py-[9px] rounded border border-white justify-center items-center inline-flex"
              >
                <div className="text-white text-base font-bold leading-normal">
                  50 Credits
                </div>
              </button>
              <UserProfile
                name="Raunak Pandey"
                // profilePic="https://cdn.builder.io/api/v1/image/assets/TEMP/b40893da2d2985cab402b6187995d6337f22d16c17fa7b41c35520d134cff622?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/client/auth/login")}
              className="w-[94px] h-[48.98px] px-7 pt-[10.49px] pb-[10.48px] rounded border border-white justify-center items-center inline-flex"
            >
              <p className="text-white text-lg font-bold leading-7">Join</p>
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Header;
