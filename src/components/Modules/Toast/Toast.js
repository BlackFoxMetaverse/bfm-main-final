"use client";

import React, { useEffect, useState } from "react";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";

const Toast = ({ type, message, timer = 5, onClose }) => {
  const success = type === "success";
  const error = type === "error";
  const warning = type === "warning";
  const [visible, setVisible] = useState(true);
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    if (remainingTime > -1) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setRemainingTime(remainingTime - 0.2);
      }, 200);
      onClose;
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [remainingTime]);

  return (
    <main
      className={`w-fit h-fit fixed top-24 z-50 rounded-t-md rounded-b-none ${
        visible ? "right-16" : "translate-x-1/2 left-full"
      } bg-black transition-all duration-500`}
    >
      <div className="min-w-64 size-full p-3 relative max-h-10 text-white flex justify-normal gap-4">
        {warning && (
          <BsExclamationCircleFill className="text-yellow-500 text-lg" />
        )}
        {success && <BsCheckCircleFill className="text-green-500 text-lg" />}
        {error && <IoCloseCircle className="text-red-500 text-lg" />}
        <p className="text-sm">{message}</p>
      </div>
      <div
        style={{
          width: `${(remainingTime * 100) / timer}%`,
        }}
        className={`relative h-0.5 bottom-0 ${warning && "bg-yellow-500"} ${
          success && "bg-green-500"
        } ${error && "bg-red-500"} transition-all duration-1000 ease-in-out`}
      ></div>
    </main>
  );
};

export default Toast;
