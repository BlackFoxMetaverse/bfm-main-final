"use client";

import React, { useState } from "react";
import Accounts from "../../modules/settings/Accounts";
import Notification from "../../modules/settings/Notification";
import PurchaseHistory from "../../modules/settings/PurchaseHistory";
import { FaRegUserCircle } from "react-icons/fa";
import { TbNotification } from "react-icons/tb";
import { LuWallet } from "react-icons/lu";

function Main() {
  const [currentSetting, setCurrentSetting] = useState("account");

  const handleSettingChange = (newSetting) => {
    setCurrentSetting(newSetting);
  };

  return (
    <main className="[background:#F7F7F7] w-full max-w-[1920px] mx-auto">
      <div className="w-11/12 mx-auto py-24 flex justify-between items-start gap-12">
        <div className="w-1/3 space-y-9">
          <div className="w-full py-9 inline-flex flex-col items-start gap-9 min-h-[425px] shrink-0 [background:#FFF] rounded-[20px]">
            <button
              className="flex items-center gap-3 h-14 text-black 3xl:text-2xl xl:text-xl lg:text-lg text-base font-medium leading-[normal]"
              onClick={() => handleSettingChange("account")}
            >
              {currentSetting === "account" ? (
                <div className="w-2 h-full bg-[#4461F2] rounded-r-md"></div>
              ) : (
                <div className="w-2 h-full bg-transparent"></div>
              )}
              <FaRegUserCircle /> Account
            </button>
            <button
              className="flex items-center gap-3 h-14 text-black 3xl:text-2xl xl:text-xl lg:text-lg text-base font-medium leading-[normal]"
              onClick={() => handleSettingChange("notification")}
            >
              {currentSetting === "notification" ? (
                <div className="w-2 h-full bg-[#4461F2] rounded-r-md"></div>
              ) : (
                <div className="w-2 h-full bg-transparent"></div>
              )}
              <TbNotification /> Notification
            </button>
            <button
              className="flex items-center gap-3 h-14 text-black 3xl:text-2xl xl:text-xl lg:text-lg text-base font-medium leading-[normal]"
              onClick={() => handleSettingChange("purchase_history")}
            >
              {currentSetting === "purchase_history" ? (
                <div className="w-2 h-full bg-[#4461F2] rounded-r-md"></div>
              ) : (
                <div className="w-2 h-full bg-transparent"></div>
              )}
              <LuWallet />
              Purchase History
            </button>
          </div>
          <div className="inline-flex flex-col items-start gap-[30px]">
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

        <div className="w-2/3 py-6 min-h-[800px] shrink-0 [background:#FFF] rounded-[20px]">
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
