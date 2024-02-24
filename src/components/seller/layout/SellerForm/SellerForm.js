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
import Form1 from "../../modules/sellerForm/Form1";

const SellerForm = () => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
  const router = useRouter();

  const [formCount, setCount] = useState(1);
  const [gigsInfo, setGigsInfo] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [userData, setData] = useState(null);
  const [formData, setFormData] = useState({
    ...personalInfo,
    ...professionalInfo,
    ...gigsInfo,
  });
  const [isClient, setIsClient] = useState(true);
  const handleFormData = async () => {
    try {
      const Token =
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImExODE4ZjQ0ODk0MjI1ZjQ2MWQyMmI1NjA4NDcyMDM3MTc2MGY1OWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmZtLWxvY2F0aW9uIiwiYXVkIjoiYmZtLWxvY2F0aW9uIiwiYXV0aF90aW1lIjoxNzA4Nzc5NDEwLCJ1c2VyX2lkIjoiSzN0NWhKTUNZR1Y3dEhuODFYQUo3bzJxaWVCMiIsInN1YiI6IkszdDVoSk1DWUdWN3RIbjgxWEFKN28ycWllQjIiLCJpYXQiOjE3MDg3Nzk0MTAsImV4cCI6MTcwODc4MzAxMCwicGhvbmVfbnVtYmVyIjoiKzkxODcwOTM2MDU0MyIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxODcwOTM2MDU0MyJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.uhi79limg90BnkADqwZG2zIBn0pMhCzwpsRN8teJxiRl3-jiQMd-dnlxqolEZ08hCZxYUSd17Pw2cMcU3trJ248H3M67sHwHiZtIQ574OgW5ivHZogvlukoJ2bFF9aXP0-_kbgx13D5FEKvUm0I-iSotRr2QyYYy_En-qkjA2bBTxJGum1Okxz2jF8kdEvfECIfZ7I07mEFODzl16kVRMYlmE2dt9Je0xhRNE49FWg02IwkmyqhVc_5Jmi1-M44dc_fKf2z0qHyC6p3vkFkmMcr3w4aWagbfqUTAEB4ZarrRAkCigwxCbaX4DbLsh5_ril6bbZl8JYZ1fd3QMc74tQ";
      const response = await instance.post("/main/seller", formData, {
        headers: {
          token: Token,
        },
      });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function checkUser() {
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.get("user/user", {
        headers: {
          token: token,
        },
      });
      console.log(res.data);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  useEffect(() => {
    checkUser()
      .then((data) => {
        if (typeof data?.data === "object" && data?.data.isSeller === false) {
          setData(data?.data);
          setIsClient(true);
        } else {
          setData(data?.data);
          setIsClient(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsClient(false);
      });
  }, []);

  useEffect(() => {
    setFormData({ ...personalInfo, ...professionalInfo, ...gigsInfo });
  }, [personalInfo, professionalInfo, gigsInfo]);

  console.log("formData", formData);

  async function dataModifier(data) {
    try {
      let obj = {
        seller: {
          userName: data.personalInfo.username,
          profession: data.personalInfo.profession,
          coordinates: await getUserPreciseLocation(),
        },
        sellerProfile: {
          experience: data.professionalInfo.experience,
          collegeName: data.professionalInfo.college_name,
          tags: data.professionalInfo.skills,
          certificate: await s3FileUpload(data.professionalInfo.certification),
          description: data.gigsInfo.description,
          socialMediaLinks: data.gigsInfo.socialMedia,
          experienceDetail: data.gigsInfo.experiences,
          images: await Promise.all(
            data.gigsInfo.galleryImages.map(async (file, index) => {
              if (file !== null) {
                return await s3FileUpload(file);
              } else {
                return null;
              }
            })
          ),
        },
      };

      return obj;
    } catch (error) {
      throw error; // Rethrow the error to propagate it
    }
  }

  async function submitServer() {
    const token = localStorage.getItem("bfm-client-token");
    try {
      const obj = await dataModifier(formData);
      const sellerRes = await instance.post("/user/seller", obj.seller, {
        headers: { token },
      });
      const sellerProfileRes = await instance.post(
        "/user/sellerProfile",
        obj.sellerProfile,
        {
          headers: { token },
        }
      );
      return { sellerRes, sellerProfileRes };
    } catch (error) {
      throw error;
    }
  }

  function handleSubmit() {
    submitServer()
      .then((res) => {
        console.log("reg res", res);
      })
      .catch((err) => {
        console.log("reg res error", err);
      });
  }

  const handleSubmit1 = (e) => {
    e.preventDefault();
    setCount(formCount + 1);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setCount(formCount + 1);
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
    handleFormData();
    // setCount(formCount+1);
    // router.push("/seller/dashboard");
  };

  return (
    <main className="w-full mx-auto py-20 space-y-10">
      <section className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-12 text-white min-h-[346px] max-md:px-5">
        <img
          loading="lazy"
          src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Decorative background"
          className="object-cover absolute inset-0 w-full h-full"
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
      {/* <div className="md:block hidden mx-auto w-5/6">
        <button
          type="button"
          onClick={() => {
            if (formCount === 2) {
              setCount(1);
            } else {
              router.back();
            }
          }}
          className="inline-flex px-6 py-4 justify-center items-center gap-[8px] rounded-[4px] [background:var(--Foundation-Blue-blue-50,#ECEFFE)] pl-[24px)] pr-[16px text-[color:var(--Primary-1,#4461F2)] text-xl font-normal leading-[100%] tracking-[-1px]"
        >
          <IoChevronBackCircleOutline />
          Back
        </button>
      </div> */}
      <div className="w-5/6 mx-auto flex gap-10 justify-between items-start flex-col lg:flex-row">
        {/* {isClient ? (
          <div className="w-1/3 min-h-[455px] space-y-7 flex flex-col items-center py-5 bg-white rounded-[20px]">
            <div className="flex w-5/6 justify-between items-center gap-11 py-10 mx-auto">
              <img
                src={s3Url + userData?.image}
                alt=""
                className="w-1/3 h-full aspect-square bg-black/20 object-cover rounded-full"
              />
              <div className="w-2/3 pr-1 flex-col justify-between items-start gap-[23px] inline-flex">
                <div className="text-neutral-600 text-2xl font-medium leading-normal">
                  {userData?.name}
                </div>
                <div className="text-neutral-600 text-2xl font-normal leading-normal">
                  {userData?.phone_number}
                </div>
              </div>
            </div>
            <div className="flex w-5/6 mx-auto gap-2 items-center text-stone-500 text-xl font-medium leading-normal">
              <FaCalendar />
              <p className="">Unavailable</p>
            </div>
            <div className="w-5/6 mx-auto h-[0px] border border-black"></div>
            <button
              type="button"
              className="flex w-5/6 mx-auto gap-2 items-center text-stone-500 text-xl font-medium leading-normal"
            >
              <BsGear />
              <p className="">Settings</p>
            </button>
            <button
              type="button"
              className="flex w-5/6 mx-auto gap-2 items-center text-stone-500 text-xl font-medium leading-normal"
            >
              <BsPhone />
              <p className="">Contact and FAQs</p>
            </button>
            <button
              type="button"
              className="w-5/6 mx-auto h-[47px] px-[38px] py-2 bg-[#4461F2] rounded-[20px] justify-center items-center gap-[5px] inline-flex"
            >
              <div className="text-white text-2xl font-bold font-['Neue Helvetica']">
                Save
              </div>
            </button>
          </div>
        ) : null} */}
        {/* <div className="md:w-2/3 w-full mx-auto flex flex-col items-center gap-[51.561px] relative">
          <div className="flex items-center gap-3 w-11/12 absolute inset-x-0 top-0 -translate-y-full mx-auto pb-10">
            <div
              onClick={() => setCount(1)}
              className="flex-1 border rounded-full bg-blue-700 h-3 w-full"
            ></div>
            <div
              onClick={() => setCount(2)}
              className={`flex-1 border rounded-full ${
                formCount === 2 ? "bg-blue-700" : "bg-transparent"
              } w-full h-3`}
            ></div>
          </div>
          <div className="w-full bg-white mx-auto flex flex-col items-center gap-[51.561px] [background:#FFF] shadow-[0px_4.583px_9.166px_0px_rgba(41,41,41,0.08)] py-[45.832px] rounded-[45.832px]">
            <div className="flex flex-col w-5/6 mx-auto items-start md:gap-[29px] gap-[17.21px]">
              <h1 className="text-black md:text-[32px] text-[18.99px]  not-italic font-bold leading-[normal]">
                Profile Form
              </h1>
              <p className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6">
                Please fill out the following information to create your
                profile.
              </p>
            </div>
            {formCount === 1 && (
              <Form1
                setData={setForm1Data}
                handleSubmit={(e) => {
                  e.preventDefault();
                  setCount(formCount + 1);
                }}
              />
            )}
            {formCount === 2 && (
              <GigsInfo
                setData={setGigsInfo}
                handleSubmit={(e) => e.preventDefault()}
              />
            )}
          </div>
        </div> */}

        {/* Form Component */}
        <div className="flex flex-col items-center justify-center gap-10 w-11/12 mx-auto">
          {/* Form Names and positions */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <p className="flex w-[25px] h-[25px] justify-center items-center bg-[#1DBF73] px-0 py-[5.5px] rounded-[12.5px] text-white text-center text-sm font-semibold">
                1
              </p>
              <p className="text-[#222325] text-sm font-semibold leading-6">
                Personal Information
              </p>
              <FaAngleRight />
            </div>
            <div className="flex items-center gap-3">
              <p
                className={`flex w-[25px] h-[25px] justify-center items-center ${
                  formCount === 2 || formCount === 3
                    ? "bg-[#1DBF73]"
                    : "bg-black/10"
                } px-0 py-[5.5px] rounded-[12.5px] text-white text-center text-sm font-semibold`}
              >
                2
              </p>
              <p
                className={`${
                  formCount === 2 || formCount === 3
                    ? "text-[#222325]"
                    : "text-black/35"
                } text-sm font-semibold leading-6`}
              >
                Professional Information
              </p>
              <FaAngleRight />
            </div>
            <div className="flex items-center gap-3">
              <p
                className={`flex w-[25px] h-[25px] justify-center items-center ${
                  formCount === 3 ? "bg-[#1DBF73]" : "bg-black/10"
                } px-0 py-[5.5px] rounded-[12.5px] text-white text-center text-sm font-semibold`}
              >
                3
              </p>
              <p
                className={`${
                  formCount === 3 ? "text-[#222325]" : "text-black/35"
                } text-sm font-semibold leading-6`}
              >
                Show Your Work
              </p>
              <FaAngleRight />
            </div>
          </div>

          {/* Forms */}
          <div className="flex flex-col items-end gap-[22.916px] bg-[#FBFBFB] w-3/4 py-7">
            {formCount === 1 && (
              <PersonalInfo
                setData={setPersonalInfo}
                userData={userData}
                handleSubmit={handleSubmit1}
              />
            )}
            {formCount === 2 && (
              <ProfessionalInfo
                setData={setProfessionalInfo}
                handleSubmit={handleSubmit2}
              />
            )}
            {formCount === 3 && (
              <GigsInfo setData={setGigsInfo} handleSubmit={handleSubmit3} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerForm;
