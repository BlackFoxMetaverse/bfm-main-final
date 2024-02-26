"use client";

import instance from "@/utils/axios";
import s3FileUpload from "@/utils/imageUploader";
import React, { useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import preview from "../../../../../public/clients_images/services/preview.svg";
import Image from "next/image";
import { FaCaretDown } from "react-icons/fa6";
import Toast from "@/components/Modules/Toast/Toast";
const Accounts = ({ userData }) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;

  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: "",
    image: null,
    gender: "",
    email: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const options = ["male", "female", "prefer not to say"];

  useEffect(() => {
    setNewUserData({
      name: userData?.name,
      email: userData?.email,
      image: userData?.profileImage ? userData?.profileImage : null,
      gender: userData?.gender ? userData?.gender : selectedOption,
    });
  }, [userData]);

  console.log(newUserData);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    s3FileUpload(e.target.files[0])
      .then((key) => {
        // setImageKey(key)
        // console.log(imageKey);
        setNewUserData({ ...newUserData, image: key });
      })
      .catch((error) => console.error(error));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.put("/main/user", newUserData, {
        headers: {
          token: token,
        },
      });
      console.log(res);
      if (res.status === 200) {
        setShowModal("success");
      }
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  }

  console.log(userData);
  console.log(showModal);

  return (
    <div className="w-5/6 h-full mx-auto">
      {showModal === "success" && (
        <Toast
          type={showModal}
          message={"Profile Updated Sucessfully"}
          onClose={() => setShowModal("")}
        />
      )}
      {showModal === "error" && (
        <Toast
          type={showModal}
          message={"Something went wrong"}
          onClose={() => setShowModal("")}
        />
      )}

      <div className="w-full space-y-12">
        <div className="flex flex-col lg:w-3/4 w-full items- gap-[1.5rem]">
          <div className="flex flex-col self-stretch text-black lg:whitespace-nowrap">
            <div className="w-full text-4xl font-bold max-md:max-w-full">
              Account
            </div>
            <div className="self-start mt-4 text-lg leading-7">
              Please provide your professional information below.{" "}
            </div>
          </div>
          {image ? (
            <div className="relative lg:w-1/3 w-1/3">
              <div className="w-full aspect-square rounded-2xl flex justify-center items-center overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={image}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={preview}
                    alt={preview}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="imageUpdate"
                className="2xl:text-2xl xl:text-xl lg:text-lg text-base cursor-pointer absolute right-0.5 bottom-0.5 z-10 p-1.5 rounded-full bg-white/80 w-fit aspect-square"
              >
                <BsCameraFill />
                <input
                  type="file"
                  name="imageUpdate"
                  id="imageUpdate"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="relative lg:w-1/3 w-1/3">
              <div className="w-full aspect-square rounded-2xl flex justify-center items-center overflow-hidden">
                {userData?.image ? (
                  <img
                    src={s3Url + userData?.image}
                    alt={userData?.image}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={preview}
                    alt={preview}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="imageUpdate"
                className="2xl:text-2xl xl:text-xl lg:text-lg text-base cursor-pointer absolute right-0 translate-x-1/3 bottom-0 z-10 p-1.5 rounded-full bg-black/80 w-fit aspect-square"
              >
                <BsCameraFill className="text-white" />
                <input
                  type="file"
                  name="imageUpdate"
                  id="imageUpdate"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
        <form
          action=""
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 w-full justify-between items-center"
        >
          <div className="flex justify-between items-center w-full gap-10">
            <div className="flex flex-col w-full">
              <label
                htmlFor="name"
                className="text-gray-700 lg:w-full lg:flex-1 mb-2 2xl:text-xl xl:text-md lg:text-lg text-base  leading-[normal]"
              >
                Full name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full flex flex-col justify-center items-start gap-1.5  [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
                value={newUserData.name}
                onChange={handleFormChange}
                placeholder="Ritik Bhushan"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="name"
                className="text-gray-700 lg:w-full lg:flex-1 mb-2 2xl:text-xl xl:text-md lg:text-lg text-base  leading-[normal] font-light"
              >
                Gender
              </label>
              <div className="bg-white flex relative items-center pr-2">
                <input
                  type="select"
                  value={selectedOption ? selectedOption : userData?.gender}
                  readOnly
                  onClick={toggleDropdown}
                  placeholder="Male"
                  className="cursor-pointer capitalize focus:outline-none focus:shadow-outline  w-full rounded-md py-2 px-4 block appearance-none leading-normal"
                />
                <FaCaretDown
                  className=" cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isOpen && (
                  <ul className="absolute mt-6 inset-x-0 top-1/2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {options.map((option) => (
                      <li key={option}>
                        <button
                          onClick={() => handleOptionClick(option)}
                          className="block w-full px-4 py-2 text-left capitalize text-gray-700 hover:bg-gray-100 focus:outline-none"
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full gap-10">
            <div className="flex flex-col w-full">
              <label
                htmlFor="name"
                className="text-gray-700 lg:w-full lg:flex-1 mb-1/2 2xl:text-xl xl:text-md lg:text-lg text-base  leading-[normal]"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full flex flex-col justify-center items-start gap-1.5  [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
                value={newUserData.email}
                onChange={handleFormChange}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex justify-end items-center w-full gap-10">
            <div className="flex flex-col">
              <button className="justify-center px-8 py-4 text-xl tracking-tighter leading-5 text-white whitespace-nowrap bg-indigo-500 rounded font-[450]">
                Save Changes
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-col px-5 text-sm leading-4 text-black max-w-[422px]">
          <div className="w-full text-3xl text-neutral-900">
            Account Deactivation
          </div>
          <div className="mt-6 w-full text-lg leading-7 font-[450]">
            What happens when you deactivate your account?
          </div>
          <div className="w-full">
            <br />
            Your profile and won&apos;t be shown on BFM anymore.
          </div>
          <div className="w-full tracking-tighter">
            <br />
            Active orders will be cancelled.
          </div>
          <div className="w-full tracking-tighter">
            <br />
            You won&apos;t be able to re-activate your Gigs.
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          action=""
          className="w-full space-y-10"
        >
          <div className="w-full spacey-y-2  px-5 text-sm lg:flex-row justify-between items-start gap-5">
            <label
              htmlFor="reason"
              className="text-lg tracking-tighter leading-5 capitalize max-w-[172px] text-zinc-800"
            >
              I&apos;m leaving because...
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className=" w-full flex flex-col justify-center items-start gap-1.5  [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
              placeholder="Describe the reason of leaving."
            />
          </div>
          <div className="flex justify-end items-end w-full">
            <button
              type="submit"
              className="justify-center px-8 py-4 text-xl tracking-tighter leading-5 text-white whitespace-nowrap rounded bg-neutral-900 font-[450]"
            >
              Deactivate Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Accounts;
