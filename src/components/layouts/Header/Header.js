"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import logo from "../../../../public/logos/white_fox.svg";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import instance from "@/utils/axios";
import {
  IoLocationOutline,
  IoLogOutOutline,
  IoNotificationsSharp,
} from "react-icons/io5";
import Link from "next/link";
import AuthModal from "./auth/AuthModal";
import Notification from "@/components/Modules/Notification/Notification";
import { getUserPreciseLocation } from "@/utils/location";
import getCity from "@/utils/getCity";

const UserProfile = ({
  name,
  profession,
  userName,
  uid,
  isSeller,
  onClick,
}) => {
  const [options, setOptions] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      onClick={() => {
        setOptions(!options);
        onClick();
      }}
      className="flex gap-2.5 cursor-pointer justify-between items-center w-full text-base leading-6 sm:p-0 py-32 text-white relative"
    >
      <p className="grow font-bold justify-end px-3 py-2.5 italic rounded whitespace-nowrap tracking-wide border border-solid border-black border-opacity-10">
        <span>{name ? name : "Raunak Pandey"}</span>
        <span className="font-light">{profession}</span>
      </p>
      <FaAngleDown
        className={`${
          options ? "rotate-180" : "rotate-0"
        } transition-all duration-300 sm:block hidden ease-in-out`}
      />
      <div
        className={`min-h-[175px] sm:bg-white flex flex-col rounded absolute w-full ${
          options
            ? "sm:top-full top-2/3 sm:translate-y-3"
            : "sm:-top-full top-2/3 sm:scale-y-0 sm:-translate-y-3"
        } stroke-black py-3 sm:min-w-40 transition-all duration-300 ease-in-out transform gap-2`}
      >
        <p className="flex-grow flex flex-col w-11/12 mx-auto gap-2 justify-around items-start">
          {isSeller && (
            <Link
              href={`/seller/dashboard/${userName ? userName : name}/${uid}`}
              className="sm:text-neutral-700 text-white text-lg font-medium leading-normal"
            >
              View Profile
            </Link>
          )}
          <Link
            href={"/client/settings?setting=account"}
            className="sm:text-neutral-700 text-white text-lg font-medium leading-normal"
          >
            My Account
          </Link>
          <Link
            href={"/client/settings?setting=security"}
            className="sm:text-neutral-700 text-white text-lg font-medium leading-normal"
          >
            Security
          </Link>
          <Link
            href={"/client/settings?setting=notification"}
            className="sm:text-neutral-700 text-white text-lg font-medium leading-normal"
          >
            Notification
          </Link>
          <Link
            href={"/client/settings?setting=purchase_history"}
            className="sm:text-neutral-700 text-white text-lg whitespace-nowrap font-medium leading-normal"
          >
            Purchase History
          </Link>
        </p>
        <div className="h-[0px] w-11/12 mx-auto border border-black"></div>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("bfm-client-token");
            if (
              pathname === "/seller/form" ||
              pathname.startsWith("/seller/dashboard")
            ) {
              router.push("/");
            } else {
              window.location.reload();
            }
          }}
          className="mt-2 w-11/12 mx-auto text-red-500 text-base font-bold leading-normal items-center gap-[5px] inline-flex"
        >
          <p className="">LogOut</p>
          <IoLogOutOutline className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

