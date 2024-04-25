"use client";

import React, { useEffect, useState } from "react";
import { LuUserSquare2 } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import axios from "@/utils/axios";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { usePathname, useRouter } from "next/navigation";
const SideNavBar = () => {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("bfm-admin-token");

    const fetchData = async () => {
      const response = await axios.get("/super_user/login", {
        headers: {
          token: token,
        },
      });

      if (response.status === 401) {
        router.replace("/admin/auth/login");
      }
      setUserData(response);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("bfm-admin-token");
      router.replace("/admin/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="fixed w-1/6 h-[90%] max-w-80 mt-16 flex flex-col p-6 bg-white ">
      <div className="flex-grow  space-y-8">
        {userData?.data?.data?.super_user?.role === 2101 ||
        userData?.data?.data?.super_user?.role === 2001 ||
        userData?.data?.data?.super_user?.role === 2151 ? (
          <div className="w-full space-y-8">
            <Link
              href={"/admin/user"}
              className={`flex justify-start items-start gap-2 px-6 py-2 shrink-0 rounded-lg ${
                pathname === "/admin/user"
                  ? "bg-[#5932EA] text-white"
                  : "bg-transparent text-[#9197B3]"
              }`}
            >
              <LuUserSquare2 className=" w-5 h-5" />
              <p className="text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
                User Management
              </p>
            </Link>
            <Link
              href={"/admin/seller"}
              className={`flex justify-start text-[#9197B3] items-start gap-2 px-6 py-2 shrink-0 rounded-lg ${
                pathname === "/admin/seller"
                  ? "bg-[#5932EA] text-white"
                  : "bg-transparent text-[#9197B3]"
              }`}
            >
              <LuUserSquare2 className=" w-5 h-5" />
              <p className="text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
                Seller Data
              </p>
            </Link>
            <Link
              href={"/admin/client"}
              className={`flex justify-start text-[#9197B3] items-start gap-2 px-6 py-2 shrink-0 rounded-lg ${
                pathname === "/admin/client"
                  ? "bg-[#5932EA] text-white"
                  : "bg-transparent text-[#9197B3]"
              }`}
            >
              <LuUserSquare2 className=" w-5 h-5" />
              <p className="text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
                Client data
              </p>
            </Link>
            <Link
              href={"/admin/income_payment"}
              className={`text-[#9197B3] flex justify-start cursor-pointer items-center gap-2 px-6 py-2 shrink-0 rounded-lg ${
                pathname === "/admin/income_payment"
                  ? "bg-[#5932EA] text-white"
                  : "bg-transparent text-[#9197B3]"
              }`}
            >
              <MdOutlinePayment />
              <p className="text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
                Income/payments
              </p>
            </Link>
            <Link
              href={"/admin"}
              className={`text-[#9197B3] flex justify-start cursor-pointer items-center gap-2 px-6 py-2 shrink-0 rounded-lg ${
                pathname === "/admin"
                  ? "bg-[#5932EA] text-white"
                  : "bg-transparent text-[#9197B3]"
              }`}
            >
              <TbSettings2 />
              <p className="text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
                Setting
              </p>
            </Link>
          </div>
        ) : (
          <div>Nothing For You!</div>
        )}
        {userData?.data?.data?.super_user?.role === 2001 && (
          <Link
            href={"/admin/admin-management"}
            className={`text-[#9197B3] flex justify-start cursor-pointer items-center gap-2 px-6 py-2 shrink-0 rounded-lg ${
              pathname === "/admin/admin-management"
                ? "bg-[#5932EA] text-white"
                : "bg-transparent text-[#9197B3]"
            }`}
          >
            <TbSettings2 />
            <p className="text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
              Admin Management
            </p>
          </Link>
        )}
      </div>
      <div className="flex flex-col space-y-8  items-start ">
        <div className="flex justify-center items-center cursor-pointer gap-2">
          <div>
            <FaRegCircleUser className=" w-8 h-8" />
          </div>
          <div className="">
            <p className="text-black text-sm not-italic font-normal leading-[normal] tracking-[0.14px] capitalize">
              {userData?.data?.super_user?.name
                ? userData?.data?.super_user?.name
                : userData?.data?.data?.super_user?.name}
            </p>
            <p className="text-[#757575] text-xs not-italic font-normal leading-[normal] tracking-[0.12px] capitalize">
              {userData?.data?.data?.super_user?.role === 2001
                ? "Super Admin"
                : userData?.data?.data?.super_user?.role === 2101
                ? "Admin"
                : userData?.data?.data?.super_user?.role === 2151
                ? "Sub Admin"
                : "Not Authorized"}
            </p>
          </div>
        </div>
        {/* <button
          onClick={()=>handleLogout}
          className="flex text-[#E53935] justify-center items-center cursor-pointer gap-2"
        >
          <CiLogout />
          <p>Logout</p>
        </button> */}
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
};

export default SideNavBar;
