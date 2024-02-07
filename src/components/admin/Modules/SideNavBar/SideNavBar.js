"use client";

import React, { useEffect, useState } from "react";
import { LuUserSquare2 } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import instance from "@/utils/axios";
const SideNavBar = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setToken(localStorage.getItem("bfm-admin-token"));
      const response = await instance.get("/super_user/login", {
        headers: {
          token: token,
        },
      });

      const status = response.status;

      console.log(status);
    };

    fetchData();
  }, []);

  console.log(token);

  return (
    <div className="fixed w-1/6 h-[90%] max-w-80 flex flex-col p-6 bg-white ">
      <div className="flex-grow  space-y-8">
        <Link
          href={"/admin/user"}
          className=" flex justify-start text-white items-start gap-2 px-6 py-2 shrink-0 rounded-lg bg-[#5932EA]"
        >
          <LuUserSquare2 className=" w-5 h-5" />
          <p className="  text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            User Management
          </p>
        </Link>
        <Link
          href={"/admin/seller"}
          className=" flex justify-start text-[#9197B3] items-start gap-2 px-6 py-2 shrink-0 rounded-lg "
        >
          <LuUserSquare2 className=" w-5 h-5" />
          <p className="  text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            Seller Data
          </p>
        </Link>
        <Link
          href={"/admin/client"}
          className=" flex justify-start text-[#9197B3] items-start gap-2 px-6 py-2 shrink-0 rounded-lg "
        >
          <LuUserSquare2 className=" w-5 h-5" />
          <p className="  text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            Client data
          </p>
        </Link>
        <Link
          href={"/admin/income_payment"}
          className="text-[#9197B3] flex justify-start cursor-pointer items-center gap-2 px-6 py-2 shrink-0 rounded-lg "
        >
          <MdOutlinePayment />
          <p className=" text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            Income/payments
          </p>
        </Link>
        <Link
          href={"/admin/admin-management"}
          className="text-[#9197B3] flex justify-start cursor-pointer items-center gap-2 px-6 py-2 shrink-0 rounded-lg "
        >
          <TbSettings2 />
          <p className=" text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            Admin Management
          </p>
        </Link>
        <Link
          href={"/admin"}
          className="text-[#9197B3] flex justify-start cursor-pointer items-center gap-2 px-6 py-2 shrink-0 rounded-lg "
        >
          <TbSettings2 />
          <p className=" text-sm not-italic font-medium leading-[normal] tracking-[-0.14px]">
            Setting
          </p>
        </Link>
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
