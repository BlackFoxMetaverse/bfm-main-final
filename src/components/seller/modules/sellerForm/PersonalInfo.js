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
  isShown,
}) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [cities, setCities] = useState([]);

  const handleGenderSelect = (selectedGender) => {
    setInputData({ ...inputData, gender: selectedGender });
    setShowGenderOptions(false);
  };

  const genderOptions = ["male", "female", "other"];

  async function getCities(e) {
    try {
      const city = e.target.value;
      setInputData({ ...inputData, city: city });
      const res = await instance.get(`/suggestion/cities?keyword=${city}`);
      setCities(res.data?.cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  const handleCitySelection = (selectedCity) => {
    setInputData({ ...inputData, city: selectedCity });
    setCities([]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    setCount(2);
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      method="post"
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
                      ? inputData?.image
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
                  accept="image/*"
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
                accept="image/*"
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
                  className={`flex-grow text-left capitalize ${
                    inputData.gender !== "" ? "text-black" : "text-[#9F9F9F]"
                  }`}
                >
                  {inputData.gender || "Gender"}
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
            {inputData?.email ? (
              <input
                type="email"
                name="email"
                id="email"
                required
                disabled
                value={inputData?.email}
                placeholder="12345@gmail.com"
                className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
              />
            ) : (
              <div className="w-full p-6 rounded-lg skeletonLoader"></div>
            )}
            {inputData?.email !== "" &&
              (emailValid?.is ? (
                <div className="flex gap-3 items-center text-green-500 text-sm">
                  <BsCheckCircleFill /> {emailValid?.error}
                </div>
              ) : (
                <div className="flex gap-3 items-center text-red-500 text-sm">
                  <RxCrossCircled /> {emailValid?.error}
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
              onChange={() => setInputData({ ...inputData, phone_number: "" })}
              required
              placeholder="1234567890"
              className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
            />
            {inputData?.phone_number !== "" &&
              (emailValid?.is ? (
                <div className="flex gap-3 items-center text-green-500 text-sm">
                  <BsCheckCircleFill /> {emailValid?.error}
                </div>
              ) : (
                <div className="flex gap-3 items-center text-red-500 text-sm">
                  <RxCrossCircled /> {emailValid?.error}
                </div>
              ))}
          </div>
          <div className="flex flex-col items-start gap-[5px] relative">
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
              onChange={(e) => getCities(e)}
              required
              placeholder="New Delhi"
              className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
            />
            {inputData?.city !== "" && cities.length > 0 && (
              <div className="absolute inset-x-0 bg-white py-2 px-3 top-full overflow-auto max-h-[200px] flex flex-col gap-1">
                {cities?.map((city, index) => (
                  <div
                    key={index}
                    className="flex px-4 py-2 items-center gap-2 self-stretch cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#4461f2] hover:text-white"
                    onClick={() => handleCitySelection(city["ASCII Name"])}
                  >
                    {city["ASCII Name"]}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* {isShown && ( */}
      <button
        type="submit"
        // disabled={
        //   emailValid?.is && userNameValid && inputData?.gender.length >= 4
        // }
        className={`flex justify-center items-center gap-2 rounded ${
          emailValid?.is && userNameValid && inputData?.gender.length >= 4
            ? "cursor-pointer"
            : "cursor-not-allowed"
        } [background:var(--Primary-1,#4461F2)] px-8 py-4 text-[color:var(--Primary-blue,#FFF)] font-[450] leading-[100%] tracking-[-1px]`}
      >
        Save & Continue
      </button>
      {/* )} */}
    </form>
  );
};

export default PersonalInfo;
