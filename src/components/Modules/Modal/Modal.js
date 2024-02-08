"use client";
import React, { useEffect } from "react";

const Modal = ({ closeModal }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    };

    // Add event listener when modal is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when modal is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8  rounded-lg modal-content max-w-[50%]">
        <div className=" flex justify-center gap-10 items-center ">
          <div className="flex-1 space-y-[85px] flex flex-col justify-center items-center ">
            <div className=" flex space-y-10  flex-col justify-center items-start">
              <h1 className="text-3xl font-bold">Buy 1 token</h1>
              <p className="text-start">
                With one token you will be able to reveal contacts of 1 profile
                only
              </p>
            </div>
            <button className="bg-blue-500 text-white py-2 px-20 rounded-xl">
              Buy 1 Token
            </button>
          </div>
          <div className="border-2 border-gray-700  bg-slate-700 h-36"></div>
          <div className=" flex-1 space-y-10  flex flex-col justify-center items-center">
            <div className="flex space-y-10  flex-col justify-center items-start">
              <h1 className="text-3xl font-bold ">Buy 1 token</h1>
              <p className="text-start">
                With token packs you will be able to reveal contacts of multiple
                profiles without buying token each time u wish to see any
                profiles contact.
              </p>
            </div>
            <button className="bg-blue-500 text-white py-2 px-20  rounded-xl">
              See token packs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
