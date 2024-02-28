"use client";

import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaCamera, FaChevronRight } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { TbCaretDownFilled } from "react-icons/tb";

const PersonalInfo = ({
  inputData,
  setInputData,
  setCount,
  userNameValid,
  emailValid,
  checkUserName,
  checkEmail,
}) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const [showGenderOptions, setShowGenderOptions] = useState(false);

  const handleGenderSelect = (selectedGender) => {
    setInputData({ ...inputData, gender: selectedGender });
    setShowGenderOptions(false);
  };

  const genderOptions = ["male", "female", "other"];

  function handleSubmit(e) {
    e.preventDefault();
    if (inputData?.gender.length < 4) return false;
    setCount(2);
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col w-11/12 mx-auto justify-center items-end gap-10"
    >
      <div className="flex flex-col items-start gap-5 w-full">
        <div className="flex flex-col items-start text-left gap-[7px]">
          <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
            Personal Information
          </h2>
          <p className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6">
            Please provide your personal information below.{" "}
          </p>
        </div>
        <div className="flex max-w-[766.546px] w-full flex-col justify-center items-start gap-[34px]">
          <div
            className={`lg:size-[121.962px] size-[93.196px] relative shrink-0 rounded-xl`}
          >
            {inputData?.image ? (
              <div className="size-full rounded-xl bg-black/20 overflow-hidden">
                <img
                  src={
                    typeof inputData?.image === "string"
                      ? `${s3Url}${inputData?.image}`
                      : URL.createObjectURL(inputData?.image)
                  }
                  alt=""
                  className="flex size-full items-start"
                />
              </div>
            ) : (
              <div className="size-full bg-black/20 rounded-xl flex overflow-hidden justify-center items-center">
                <img
                  alt=""
                  className={`${
                    true ? "size-full" : "size-1/2"
                  } flex items-start`}
                />
                <input
                  type="file"
                  id="imageInput"
                  name="imageInput"
                  className="hidden"
                  required={false}
                  value={inputData?.image}
                  onChange={(e) =>
                    setInputData({ ...inputData, image: e.target.files[0] })
                  }
                />
              </div>
            )}
            <label
              htmlFor="imageInput"
              className="flex lg:size-7 size-5 flex-col justify-center items-center shrink-0 bg-black text-white text-base z-10 rounded-full absolute right-0 top-full translate-x-1/4 -translate-y-full"
            >
              <IoCameraOutline className="" />
              <input
                type="file"
                id="imageInput"
                name="imageInput"
                className="hidden"
                onChange={(e) =>
                  setInputData({ ...inputData, image: e.target.files[0] })
                }
              />
            </label>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 w-full items-start content-start md:gap-[31px_20px] gap-[15px]">
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="name"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your name"
              className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
              value={inputData?.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="userName"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              required
              value={inputData?.userName}
              onChange={(e) => {
                setInputData({ ...inputData, userName: e.target.value });
                checkUserName(e.target.value);
              }}
              placeholder="Harsh_12"
              className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
            />
            {inputData?.userName !== "" &&
              (userNameValid ? (
                <div className="flex gap-3 items-center text-green-500 text-sm">
                  <BsCheckCircleFill /> Username validated
                </div>
              ) : (
                <div className="flex gap-3 items-center text-red-500 text-sm">
                  <RxCrossCircled /> Username already taken
                </div>
              ))}
          </div>
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="gender"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              gender
            </label>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setShowGenderOptions(!showGenderOptions)}
                className="flex gap-2 items-center bg-white w-full pr-3.5 text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none"
              >
                <span
                  className={`flex-grow text-left ${
                    inputData.gender !== "" ? "text-black" : "text-[#9F9F9F]"
                  }`}
                >
                  {inputData.gender || "male"}
                </span>
                <TbCaretDownFilled />
              </button>
              {showGenderOptions && (
                <ul className="absolute capitalize z-10 top-full left-0 w-full bg-white border rounded-lg shadow-md mt-2">
                  {genderOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleGenderSelect(option)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="email"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={inputData?.email}
              onChange={(e) => {
                setInputData({ ...inputData, email: e.target.value });
                checkEmail(e.target.value);
              }}
              placeholder="12345@gmail.com"
              className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
            />
            {inputData?.email !== "" &&
              (emailValid ? (
                <div className="flex gap-3 items-center text-green-500 text-sm">
                  <BsCheckCircleFill /> Email validated
                </div>
              ) : (
                <div className="flex gap-3 items-center text-red-500 text-sm">
                  <RxCrossCircled /> Email already taken
                </div>
              ))}
          </div>
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="phoneNo"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              phone No
            </label>
            <input
              type="string"
              name="phoneNo"
              id="phoneNo"
              value={inputData?.phone_number}
              disabled={true}
              required
              className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
            />
          </div>
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="city"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              city
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={inputData?.city}
              onChange={(e) => {
                setInputData({ ...inputData, city: e.target.value });
              }}
              required
              placeholder="New Delhi"
              className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex justify-center items-center gap-2 rounded [background:var(--Primary-1,#4461F2)] px-8 py-4 text-[color:var(--Primary-blue,#FFF)] font-[450] leading-[100%] tracking-[-1px]"
      >
        Save & Continue
      </button>
    </form>
  );
};

export default PersonalInfo;
