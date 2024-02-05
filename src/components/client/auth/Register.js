"use client";

import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../../public/logos/white_fox.svg";

const Register = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden justify-center space-y-20 items-center xl:px-[288px] ">
      <div className=" w-full flex flex-col items-center space-y-10 justify-center">
        <Image src={Logo} alt="" className=" w-1/4  fill-white" />
      </div>
      <div className="flex w-2/3 py-[35px] rounded-[40px]  bg-white  items-center justify-center gap-[69px] shrink-0 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex max-w-[597px] flex-col justify-center items-center gap-[19px] shrink-0 self-stretch lg:pl-[27px] px-5 lg:pr-[26px]"
        >
          <div className="flex flex-col space-y-4 justify-center items-center">
            <h1 className="text-black text-[32px] not-italic font-bold leading-[normal]">
              Almost Done!
            </h1>
            <p className=" text-[#666] text-center not-italic font-normal leading-[27px]">
              Enter your Details for completion of your account
            </p>
          </div>
          <input type="text" name="username" id="username" />
          <button type="submit">Hello</button>
        </form>
      </div>
      <div className=" w-full flex flex-col items-center space-y-10 justify-center">
        <p className="self-stretch text-white text-center text-lg not-italic font-bold leading-[normal] uppercase">
          Discover More, Connect Locally
        </p>
      </div>
      <div className="absolute" id="recaptcha"></div>
    </div>
  );
};

export default Register;
