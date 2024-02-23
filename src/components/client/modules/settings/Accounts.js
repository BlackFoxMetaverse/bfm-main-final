"use client";

import instance from "@/utils/axios";
import s3FileUpload from "@/utils/imageUploader";
import React, { useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";

const Accounts = () => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;

  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: null,
    image: null,
  });

  console.log(newUserData);

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

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.get("/user/user", {
        headers: {
          token: token,
        },
      });
      if (res?.status === 200) {
        console.log(res.data?.data);
        setIsLogin(true);
        setUserData(res.data.data);
      } else if (res?.status === 401) {
        setIsLogin(false);
      } else {
        setIsLogin(false);
        throw new Error("Something went wrong!!");
      }
    } catch (error) {
      return error?.message;
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.put("/user/user", newUserData, {
        headers: {
          token: token,
        },
      });
      console.log(res);
      if (res.status === 200) {
        alert(res.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(userData);

  return (
    <div className="w-5/6 h-full mx-auto">
      {/* {isLogin ? ( */}
        <div className="w-full space-y-12">
          <div className="flex lg:w-3/4 w-full items-center gap-[1.5rem]">
            <div className="flex flex-1 flex-col gap-10">
              <h5 className="text-black 2xl:text-2xl xl:text-xl lg:text-lg text-base font-bold leading-[normal]">
                Account
              </h5>
              <p className="text-black 2xl:text-lg md:text-base text-sm font-normal leading-[27px]">
                You can edit your account details.
              </p>
            </div>
            {image ? (
              <div className="relative lg:w-1/6 w-1/3">
                <div className="w-full aspect-square rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src={image}
                    alt={image}
                    className="w-full h-full object-cover"
                  />
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
              <div className="relative lg:w-1/6 w-1/3">
                <div className="w-full aspect-square rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src={s3Url + userData?.image}
                    alt={userData?.image}
                    className="w-full h-full object-cover"
                  />
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
            )}
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex w-full justify-between items-center"
          >
            <label
              htmlFor="name"
              className="text-black lg:w-full lg:flex-1 w-1/3 2xl:text-2xl xl:text-xl lg:text-lg text-base font-bold leading-[normal]"
            >
              Full name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="lg:w-full lg:flex-1 w-2/3 flex flex-col justify-center items-start gap-1.5 border border-[color:var(--main-colors-gray-05,#909090)] [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
              value={
                newUserData?.name === null ? userData?.name : newUserData.name
              }
              onChange={handleFormChange}
              placeholder=""
            />
          </form>
          <hr className="w-full h-0.5 bg-black/90" />
          <div className="w-full flex flex-col lg:flex-row justify-between gap-5 items-start">
            <h5 className="text-black whitespace-nowrap font-bold leading-[normal] 2xl:text-2xl xl:text-xl lg:text-lg text-base">
              Account Deactivation
            </h5>
            <div className="space-y-2">
              <h5 className="text-black 2xl:text-lg md:text-base text-sm font-medium leading-[27px]">
                What happens when you deactivate your account?
              </h5>
              <ul className="list-disc space-y-4 px-3 w-full">
                <li className="text-black md:text-sm text-xs font-normal leading-[100%]">
                  Your profile and won&apos;t be shown on BFM anymore.
                </li>
                <li className="text-black md:text-sm text-xs font-normal leading-[100%]">
                  Active orders will be cancelled.
                </li>
                <li className="text-black md:text-sm text-xs font-normal leading-[100%]">
                  You won&apos;t be able to re-activate your Gigs.
                </li>
              </ul>
            </div>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            action=""
            className="w-full space-y-10"
          >
            <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-5">
              <label
                htmlFor="reason"
                className="text-black whitespace-nowrap flex-1 w-full 2xl:text-2xl xl:text-xl lg:text-lg text-base font-bold leading-[normal]"
              >
                I&apos;m leaving because...
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="flex-1 w-full flex flex-col justify-center items-start gap-1.5 border border-[color:var(--main-colors-gray-05,#909090)] [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
                placeholder="Describe the reason of leaving."
              />
            </div>
            <div className="flex justify-end items-end w-full">
              <button
                type="submit"
                className="inline-flex justify-center items-center gap-2.5 rounded [background:var(--main-colors-purple-05,#F4EFFD)] px-4 py-2 text-[color:var(--main-colors-gray-15,#737373)] text-sm font-normal leading-[100%] tracking-[-0.7px]"
              >
                Deactivate Account
              </button>
            </div>
          </form>
        </div>
      {/* ) : (
        <div className="w-full h-full flex items-center justify-center text-black">
          You Need To login first
        </div>
      )} */}
    </div>
  );
};

export default Accounts;
