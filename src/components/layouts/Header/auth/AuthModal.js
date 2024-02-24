"use client";

import Login from "@/components/client/auth/Login";
import Register from "@/components/client/auth/Register";
import React from "react";
import { RxCross1 } from "react-icons/rx";

const AuthModal = ({ onClose, animation, register, isRegister }) => {
  return (
    <main
      className={`flex bg-black fixed right-0 inset-y-0 w-1/3 z-40 ${animation} transition-all duration-700 ease-in-out`}
    >
      <button
        type="button"
        className="relative inset-5 size-fit text-white font-extrabold text-lg"
        onClick={onClose}
      >
        <RxCross1 />
      </button>
      {isRegister ? (
        <Register close={onClose} />
      ) : (
        <Login
          close={onClose}
          register={register}
        />
      )}
    </main>
  );
};

export default AuthModal;
