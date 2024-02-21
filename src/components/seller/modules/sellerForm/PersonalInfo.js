"use client";

import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaCamera, FaChevronRight } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

const PersonalInfo = ({ setData, userData }) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: userData?.name ? userData?.name : "",
    username: "",
    email: userData?.email ? userData?.email : "",
    image: "",
    phoneNo: userData?.phone_number ? userData?.phone_number : "",
    city: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      //   setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFormData({ ...formData, profileImage: file });
    }
  };

  const [isUniqueUsername, setIsUniqueUserName] = useState(false);
  const [isUniqueEmail, setIsUniqueEmail] = useState(false);

  let checkUserNameTimeout;
  let checkEmailTimeout;

  const onFormDataChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "username") {
      if (value === "") return false;
      if (checkUserNameTimeout) {
        clearTimeout(checkUserNameTimeout);
      }
      checkUserNameTimeout = setTimeout(() => {
        instance
          .get(`/check/userName?userName=${value}`)
          .then((res) => {
            setIsUniqueUserName(res.data);
          })
          .catch((err) => {
            console.log("checkUserName err", err);
          });
      }, 300);
    }
    if (name === "email") {
      if (value === "") return false;
      if (checkEmailTimeout) {
        clearTimeout(checkEmailTimeout);
      }
      checkEmailTimeout = setTimeout(() => {
        instance
          .get(`/check/userName?userName=${value}`)
          .then((res) => {
            setIsUniqueEmail(res.data);
          })
          .catch((err) => {
            console.log("checkUserName err", err);
          });
      }, 300);
    }
  };

  useEffect(() => {
    setData(formData);
  }, [formData]);

  return (
    <div
      // action=""
      //   onChange={() => setData(formData)}
      className="flex flex-col w-5/6 mx-auto justify-center items-center gap-[45px]"
    >
      <div className="flex max-w-[766.546px] w-full flex-col justify-center items-start gap-[34px]">
        {/* <div className="flex max-w-[669px] flex-col items-start md:gap-[29px] gap-[17.21px]">
          <h1 className="text-black md:text-[32px] text-[18.99px]  not-italic font-bold leading-[normal]">
            Profile Form
          </h1>
          <p className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6">
            Please fill out the following information to create your profile.
          </p>
        </div> */}
        <div
          className={`lg:w-[121.962px] lg:h-[121.962px] w-[93.196px] h-[93.196px] relative shrink-0 rounded-[121.962px]`}
        >
          {image ? (
            <div className="w-full h-full">
              <img
                src={image}
                alt=""
                className="flex w-full h-full aspect-square items-start rounded-[102px]"
              />
            </div>
          ) : (
            <div className="w-full h-full">
              <img
                src={s3Url + userData?.image}
                onError={() => {
                  return `https://dummyimage.com/600x400/${randomColor}/ffffff.png&text=${userData?.name
                    ?.charAt(0)
                    .toUpperCase()}`;
                }}
                alt=""
                className="w-full h-full bg-black/20 flex aspect-square items-start rounded-[102px]"
              />
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
      </div>
      <div className="flex flex-col items-start gap-5 w-full">
        <div className="flex flex-col items-start text-left gap-[7px]">
          <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
            Personal Information
          </h2>
          <p className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6">
            Please provide your personal information below.{" "}
          </p>
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
              value={formData.name}
              onChange={onFormDataChange}
              required
              placeholder="Harsh Singh"
              className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
            />
          </div>
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="username"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              value={formData.username}
              onChange={onFormDataChange}
              placeholder="Harsh_12"
              className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
            />
            {formData.username !== "" &&
              (isUniqueUsername ? (
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
              value={formData.email}
              onChange={onFormDataChange}
              placeholder="12345@gmail.com"
              className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
            />
            {/* {formData.email !== "" &&
              (isUniqueEmail ? (
                <div className="flex gap-3 items-center text-green-500 text-sm">
                  <BsCheckCircleFill /> Email validated
                </div>
              ) : (
                <div className="flex gap-3 items-center text-red-500 text-sm">
                  <RxCrossCircled /> Email already taken
                </div>
              ))} */}
          </div>
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="phoneNo"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              phone No
            </label>
            <input
              type="number"
              name="phoneNo"
              id="phoneNo"
              minLength={10}
              value={formData.phoneNo}
              onChange={onFormDataChange}
              required
              placeholder="Harsh Singh"
              className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
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
              value={formData.city}
              onChange={onFormDataChange}
              required
              placeholder="New Delhi"
              className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
