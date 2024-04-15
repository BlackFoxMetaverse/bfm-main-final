"use client";

import Image from "next/image";
// import axios from 'axios';

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import PersonalInfo from "../../modules/sellerForm/PersonalInfo";
import { FaAngleRight, FaCalendar, FaCamera } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import ProfessionalInfo from "../../modules/sellerForm/ProfessionalInfo";
import GigsInfo from "../../modules/sellerForm/GigsInfo";
import { BsCheckCircleFill, BsGear, BsPhone } from "react-icons/bs";
import instance from "@/utils/axios";
import s3FileUpload from "@/utils/imageUploader";
import { getUserPreciseLocation } from "@/utils/location";
import checkToken from "@/utils/api/checkToken";
import { checkUserDataByToken } from "../../../../utils/userData";

const SellerForm = () => {
  const router = useRouter();

  const [res, setRes] = useState();
  const [inputData, setInputData] = useState({
    image: "",
    name: "",
    userName: "",
    email: "",
    phone_number: "",
    city: "",
    profession: "",
    gender: "",
    experience: "0-1",
    services: [],
    skills: [],
    collegeName: "",
    resume: "",
    description: "",
    socialMediaLinks: [],
    experienceDetails: [],
    images: [null, null, null, null, null, null],
    video: [null, null, null, null, null, null],
    coordinates: {},
  });
  const [formCount, setCount] = useState(1);
  const [userNameValid, setUserNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState({
    is: false,
    error: null,
    color: null,
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("bfm-client-token");
    checkUserDataByToken(token)
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("bfm-client-token");
    if (!token) console.warn("No token found");
    checkToken(token)
      .then((data) => {
        setRes(data);
        if (data.isSeller) {
          setInputData({
            ...data.seller,
            coordinates: {
              longitude: data.seller.location.coordinates[0],
              latitude: data.seller.location.coordinates[1],
            },
          });
        } else {
          setInputData({
            ...inputData,
            phone_number: data.phone_number,
          });
        }
      })
      .catch((err) => {
        console.error("error", err);
      });
  }, []);

  async function filterUpdates(obj1, obj2) {
    const result = {};

    const normalKeys = [
      "name",
      "userName",
      "email",
      "phone_number",
      "city",
      "profession",
      "gender",
      "experience",
      "services",
      "skills",
      "collegeName",
      "description",
      "socialMediaLinks",
      "experienceDetails",
    ];
    const specialKeys = ["image", "resume", "images", "coordinates"];

    if (obj2.resume && typeof obj2.resume === "object") {
      result.resume = await s3FileUpload(obj2.resume);
    }

    if (obj2.image && typeof obj2.image === "object") {
      result.image = await s3FileUpload(obj2.image);
    }

    if (obj2.images) {
      result.images = await Promise.all(
        obj2.images.map(async (img) => {
          if (!img) return null;
          if (typeof img === "string") return img;
          if (typeof img === "object") return await s3FileUpload(img);
        })
      );
    }

    if (obj2.coordinates) {
      obj2.coordinates = await getUserPreciseLocation();
    }

    for (const key of normalKeys) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          result[key] = obj2[key];
        }
      }
    }

    for (const key of specialKeys) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        result[key] = obj2[key];
      }
    }

    return result;
  }

  async function transform(obj) {
    let result = { ...obj };

    if (typeof result.image === "object") {
      if (!result.image) return;
      const key = await s3FileUpload(result.image);
      result = { ...result, image: key };
    } else {
      result.image = null;
    }

    result.images = await Promise.all(
      result.images.map(async (img) => {
        if (!img) return null;
        if (typeof img === "object") {
          return await s3FileUpload(img);
        }
      })
    );

    if (typeof result.resume === "object") {
      if (!result.resume) return;
      const key = await s3FileUpload(result.resume);
      result = { ...result, resume: key };
    } else {
      result.resume = null;
    }

    const value = await getUserPreciseLocation();

    result.coordinates = value;

    return result;
  }

  async function submitSeller() {
    try {
      const token = localStorage.getItem("bfm-client-token");
      if (!token) {
        console.warn("No token available");
        return Promise.reject(false);
      }
      if (res.isSeller) {
        const bodyObj = await filterUpdates(res.seller, inputData);

        const response = await instance.put("/main/seller", bodyObj, {
          headers: {
            token: token,
          },
        });
        router.back();
        return Promise.resolve(response.data);
      } else {
        const bodyObj = await transform(inputData);
        const response = await instance.post("/main/seller", bodyObj, {
          headers: {
            token: token,
          },
        });
        router.replace(
          `/seller/dashboard/${response?.data?.data?.name}/${response?.data?.data?.uid}`
        );
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  function handleSubmitGigs() {
    submitSeller()
      .then((data) => {
        console.log("seller done!", data);
      })
      .catch((err) => {
        console.error("seller not done!", err);
      });
  }

  let userNameTimeout;
  let emailTimeout;

  function checkEmail(phone_number) {
    if (emailTimeout) {
      clearTimeout(emailTimeout);
    }

    emailTimeout = setTimeout(() => {
      instance
        .get(
          `check/phone_number?uid=${userData?.uid}&phone_number=${phone_number}`
        )
        .then((response) => {
          setEmailValid({
            is: response.data,
            error: response?.data ? "Email validated" : "Email already taken",
            color: response.data ? "green-500" : "red-500",
          });
        })
        .catch((error) => {
          setEmailValid({
            is: false,
            error: error?.response?.data?.errors[0]?.msg,
            color: "red-500",
          });
        })
        .finally(() => {
          emailTimeout = null;
        });
    }, 450);
  }

  function checkUserName(userName) {
    if (userNameTimeout) {
      clearTimeout(userNameTimeout);
    }

    userNameTimeout = setTimeout(() => {
      instance
        .get(
          `check/userName?uid=${userData?.data?.user?.uid}&userName=${userName}`
        )
        .then((Res) => setUserNameValid(Res.data))
        .catch((error) => {
          console.error("Error checking username:", error);
        })
        .finally(() => {
          userNameTimeout = null;
        });
    }, 450);
  }

  useEffect(() => {
    console.log(inputData);
  }, [inputData]);

  return (
    <main className="w-full mx-auto py-20 space-y-10">
      <section className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-12 text-white min-h-[346px] max-md:px-5">
        <img
          loading="eager"
          src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Decorative background"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col mt-7 w-full max-w-1/4">
          <h2 className="self-center text-2xl font-light whitespace-nowrap">
            Become a Seller
          </h2>
          <p className="mt-8 text-6xl font-bold text-center leading-[67px] max-md:max-w-full max-md:text-4xl max-md:leading-[51px]">
            Paperwork is our passion. What&apos;s yours?
          </p>
        </div>
      </section>

      <div className="max-w-[1920px] w-11/12 my-12 py-10 mx-auto flex gap-10 justify-between items-start flex-col lg:flex-row">
        {/* Form Component */}
        <div className="flex flex-col items-center justify-center gap-10 w-11/12 mx-auto">
          {/* Form Names and positions */}
          <div className="flex items-center xl:gap-10 gap-4">
            <button
              type="button"
              onClick={() => setCount(1)}
              disabled={formCount === 1 ? true : false}
              className="flex items-center gap-3"
            >
              <p className="flex md:size-[25px] size-3 justify-center items-center bg-[#1DBF73] px-0 py-[5.5px] rounded-[12.5px] text-white text-center md:text-sm text-[8px] font-semibold">
                1
              </p>
              <p className="text-[#222325] md:text-sm text-[8px] font-semibold whitespace-nowrap leading-6">
                Personal Information
              </p>
              <FaAngleRight className="md:text-sm text-[8px]" />
            </button>
            <button
              type="button"
              onClick={() => setCount(2)}
              disabled={formCount <= 2 ? true : false}
              className="flex items-center gap-3"
            >
              <p
                className={`flex md:size-[25px] size-3 justify-center items-center ${
                  formCount === 2 || formCount === 3
                    ? "bg-[#1DBF73]"
                    : "bg-black/10"
                } px-0 py-[5.5px] rounded-[12.5px] text-white text-center md:text-sm text-[8px] font-semibold`}
              >
                2
              </p>
              <p
                className={`${
                  formCount === 2 || formCount === 3
                    ? "text-[#222325]"
                    : "text-black/35"
                } md:text-sm text-[8px] font-semibold whitespace-nowrap leading-6`}
              >
                Professional Information
              </p>
              <FaAngleRight className="md:text-sm text-[8px]" />
            </button>
            <button
              type="button"
              onClick={() => setCount(3)}
              disabled={formCount === 3 ? false : true}
              className="flex items-center gap-3"
            >
              <p
                className={`flex md:size-[25px] size-3 justify-center items-center ${
                  formCount === 3 ? "bg-[#1DBF73]" : "bg-black/10"
                } px-0 py-[5.5px] rounded-[12.5px] text-white text-center md:text-sm text-[8px] font-semibold`}
              >
                3
              </p>
              <p
                className={`${
                  formCount === 3 ? "text-[#222325]" : "text-black/35"
                } md:text-sm text-[8px] font-semibold whitespace-nowrap leading-6`}
              >
                Show Your Work
              </p>
              <FaAngleRight className="md:text-sm text-[8px]" />
            </button>
          </div>

          {/* Forms */}
          <div className="max-w-[1920px] 2xl:w-1/2 lg:w-2/3 flex flex-col gap-10 w-full py-10 mx-auto bg-gray-100">
            {formCount === 1 && (
              <PersonalInfo
                inputData={inputData}
                setInputData={setInputData}
                setCount={setCount}
                userNameValid={userNameValid}
                emailValid={emailValid}
                checkUserName={checkUserName}
                checkEmail={checkEmail}
              />
            )}
            {formCount === 2 && (
              <ProfessionalInfo
                inputData={inputData}
                setInputData={setInputData}
                setCount={setCount}
              />
            )}
            {formCount === 3 && (
              <GigsInfo
                inputData={inputData}
                setInputData={setInputData}
                setCount={setCount}
                sellerSubmit={handleSubmitGigs}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerForm;
