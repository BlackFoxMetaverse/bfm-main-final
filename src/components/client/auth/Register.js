"use client";

import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../../public/logos/white_fox.svg";
import { FaUserAlt } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.replace("/");
  };

  return (
    <div className="flex flex-col h-screen overflow-x-hidden justify py-12 space-y-20 shrink items-center xl:px-[288px] ">
      <div className="max-w-[206px] w-full flex flex-col items-center space-y-10 justify-center shrink-0">
        <Image src={Logo} alt="" className=" w-full  fill-white" />
      </div>
      <div className="flex w-2/3  max-w-[637px] py-[35px] rounded-[40px]  bg-white  items-center justify-center gap-[69px] shrink-0 overflow-hidden">
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
          <div
            className={`lg:w-[121.962px] lg:h-[121.962px] w-[93.196px] h-[93.196px] relative shrink-0 rounded-[121.962px]`}
          >
            {profileImage ? (
              <div className="w-full h-full">
                <img
                  src={profileImage}
                  alt=""
                  className="flex w-full h-full aspect-square items-start rounded-[102px]"
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <FaUserAlt className="w-full h-full bg-black/20 pt-5 flex aspect-square items-start rounded-[102px]" />
                <input
                  type="file"
                  id="imageInput"
                  name="imageInput"
                  className="hidden"
                  required={false}
                  onChange={handleImageChange}
                />
              </div>
            )}
            <label
              htmlFor="imageInput"
              className="flex lg:w-[38.418px] lg:h-[37.031px] w-[29.357px] h-[28.297px] flex-col justify-center items-center gap-[12.274px] shrink-0 bg-[#DADADA] z-10 lg:p-[12.274px] p-[9.379px] rounded-[71.19px] absolute bottom-0 right-0"
            >
              <FaCamera />
              <input
                type="file"
                id="imageInput"
                name="imageInput"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="flex w-[458px] flex-col justify-center items-start gap-[5px]">
            <label
              htmlFor="full_name"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              placeholder="Enter Full Name"
              required
              className="flex h-11 items-center gap-[5px] self-stretch border border-[color:var(--main-colors-gray-05,#909090)] [background:var(--White,#FFF)] p-3.5 rounded-lg border-solid text-sm font-normal leading-[100%] tracking-[-0.7px] focus:outline-none"
            />
          </div>
          <div className="flex w-[458px] flex-col justify-center items-start gap-[5px]">
            <label
              htmlFor="email"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email Address"
              required
              className="flex h-11 items-center gap-[5px] self-stretch border border-[color:var(--main-colors-gray-05,#909090)] [background:var(--White,#FFF)] p-3.5 rounded-lg border-solid text-sm font-normal leading-[100%] tracking-[-0.7px] focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-1">
            <div className="flex w-[16.701px] h-[16.701px] justify-center items-center shrink-0">
              <input
                type="checkbox"
                name="legalization"
                id="legalization"
                required
                className="border border-[#4461F2] rounded-md appearance-none w-full h-full object-cover checked:bg-[#4461F2] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
              />
            </div>
            <label
              htmlFor="legalization"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-sm text-[11.628px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
            >
              I’ve read and accept the{" "}
              <Link
                href={"/terms-and-conditions"}
                className="text-[#4461F2] underline underline-offset-2"
              >
                terms and conditions*
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center gap-[5px] rounded [background:var(--Primary-1,#4461F2)] px-8 py-4 text-[color:var(--White,#FFF)] text-xl font-normal leading-[100%] tracking-[-1px]"
          >
            Create Account
          </button>
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
