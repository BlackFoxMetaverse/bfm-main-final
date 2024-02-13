"use client";

import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

const PersonalInfo = ({ setData }) => {
  const [profession, setProfession] = useState([
    "Photographer",
    "Designer",
    "Developer",
    "Software Developer",
  ]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    profession: "",
  });

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
    <form
      action=""
      //   onChange={() => setData(formData)}
      className="flex flex-col w-5/6 mx-auto justify-center items-center gap-[45px]"
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
            {formData.email !== "" &&
              (isUniqueEmail ? (
                <div className="flex gap-3 items-center text-green-500 text-sm">
                  <BsCheckCircleFill /> Email validated
                </div>
              ) : (
                <div className="flex gap-3 items-center text-red-500 text-sm">
                  <RxCrossCircled /> Email already taken
                </div>
              ))}
          </div>
          <div className="flex flex-col items-start justify-center gap-[5px]">
            <label
              htmlFor="profession"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              profession
            </label>
            <select
              name="profession"
              id="profession"
              value={formData.profession}
              onChange={onFormDataChange}
              required
              className="flex items-center border focus:outline-none w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
            >
              <option value="" className="text-[#9F9F9F]">
                Select Profession
              </option>
              {profession?.map((profession, index) => (
                <option key={index} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalInfo;
