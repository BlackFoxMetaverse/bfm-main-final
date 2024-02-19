"use client";

import React, { useEffect, useState } from "react";
import Accounts from "../../modules/settings/Accounts";
import Notification from "../../modules/settings/Notification";
import PurchaseHistory from "../../modules/settings/PurchaseHistory";
import { FaRegUserCircle } from "react-icons/fa";
import { TbNotification } from "react-icons/tb";
import { LuWallet } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa6";
import instance from "@/utils/axios";

function Main() {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;

  const [currentSetting, setCurrentSetting] = useState("account");
  const [isClicked, setClicked] = useState(false);
  const [userData, setuserData] = useState(null);

  const handleSettingChange = (newSetting) => {
    setCurrentSetting(newSetting);
    setClicked(!isClicked);
  };

  async function getUserData() {
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.get("/user/user", {
        headers: {
          token: token,
        },
      });
      if (res?.status === 200) {
        setuserData(res?.data?.data);
      } else if (res?.status === 401) {
        setuserData("You need to Login");
      } else {
        throw new Error();
      }
      console.log(res.data);
    } catch (error) {
      console.log(error?.message);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  console.log(userData);

  return (
    <main className="[background:#F7F7F7] w-full max-w-[1920px] mx-auto">
      <div className="md:w-11/12 w-full mx-auto lg:py-24 py-20 flex relative justify-between items-start gap-12">
        <div
          className={`lg:w-1/3 w-full lg:static absolute inset-x-0 bottom-0 top-24 lg:bg-transparent bg-white lg:translate-x-0 lg:translate-y-0 transition-all duration-500 ease-in-out ${
            isClicked ? "-translate-x-full" : "translate-x-0"
          } z-20 lg:z-0 space-y-9`}
        >
          <div className="w-full py-9 inline-flex flex-col items-start gap-9 min-h-[425px] shrink-0 [background:#FFF] rounded-[20px]">
            <div className="w-11/12 mx-auto h-[91.63px] justify-start items-center gap-3.5 inline-flex lg:hidden">
              <img
                className="w-[89.31px] h-[89.31px] rounded-full"
                src={s3Url + userData?.image}
                alt={s3Url + userData?.image}
              />
              <div className="flex-col justify-center items-start inline-flex">
                <div className="text-indigo-500 text-3xl font-semibold font-['DM Sans'] leading-[55.78px] tracking-tight">
                  {userData?.name}
                </div>
                <div className="text-blue-900 text-lg font-light font-['DM Sans'] leading-[55.78px] tracking-tight">
                  {userData?.email}
                </div>
              </div>
            </div>
            <button
              className="flex items-center gap-3 lg:h-14 h-7 text-black 3xl:text-2xl xl:text-xl lg:text-lg text-base font-medium leading-[normal]"
              onClick={() => handleSettingChange("account")}
            >
              {currentSetting === "account" ? (
                <div className="w-2 lg:h-full lg:bg-[#4461F2] bg-transparent rounded-r-md"></div>
              ) : (
                <div className="w-2 lg:h-full bg-transparent"></div>
              )}
              <FaRegUserCircle /> Account
            </button>
            <button
              className="flex items-center gap-3 lg:h-14 h-7 text-black 3xl:text-2xl xl:text-xl lg:text-lg text-base font-medium leading-[normal]"
              onClick={() => handleSettingChange("notification")}
            >
              {currentSetting === "notification" ? (
                <div className="w-2 lg:h-full lg:bg-[#4461F2] bg-transparent rounded-r-md"></div>
              ) : (
                <div className="w-2 lg:h-full bg-transparent"></div>
              )}
              <TbNotification /> Notification
            </button>
            <button
              className="flex items-center gap-3 lg:h-14 h-7 text-black 3xl:text-2xl xl:text-xl lg:text-lg text-base font-medium leading-[normal]"
              onClick={() => handleSettingChange("purchase_history")}
            >
              {currentSetting === "purchase_history" ? (
                <div className="w-2 lg:h-full lg:bg-[#4461F2] bg-transparent rounded-r-md"></div>
              ) : (
                <div className="w-2 lg:h-full bg-transparent"></div>
              )}
              <LuWallet />
              Purchase History
            </button>
          </div>
          <div className="inline-flex flex-col items-start gap-[30px] mx-6">
            <div className="flex flex-col items-start gap-[9px]">
              <p className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-xl font-medium leading-[normal]">
                Current tokens{" "}
              </p>
              <p className="text-black text-xl font-bold leading-[normal]">
                10
              </p>
            </div>
            <div className="flex flex-col items-start gap-[9px]">
              <p className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-xl font-medium leading-[normal]">
                Tokens purchased till now{" "}
              </p>
              <p className="text-black text-xl font-bold leading-[normal]">
                30
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 w-full py-6 min-h-[800px] shrink-0 [background:#FFF] rounded-[20px]">
          <div className="block lg:hidden w-5/6 mx-auto mb-10">
            <button
              type="button"
              className=""
              onClick={() => setClicked(!isClicked)}
            >
              <FaAngleLeft />
            </button>
          </div>
          {renderSetting(currentSetting)}
        </div>
      </div>
    </main>
  );
}

function renderSetting(setting) {
  switch (setting) {
    case "account":
      return <Accounts />;
    case "notification":
      return <Notification />;
    case "purchase_history":
      return <PurchaseHistory />;
    default:
      return null;
  }
}

export default Main;
