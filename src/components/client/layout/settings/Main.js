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
import Security from "../../modules/settings/Security";
import Toast from "@/components/Modules/Toast/Toast";
import { fetchUserData } from "@/utils/userData";

function TokenInfoCard({ label, value }) {
  return (
    <div className="flex flex-col px-5 py-3 mt-6 w-fit rounded-xl bg-black/60 z-10">
      <div className="font-medium text-sm md:text-base">{label}</div>
      <div className="mt-2.5 font-bold text-sm md:text-base">{value}</div>
    </div>
  );
}

function Main() {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;

  const [currentSetting, setCurrentSetting] = useState("account");
  const [isClicked, setClicked] = useState(false);
  const [userData, setuserData] = useState(null);

  const handleSettingChange = (newSetting) => {
    setCurrentSetting(newSetting);
    setClicked(!isClicked);
  };

  const tokenData = [
    { label: "Current tokens", value: userData?.token ? userData?.token : 0 },
    {
      label: "Tokens purchased till now",
      value: userData?.purchased ? userData?.purchased : 0,
    },
  ];

  async function getUserData() {
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.get("/main/user", {
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
    fetchUserData()
      .then((data) => setuserData(data))
      .catch((error) => <Toast message={error} type={"error"} />);
  }, []);

  console.log(userData);

  return (
    <main
      suppressHydrationWarning
      className="[background:#F7F7F7] w-full max-w-[1920px] mx-auto"
    >
      <div className="flex overflow-hidden relative flex-col justify-end w-full items-start pt-24 pb-5 text-2xl text-white min-h-[346px]">
        <img
          src="https://images.unsplash.com/photo-1633427370898-c40eceefb26c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Settings background"
          className="object-cover absolute inset-0 size-full"
          loading="eager"
        />
        <section className="relative mt-5 text-3xl font-bold w-11/12 mx-auto">
          Settings
        </section>
        <div className="flex lg:flex-col w-11/12 mx-auto gap-4">
          {tokenData.map((data, index) => (
            <TokenInfoCard key={index} label={data.label} value={data.value} />
          ))}
        </div>
      </div>
      <div className="lg:w-11/12 w-full mx-auto lg:py-24 py-20 flex lg:flex-row flex-col relative justify-between items-start gap-12">
        <div className={`lg:w-1/3 w-full flex justify-between items-center`}>
          <div className="w-11/12 mx-auto flex lg:flex-col items-start lg:justify-normal justify-between lg:gap-4 lg:min-h-fit shrink-0 lg:bg-white lg:rounded-[20px]">
            <button
              style={{
                color: `${
                  currentSetting === "account" ? "rgb(99, 102, 241)" : "black"
                }`,
              }}
              className="flex items-center gap-3 hover:text-indigo-500 lg:px-4 py-1 rounded-lg w-full lg:h-14 h-7 text-black 3xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-medium leading-[normal]"
              onClick={() => handleSettingChange("account")}
            >
              Account
            </button>
            <button
              style={{
                color: `${
                  currentSetting === "security" ? "rgb(99, 102, 241)" : "black"
                }`,
              }}
              className="flex items-center hover:text-indigo-500 lg:px-4 py-1 rounded-lg w-full gap-3 lg:h-14 h-7 text-black 3xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-medium leading-[normal]"
              onClick={() => handleSettingChange("security")}
            >
              Security
            </button>
            <button
              style={{
                color: `${
                  currentSetting === "notification"
                    ? "rgb(99, 102, 241)"
                    : "black"
                }`,
              }}
              className="flex items-center hover:text-indigo-500 lg:px-4 py-1 rounded-lg w-full gap-3 lg:h-14 h-7 text-black 3xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-medium leading-[normal]"
              onClick={() => handleSettingChange("notification")}
            >
              Notification
            </button>
            <button
              style={{
                color: `${
                  currentSetting === "purchase_history"
                    ? "rgb(99, 102, 241)"
                    : "black"
                }`,
              }}
              className="flex items-center hover:text-indigo-500 lg:px-4 py-1 whitespace-nowrap rounded-lg w-full gap-3 lg:h-14 h-7 text-black 3xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-medium leading-[normal]"
              onClick={() => handleSettingChange("purchase_history")}
            >
              Purchase History
            </button>
          </div>
        </div>

        <div className="lg:w-2/3 w-full py-6 shrink-0 min-h-full bg-white/50 rounded-[20px]">
          {renderSetting(currentSetting, userData)}
        </div>
      </div>
    </main>
  );
}

function renderSetting(setting, userData) {
  switch (setting) {
    case "account":
      return <Accounts userData={userData} />;
    case "security":
      return <Security />;
    case "notification":
      return <Notification />;
    case "purchase_history":
      return <PurchaseHistory />;
    default:
      return null;
  }
}

export default Main;
