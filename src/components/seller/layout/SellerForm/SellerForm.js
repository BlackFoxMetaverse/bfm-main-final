"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import PersonalInfo from "../../modules/sellerForm/PersonalInfo";
import { FaCalendar, FaCamera } from "react-icons/fa6";
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
  const [form1Data, setForm1Data] = useState(null);
  const [userData, setData] = useState(null);
  const [formData, setFormData] = useState({
    // personalInfo,
    // professionalInfo,
    ...form1Data,
    ...gigsInfo,
  });
  const [isClient, setIsClient] = useState(true);

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
    setFormData({ ...form1Data, ...gigsInfo });
  }, [form1Data, gigsInfo]);

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

  return (
    <main className="w-full mx-auto py-24 space-y-10">
      {!isClient && (
        <Image
          loading="eager"
          alt=""
          src={require("../../../../../public/seller/theme_bg.svg")}
          className="absolute inset-0 w-full h-screen object-cover -z-10"
        />
      )}
      <div className="md:block hidden mx-auto w-5/6">
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
      </div>
      <div className="w-5/6 mx-auto flex gap-10 justify-between items-start flex-col lg:flex-row">
        {isClient ? (
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
        ) : null}
        <div className="md:w-2/3 w-full mx-auto flex flex-col items-center gap-[51.561px] relative">
          <div className="flex items-center gap-3 w-11/12 absolute inset-x-0 top-0 -translate-y-full mx-auto pb-10">
            <div onClick={() => setCount(1)} className="flex-1 border rounded-full bg-blue-700 h-3 w-full"></div>
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
            {/* {formCount === 2 && (
            <button
              type="submit"
              // onClick={handleSubmit}
              className="flex justify-center items-center gap-[6.073px] pl-[24.292px] pr-[18.219px] py-[12.146px] rounded-[3.036px] bg-[#925FF0] text-[color:var(--White,var(--Primary-blue,#FFF))] text-[12.85px] not-italic font-normal leading-[100%] tracking-[-0.643px]"
            >
              Submit
              <BsCheckCircleFill />
            </button>
          )} */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerForm;
