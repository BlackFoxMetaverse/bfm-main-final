"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import PersonalInfo from "../../modules/sellerForm/PersonalInfo";
import { FaCamera } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import ProfessionalInfo from "../../modules/sellerForm/ProfessionalInfo";
import GigsInfo from "../../modules/sellerForm/GigsInfo";
import { BsCheckCircleFill } from "react-icons/bs";

const SellerForm = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [gigsInfo, setGigsInfo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  console.log({ personalInfo, professionalInfo, gigsInfo });

  return (
    <main className="w-full mx-auto my-24">
      <Image
        alt=""
        src={require("../../../../../public/seller/theme_bg.svg")}
        className="absolute inst-0 -z-10 h-1/2"
      />
      <div className="mx-auto w-5/6">
        <button
          type="button"
          className="inline-flex px-6 py-4 justify-center items-center gap-[8px] rounded-[4px] [background:var(--Foundation-Blue-blue-50,#ECEFFE)] pl-[24px)] pr-[16px)] text-[color:var(--Primary-1,#4461F2)] text-xl font-normal leading-[100%] tracking-[-1px]"
        >
          <IoChevronBackCircleOutline />
          Back
        </button>
      </div>
      <div className="w-2/3 bg-white mx-auto flex flex-col items-center gap-[51.561px] [background:#FFF] shadow-[0px_4.583px_9.166px_0px_rgba(41,41,41,0.08)] pt-[45.832px] rounded-[45.832px]">
        <div className="flex w-[766.546px] flex-col justify-center items-start gap-[34px]">
          <div className="flex max-w-[669px] flex-col items-start md:gap-[29px] gap-[17.21px]">
            <h1 className="text-black md:text-[32px] text-[18.99px]  not-italic font-bold leading-[normal]">
              Profile Form
            </h1>
            <p className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6">
              Please fill out the following information to create your profile.
            </p>
          </div>
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
        </div>
        <PersonalInfo setData={setPersonalInfo} />
        <ProfessionalInfo setData={setProfessionalInfo} />
        <GigsInfo setData={setGigsInfo} />
        <button
          type="submit"
          className="flex justify-center items-center gap-[6.073px] pl-[24.292px] pr-[18.219px] py-[12.146px] rounded-[3.036px] bg-[#925FF0] text-[color:var(--White,var(--Primary-blue,#FFF))] text-[12.85px] not-italic font-normal leading-[100%] tracking-[-0.643px]"
        >
          Submit
          <BsCheckCircleFill />
        </button>
      </div>
    </main>
  );
};

export default SellerForm;
