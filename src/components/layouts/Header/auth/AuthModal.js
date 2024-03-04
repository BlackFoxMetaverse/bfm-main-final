"use client";

import Login from "@/components/client/auth/Login";
import Register from "@/components/client/auth/Register";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const AuthModal = ({ onClose, animation, register, isRegister }) => {
  const [uid, setUid] = useState(null);
  const pathname = usePathname();

  return (
    <main
      className={`flex bg-black fixed right-0 inset-y-0 3xl:w-1/4 xl:w-1/3 lg:w-1/2 md:w-2/3 w-full z-50 ${animation} transition-all duration-700 ease-in-out`}
    >
      <button
        type="button"
        className="relative inset-5 size-fit text-white font-extrabold text-lg"
        onClick={onClose}
      >
        <RxCross1 />
      </button>
      {isRegister ? (
        <Register close={onClose} uid={uid} />
      ) : (
        <Login
          setUId={setUid}
          close={onClose}
          register={register}
          message={pathname === "/seller" ? "Become a seller" : "WELCOME"}
        />
      )}
    </main>
  );
};

export default AuthModal;