const Header = ({ isSeller }) => {
  const pathname = usePathname();
  const [isScrolling, setScrolling] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLogingin, setIsLogingin] = useState(false);
  const [isregistering, setIsRegistering] = useState(false);
  const [showMenu, setMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [address, setAddress] = useState("");
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("bfm-client-token"));
  });

  const getAddress = useCallback(() => {
    setAddress(sessionStorage.getItem("address"));
  });

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    const handleLocationChange = async () => {
      const location = await getUserPreciseLocation();
      setUserLocation(location);
    };
    handleLocationChange();
  }, []);

  async function fetchUserData() {
    try {
      const res = await instance.get("/main/user", {
        headers: {
          token: token,
        },
      });
      if (res?.status === 200) {
        setIsLogin(true);
        setUserData(res.data.data);
      } else if (res?.status === 401) {
        setIsLogin(false);
        router.push("/");
      } else {
        setIsLogin(false);
        router.push("/");
      }
    } catch (error) {
      return error?.response?.data;
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const getRequests = async () => {
    try {
      const response = await instance.get("main/request", {
        headers: {
          token: token,
        },
      });
      setNotification([...notification, response?.data?.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, [token]);

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
        pathname.startsWith("/client/slug") ||
        pathname.startsWith("/client/settings") ||
        pathname.startsWith("/contact-us") ||
        pathname.startsWith("/terms-and-conditions") ||
        pathname.startsWith("/privacy-policy") ||
        pathname.startsWith("/help-center") ||
        pathname.startsWith("/seller")
          ? "bg-black"
          : isScrolling
          ? "bg-black"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto w-11/12 max-w-[1920px] h-[5rem] flex items-center justify-between rounded-b-xl`}
      >
        <div className="flex items-center gap-2.5">
          <Link
            href={"/"}
            className="w-[99px] h-[30px] relative flex-col justify-start items-start inline-flex"
          >
            <Image src={logo} alt="" className="w-[87.515px] h-[34.376px]" />
          </Link>
          {userLocation !== null && (
            <div className="max-w-[181.33px] h-8 pl-2 pr-[10.67px] py-[5.33px] text-white 3xl:text-lg md:text-base text-sm font-normal leading-[14px] rounded-2xl justify-center items-center gap-[2.67px] lg:flex hidden">
              <div className="w-6 h-6 justify-center items-center flex">
                <IoLocationOutline className="text-lg" />
              </div>
              <div className="text-white whitespace-nowrap 3xl:text-lg md:text-base text-sm font-normal leading-[14px]">
                {address}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center h-full gap-4">
          {!userData?.isSeller && !pathname.startsWith("/seller") && (
            <button
              onClick={() => router.push("/seller")}
              className="bg-white rounded px-3 aspect-[4/1] 2xl:text-[19px] text-base font-medium leading-[12.80px]"
            >
              Become a Seller
            </button>
          )}
          {isLogin ? (
            <div className="flex justify-center items-center">
              <button
                type="button"
                className={`sm:px-3 aspect-[2/1] rounded sm:border border-white flex items-center gap-3 justify-center`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2843_22566)">
                    <path
                      d="M10.6389 17.4594H16.283M11.9174 13.0939H6.27332M15.0044 13.0939H20.6486M10.6389 8.72831H16.283"
                      stroke="white"
                      stroke-width="1.54346"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.5523 5.45581C14.2629 5.74526 13.8703 5.90788 13.4609 5.90788C13.0516 5.90788 12.659 5.74526 12.3695 5.45581C12.0801 5.16635 11.9175 4.77377 11.9175 4.36442C11.9175 3.95507 12.0801 3.56248 12.3695 3.27303C12.659 2.98358 13.0516 2.82096 13.4609 2.82096C13.8703 2.82096 14.2629 2.98358 14.5523 3.27303C14.8418 3.56248 15.0044 3.95507 15.0044 4.36442C15.0044 4.77377 14.8418 5.16635 14.5523 5.45581ZM18.9179 9.82136C18.6284 10.1108 18.2358 10.2734 17.8265 10.2734C17.4171 10.2734 17.0246 10.1108 16.7351 9.82136C16.4456 9.53191 16.283 9.13932 16.283 8.72997C16.283 8.32062 16.4456 7.92804 16.7351 7.63859C17.0246 7.34913 17.4171 7.18652 17.8265 7.18652C18.2358 7.18652 18.6284 7.34913 18.9179 7.63859C19.2073 7.92804 19.37 8.32062 19.37 8.72997C19.37 9.13932 19.2073 9.53191 18.9179 9.82136ZM23.2834 14.1869C22.994 14.4764 22.6014 14.639 22.192 14.639C21.7827 14.639 21.3901 14.4764 21.1007 14.1869C20.8112 13.8975 20.6486 13.5049 20.6486 13.0955C20.6486 12.6862 20.8112 12.2936 21.1007 12.0041C21.3901 11.7147 21.7827 11.5521 22.192 11.5521C22.6014 11.5521 22.994 11.7147 23.2834 12.0041C23.5729 12.2936 23.7355 12.6862 23.7355 13.0955C23.7355 13.5049 23.5729 13.8975 23.2834 14.1869ZM18.9179 18.5525C18.6284 18.8419 18.2358 19.0045 17.8265 19.0045C17.4171 19.0045 17.0246 18.8419 16.7351 18.5525C16.4456 18.263 16.283 17.8704 16.283 17.4611C16.283 17.0517 16.4456 16.6592 16.7351 16.3697C17.0246 16.0802 17.4171 15.9176 17.8265 15.9176C18.2358 15.9176 18.6284 16.0802 18.9179 16.3697C19.2073 16.6592 19.3699 17.0517 19.3699 17.4611C19.3699 17.8704 19.2073 18.263 18.9179 18.5525ZM14.5523 22.918C14.2629 23.2075 13.8703 23.3701 13.4609 23.3701C13.0516 23.3701 12.659 23.2075 12.3695 22.918C12.0801 22.6286 11.9175 22.236 11.9175 21.8266C11.9175 21.4173 12.0801 21.0247 12.3695 20.7353C12.659 20.4458 13.0516 20.2832 13.4609 20.2832C13.8703 20.2832 14.2629 20.4458 14.5523 20.7353C14.8418 21.0247 15.0044 21.4173 15.0044 21.8266C15.0044 22.236 14.8418 22.6286 14.5523 22.918ZM10.1868 18.5525C9.89732 18.8419 9.50473 19.0045 9.09538 19.0045C8.68603 19.0045 8.29345 18.8419 8.00399 18.5525C7.71454 18.263 7.55193 17.8704 7.55193 17.4611C7.55193 17.0517 7.71454 16.6592 8.00399 16.3697C8.29345 16.0802 8.68603 15.9176 9.09538 15.9176C9.50473 15.9176 9.89732 16.0802 10.1868 16.3697C10.4762 16.6592 10.6388 17.0517 10.6388 17.4611C10.6388 17.8704 10.4762 18.263 10.1868 18.5525ZM5.82122 14.1869C5.53176 14.4764 5.13918 14.639 4.72983 14.639C4.32048 14.639 3.92789 14.4764 3.63844 14.1869C3.34898 13.8975 3.18637 13.5049 3.18637 13.0955C3.18637 12.6862 3.34898 12.2936 3.63844 12.0041C3.92789 11.7147 4.32048 11.5521 4.72983 11.5521C5.13918 11.5521 5.53176 11.7147 5.82122 12.0041C6.11067 12.2936 6.27328 12.6862 6.27328 13.0955C6.27328 13.5049 6.11067 13.8975 5.82122 14.1869ZM10.1868 9.82136C9.89732 10.1108 9.50473 10.2734 9.09538 10.2734C8.68603 10.2734 8.29345 10.1108 8.00399 9.82136C7.71454 9.53191 7.55192 9.13932 7.55192 8.72997C7.55192 8.32062 7.71454 7.92804 8.00399 7.63859C8.29345 7.34913 8.68603 7.18652 9.09538 7.18652C9.50473 7.18652 9.89732 7.34913 10.1868 7.63859C10.4762 7.92804 10.6388 8.32062 10.6388 8.72997C10.6388 9.13932 10.4762 9.53191 10.1868 9.82136ZM14.5523 14.1869C14.2629 14.4764 13.8703 14.639 13.4609 14.639C13.0516 14.639 12.659 14.4764 12.3695 14.1869C12.0801 13.8975 11.9175 13.5049 11.9175 13.0955C11.9175 12.6862 12.0801 12.2936 12.3695 12.0041C12.659 11.7147 13.0516 11.5521 13.4609 11.5521C13.8703 11.5521 14.2629 11.7147 14.5523 12.0041C14.8418 12.2936 15.0044 12.6862 15.0044 13.0955C15.0044 13.5049 14.8418 13.8975 14.5523 14.1869Z"
                      fill="white"
                      stroke="white"
                      stroke-width="1.54346"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2843_22566">
                      <rect
                        width="18.5215"
                        height="18.5215"
                        fill="white"
                        transform="translate(13.4609) rotate(45)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-white text-base font-bold leading-normal whitespace-nowrap">
                  {userData?.token ? userData?.token : 0}
                </p>
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowNotification(!showNotification)}
                  type="button"
                  className="mr-2 ml-3 text-white text-2xl"
                >
                  <IoNotificationsSharp />
                </button>
                {showNotification && (
                  <Notification notifications={notification} />
                )}
              </div>
              <button
                onClick={() => setMenu(!showMenu)}
                className={`flex sm:hidden flex-col h-6 w-8 justify-between gap-0.5 ml-5`}
              >
                <span
                  className={`w-full h-1 rounded-full bg-white ${
                    showMenu && "rotate-45 translate-y-[240%]"
                  } transition-all duration-500 ease-in-out`}
                ></span>
                <span
                  className={`w-full h-1 rounded-full bg-white ${
                    showMenu && "hidden"
                  }`}
                ></span>
                <span
                  className={`w-full h-1 rounded-full bg-white ${
                    showMenu && "-rotate-45 -translate-y-[240%]"
                  } transition-all duration-500 ease-in-out`}
                ></span>
              </button>
              <div
                className={`flex sm:flex-row flex-col sm:static fixed bg-black transition-all duration-500 ease-in-out transform ${
                  showMenu
                    ? "translate-y-1/3 sm:translate-y-0"
                    : "scale-y-0 sm:scale-y-100 translate-y-0 sm:translate-y-0"
                } sm:bg-transparent inset-x-0 sm:items-center items-end sm:z-0 -z-10 h-2/3 sm:p-0 p-10 sm:h-full lg:gap-[30px] gap-[11px]`}
              >
                <UserProfile onClick={() => setMenu(!showMenu)} {...userData} />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsLogingin(!isLogingin)}
              className="2xl:w-20 w-16 2xl:aspect-[2/1] 2xl:h-auto h-8 rounded border border-white justify-center items-center inline-flex"
            >
              <p className="text-white lg:text-lg font-bold leading-7">Join</p>
            </button>
          )}
        </div>
      </div>
      <AuthModal
        onClose={() => setIsLogingin(!isLogingin)}
        animation={isLogingin ? "translate-x-0" : "translate-x-full"}
        register={() => setIsRegistering(!isregistering)}
        isRegister={isregistering}
      />
    </main>
  );
};

export default Header;
