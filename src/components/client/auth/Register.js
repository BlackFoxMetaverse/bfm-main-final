"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../../../../public/logos/white_fox.svg";
import { FaUserAlt } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import instance from "@/utils/axios";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiCrossFill } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import PreLoader from "@/components/Modules/Preloader/preLoader";
import s3FileUpload from "@/utils/imageUploader";

const Register = ({ close }) => {
  const [document, setDocument] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  // const [isUniqueUser, setUniqueUser] = useState(true);
  const [isUniqueEmail, setUniqueEmail] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // imageFile: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    setDocument(window.document);
  });

  const router = useRouter();

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProfileImage(file);
  //     const imageUrl = URL.createObjectURL(file);
  //     setProfileImage(imageUrl);
  //     setFormData({ ...formData, imageFile: file });
  //   }
  // };

  // function checkUniqueUserName(e) {
  //   const userName = e.target.value;
  //   if (userName === "") {
  //     return;
  //   }
  //   setFormData({ ...formData, name: userName });
  //   var checkTimeout;
  //   if (checkTimeout) {
  //     clearTimeout(checkTimeout);
  //   }
  //   checkTimeout = setTimeout(() => {
  //     instance
  //       .get(`/check/userName?userName=${userName}`)
  //       .then((res) => {
  //         setUniqueUser(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }, 500);
  // }

  function checkUniqueEmail(e) {
    const email = e.target.value;
    if (email === "") {
      return;
    }
    var checkTimeout;
    if (checkTimeout) {
      clearTimeout(checkTimeout);
    }
    setFormData({ ...formData, email: email });
    checkTimeout = setTimeout(() => {
      instance
        .get(`/check/email?email=${email}`)
        .then((res) => {
          setUniqueEmail(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 500);
  }

  const handleSubmit = (e) => {
    const token = localStorage.getItem("bfm-client-token");
    console.log(token);
    e.preventDefault();

    instance
      .post("/main/user", formData, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        console.log(response);
        close();
      })
      .catch((err) => console.error(err.message))
      .finally(() => setSubmitting(true));
  };

  console.log(formData);

  return (
    <div className="flex flex-col py-12 w-full space-y-20">
      {/* <div className="max-w-[206px] w-full flex flex-col items-center space-y-10 justify-center shrink-0">
        <Image src={Logo} alt="" className=" w-full  fill-white" />
      </div> */}
      <div className="flex py-[35px] rounded-[40px] items-center justify-center gap-[69px] shrink-0 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[19px] shrink-0 self-stretch"
        >
          <div className="flex flex-col space-y-4 justify-center">
            <h1 className="text-white text-[32px] not-italic font-bold leading-[normal]">
              Almost Done!
            </h1>
            <p className=" text-white text-center not-italic font-normal leading-[27px]">
              Enter your Details for completion of your account
            </p>
          </div>
          {/* <div
            className={`lg:w-[121.962px] lg:h-[121.962px] w-[93.196px] h-[93.196px] relative shrink-0 rounded-[121.962px]`}
          >
            {profileImage ? (
              <div className="w-full h-full">
                <img
                  src={profileImage}
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
          </div> */}
          <div className="flex flex-col w-full justify-center items-start gap-[5px]">
            <label
              htmlFor="Username"
              className="text-white text-base font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              Full Name
            </label>
            <input
              type="text"
              name="Username"
              id="Username"
              value={formData.name}
              placeholder="Enter User Name"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="flex h-11 items-center gap-[5px] self-stretch bg-white rounded-lg p-3.5 border-solid text-sm font-normal leading-[100%] tracking-[-0.7px] focus:outline-none"
            />
          </div>
          {/* {document?.getElementById("Username").value !== "" ? (
            isUniqueUser ? (
              <div className="flex gap-1.5 items-center w-full text-green-600 xl:text-sm text-xs capitalize">
                <BsCheckCircleFill />
                this username is unique and valid
              </div>
            ) : (
              <div className="flex gap-1.5 items-center w-full text-red-600 xl:text-sm text-xs capitalize">
                <RxCrossCircled />
                this username is already taken
              </div>
            )
          ) : null} */}
          <div className="flex flex-col w-full justify-center items-start gap-[5px]">
            <label
              htmlFor="email"
              className="text-white text-base font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={checkUniqueEmail}
              placeholder="Enter Email Address"
              required
              className="flex h-11 items-center gap-[5px] self-stretch bg-white p-3.5 rounded-lg border-solid text-sm font-normal leading-[100%] tracking-[-0.7px] focus:outline-none"
            />
          </div>
          {document?.getElementById("email").value !== "" ? (
            isUniqueEmail ? (
              <div className="flex gap-1.5 items-center w-full text-green-600 xl:text-sm text-xs capitalize">
                <BsCheckCircleFill />
                this email is unique
              </div>
            ) : (
              <div className="flex gap-1.5 items-center w-full text-red-600 xl:text-sm text-xs capitalize">
                <RxCrossCircled />
                this email is already taken
              </div>
            )
          ) : null}
          <div className="flex items-start w-full gap-1">
            <div className="flex w-[16.701px] h-[16.701px] shrink-0">
              <input
                type="checkbox"
                name="legalization"
                id="legalization"
                required
                className="border border-white rounded-md appearance-none size-full object-cover checked:bg-white flex justify-center items-center checked:marker:bg-black checked:after:content-['✔'] checked:after:text-black checked:after:text-xs"
              />
            </div>
            <label
              htmlFor="legalization"
              className="text-white md:text-sm text-[11.628px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
            >
              I’ve read and accept the{" "}
              <Link
                href={"/terms-and-conditions"}
                className="text-white font-bold tracking-wide underline underline-offset-2"
              >
                terms and conditions*
              </Link>
            </label>
          </div>
          <button
            disabled={submitting}
            type="submit"
            className={`${
              submitting ? "opacity-50 cursor-not-allowed" : "opacity-1"
            } gap-[5px] rounded bg-white py-4 w-2/3 flex items-center justify-center text-black text-xl font-normal leading-[100%] tracking-[-1px]`}
          >
            {submitting ? (
              <PreLoader color={"white"} size={20} />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
      {/* <div className=" w-full flex flex-col items-center space-y-10 justify-center">
        <p className="self-stretch text-white text-center text-lg not-italic font-bold leading-[normal] uppercase">
          Discover More, Connect Locally
        </p>
      </div> */}
      <div className="absolute" id="recaptcha"></div>
    </div>
  );
};

export default Register;
