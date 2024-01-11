"use client";

import React, { useEffect, useState } from "react";
import loginplaceholder from "../../../../public/login.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/Modules/Otp/OtpInput";
import { auth } from "../../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { IoCloseCircleSharp, IoReturnUpBackOutline } from "react-icons/io5";
import axios from "@/utils/axios";
import Link from "next/link";
import verfiedGif from "../../../../public/otpSubmit.gif";
import { FaCamera, FaChevronRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";

const Professions = [
  "Photographer",
  "Designer",
  "Developer",
  "Software Developer",
];

const CollegeName = ["JNU", "DU", "DTU", "IIT Delhi", "NIT Delhi"];

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobilenumber, setMobileNumber] = useState("");
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [timerEnded, setTimerEnded] = useState(false);
  const [formCount, setCount] = useState(1);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const router = useRouter();

  function handleNext() {
    if (formCount === 5) {
      setCount(5);
    } else {
      setCount(formCount + 1);
    }
  }

  function handlePrevious() {
    if (formCount === 1) {
      setCount(1);
      router.back();
    } else {
      setCount(formCount - 1);
    }
  }

  const generateRecaptcha = () => {
    const recaptchaElement = document.getElementById("recaptcha");
    recaptchaElement.innerHTML = "";
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  const handleSendOtp = () => {
    console.log("dsf");
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const phoneNumber = `${countryCode}${mobilenumber}`;
    console.log(phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log("send otp error:", error);
      });
    // handleNext();
  };

  async function loginUser(token) {
    try {
      const response = await axios.post("/auth/login", null, {
        headers: {
          idtoken: `${token}`,
        },
      });
      const data = response?.data;
      return Promise.resolve(data);
    } catch (e) {
      console.log("axios error: ", e.message);
      return Promise.reject(e.message);
    }
  }

  const handleOTPSubmit = () => {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        let token = result.user.accessToken;

        console.log("token: ", token);

        loginUser(token).then((data) => {
          if (data) {
            // Save details in session storage
            sessionStorage.setItem("userDetails", JSON.stringify(data.details));

            if (data.isUser === true) {
              localStorage.setItem("bfm-user-token", token);
            } else if (data.isUser === false) {
              localStorage.setItem("bfm-user-token", token);
            }
          } else {
            alert("An error occurred. Please try again.");
          }
        });
      })
      .catch((error) => {
        console.log("user login error:", error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleGalleryImageUpload = (e) => {
    const files = e.target.files;

    if (files.length > 0 && galleryImages.length < 6) {
      const newImages = Array.from(files).map((file) => ({
        id: Date.now(),
        url: URL.createObjectURL(file),
        file,
      }));

      setGalleryImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleGalleryImageDelete = (id) => {
    setGalleryImages((prevImages) => prevImages.filter((img) => img.id !== id));
  };

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimerEnded(true);
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  //function for user login check -> object {isUser, message, details}

  useEffect(() => {
    if (formCount === 3) {
      setVerified(true);

      const timer = setTimeout(() => {
        setVerified(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [formCount]);

  return (
    <main
      className="flex max-w-[1512px] w-11/12 mx-auto h-screen overflow-hidden justify-center items-center"
      suppressHydrationWarning
    >
      <div className="w-full aspect-[2/1] shrink-0 py-14 backdrop-blur-[16.213233947753906px] rounded-[34.921px] bg-white/25 overflow-auto flex flex-col gap-[27px] items-center relative">
        <button
          onClick={handlePrevious}
          className="absolute inset-x-12 inset-y-7 w-8 h-8 flex justify-center items-center rounded-xl shrink-0 bg-white text-black"
        >
          <IoReturnUpBackOutline />
        </button>
        <div className="w-1/2 h-4 relative shrink-0 rounded-[53.067px] border-[1.327px] border-solid border-[rgba(255,255,255,0.48)]">
          <div
            style={{
              width: `${(formCount * 100) / 5}%`,
            }}
            className="h-4 shrink-0 rounded-[53.067px] absolute bg-white"
          ></div>
        </div>
        <div className="inline-flex flex-col w-[48%] items-center gap-[45px] bg-white shadow-[0px_4px_8px_0px_rgba(41,41,41,0.08)] pt-10 rounded-[40px]">
          <div className="flex w-5/6 mx-auto justify-between items-center gap-9">
            <div className="flex max-w-[669px] flex-col items-start gap-[29px]">
              <h1 className="text-black text-[32px] not-italic font-bold leading-[normal]">
                Profile Form
              </h1>
              <p className="text-black text-base not-italic font-normal leading-6">
                Please fill out the following information to create your
                profile.
              </p>
            </div>
            {formCount !== 1 && formCount !== 2 && (
              <div
                className={`w-[121.962px] h-[121.962px] shrink-0 rounded-[121.962px]`}
              >
                {image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={image}
                      alt=""
                      className="flex w-full h-full aspect-square items-start rounded-[102px]"
                    />
                    <label
                      htmlFor="imageInput"
                      className="flex w-[38.418px] h-[37.031px] flex-col justify-center items-center gap-[12.274px] shrink-0 bg-[#DADADA] z-10 p-[12.274px] rounded-[71.19px] absolute bottom-0 right-0"
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
                ) : (
                  <label htmlFor="imageInput" className="w-full h-full">
                    <FaUserAlt className="w-full h-full bg-black/20 pt-5 flex aspect-square items-start rounded-[102px]" />
                    <input
                      type="file"
                      id="imageInput"
                      name="imageInput"
                      className="hidden"
                      required={false}
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            )}
          </div>

          {formCount === 1 && (
            <form action="" className="w-5/6 mx-auto" onSubmit={handleSendOtp}>
              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-col items-start gap-[7px]">
                  <h2 className="text-black text-[32px] not-italic font-bold leading-[normal]">
                    Verify yourself
                  </h2>
                  <p className="max-w-[557px] text-[#666] text-base not-italic font-normal leading-6">
                    Please enter your phone number. You will receive a text
                    message to verify your account. Message & data rates may
                    apply.
                  </p>
                </div>

                <div className="flex flex-col w-full items-start gap-[25.868px]">
                  <div className="flex items-center self-stretch w-full border rounded-[12.934px] p-[7.986px] border-[solid_rgba(102,102,102,0.35)]">
                    <select
                      name="select country"
                      required
                      className="flex justify-center items-center gap-2 focus:outline-none bg-transparent"
                      id=""
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="UAE">UAE</option>
                    </select>
                    <input
                      className="text-[#111] text-[19.401px] not-italic w-10 font-normal leading-[normal] focus:outline-none"
                      type="text"
                      maxLength={3}
                      required
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    />
                    <input
                      type="number"
                      required
                      pattern="\d{10}"
                      value={mobilenumber}
                      onChange={(e) => {
                        const inputValue = e.target.value.replace(/\D/g, "");
                        setMobileNumber(inputValue.slice(0, 10));
                      }}
                      className="text-[#111] text-[19.401px] w-full not-italic font-normal leading-[normal] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`flex min-w-[200px] h-[50px] justify-center items-center opacity-25 pt-[12.461px] pb-[13.539px] px-12 rounded-[34.54px] text-[color:var(--Primary-blue,#FFF)] ${
                      mobilenumber.length === 10
                        ? "bg-[#925FF0]"
                        : "bg-[#925FF0]/50 cursor-not-allowed"
                    } text-center text-[22.635px] not-italic font-normal leading-[normal]`}
                    disabled={mobilenumber.length !== 10}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </form>
          )}
          <form className="w-5/6 mx-auto">
            {formCount === 2 && (
              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-col items-start gap-[7px]">
                  <h2 className="text-black text-[32px] not-italic font-bold leading-[normal]">
                    Verify yourself
                  </h2>
                  <p className="max-w-[557px] text-[#666] text-base not-italic font-normal leading-6">
                    Please enter your phone number. You will receive a text
                    message to verify your account. Message & data rates may
                    apply.
                  </p>
                </div>
                <div className="flex flex-col w-full items-start gap-[25.868px]">
                  <div className="flex w-full flex-col items-start gap-[4.317px]">
                    <p className="text-[#292929] text-base not-italic font-normal leading-[normal]">
                      Enter OTP
                    </p>
                    <OtpInput
                      numberOfInputs={6}
                      onChange={handleOtpChange}
                      value={otp}
                      on
                      handleSubmit={handleNext}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleNext}
                    className={`flex min-w-[200px] h-[50px] justify-center items-center opacity-25 pt-[12.461px] pb-[13.539px] px-12 rounded-[34.54px] text-[color:var(--Primary-blue,#FFF)] ${
                      otp.length !== 6
                        ? "bg-[#925FF0]/50 cursor-not-allowed"
                        : "bg-[#925FF0]"
                    } text-center text-[22.635px] not-italic font-normal leading-[normal]`}
                    disabled={otp.length !== 6}
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}
            {formCount === 3 && (
              <div className="flex flex-col w-full justify-center items-center gap-[45px]">
                <div className="flex flex-col items-start gap-5 w-full">
                  <div className="flex flex-col items-start text-left gap-[7px]">
                    <h2 className="text-black text-[32px] not-italic font-bold leading-[normal]">
                      Personal Information
                    </h2>
                    <p className="text-black text-base not-italic font-normal leading-6">
                      Please provide your personal information below.{" "}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 w-full items-start content-start gap-[31px_20px]">
                    <div className="flex flex-col items-start gap-[5px]">
                      <label
                        htmlFor="name"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Harsh Singh"
                        className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-[5px]">
                      <label
                        htmlFor="username"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Harsh_12"
                        className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-[5px]">
                      <label
                        htmlFor="email"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="12345@gmail.com"
                        className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-[5px]">
                      <label
                        htmlFor="profession"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        profession
                      </label>
                      <select
                        name="profession"
                        id="profession"
                        className="flex items-center border w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                      >
                        {Professions?.map((profession, index) => (
                          <option key={index} value={profession}>
                            {profession}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="flex justify-end items-center gap-2 rounded pl-8 pr-6 py-4 bg-[#925FF0] text-[color:var(--White,var(--Primary-blue,#FFF))] text-xl not-italic font-normal leading-[100%] tracking-[-1px]"
                >
                  Next <FaChevronRight />
                </button>
              </div>
            )}
            {formCount === 4 && (
              <div className="inline-flex flex-col items-center gap-[45px] w-full pt-10 rounded-[40px]">
                <div className="flex flex-col items-start gap-5 w-full">
                  <div className="flex flex-col items-start text-left gap-[7px]">
                    <h2 className="text-black text-[32px] not-italic font-bold leading-[normal]">
                      Professional Information
                    </h2>
                    <p className="text-black text-base not-italic font-normal leading-6">
                      Please provide your professional information below.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 w-full items-start content-start gap-[31px_20px]">
                    <div className="flex flex-col items-start gap-[5px]">
                      <label
                        htmlFor="experience"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        experience
                      </label>
                      <input
                        type="text"
                        name="experience"
                        id="experience"
                        placeholder="In years"
                        className="flex items-center gap-[5px] w-full border text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-[5px]">
                      <label
                        htmlFor="service_provided"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        Service Provided
                      </label>
                      <input
                        type="text"
                        name="service_provided"
                        id="service_provided"
                        placeholder="Name the service"
                        className="flex items-center gap-[5px] border w-full  w-fulltext-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-[5px]">
                      <label
                        htmlFor="college_name"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        College name
                      </label>
                      <select
                        name="college_name"
                        id="college_name"
                        className="flex items-center border  w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                      >
                        <option value="">Select your college</option>
                        {CollegeName?.map((college, index) => (
                          <option value={college} key={index}>
                            {college}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-[5px]">
                      <label
                        htmlFor="skills"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        skills
                      </label>
                      <input
                        type="text"
                        name="skills"
                        id="skills"
                        placeholder="Frontend Developer"
                        className="flex items-center gap-[5px] border w-full  w-fulltext-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="flex justify-end items-center gap-2 rounded pl-8 pr-6 py-4 bg-[#925FF0] text-[color:var(--White,var(--Primary-blue,#FFF))] text-xl not-italic font-normal leading-[100%] tracking-[-1px]"
                >
                  Next <FaChevronRight />
                </button>
              </div>
            )}
            {formCount === 5 && (
              <div className="flex flex-col items-start gap-[30px] self-stretch w-full mx-auto">
                <div className="flex flex-col items-start gap-[7px]">
                  <h5 className="text-black text-[32px] not-italic font-bold leading-[normal]">
                    Show Your Gigs
                  </h5>
                  <p className="text-black text-base not-italic font-normal leading-6">
                    Describe your gigs that you have worked on.{" "}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-[30px] self-stretch">
                  <div className="flex flex-col items-start gap-[5px] self-stretch">
                    <label
                      htmlFor="title"
                      className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="flex items-center gap-[5px] self-stretch border focus:outline-none w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      placeholder="Chandigarh University"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2.5 self-stretch">
                    <label
                      htmlFor="description"
                      className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      className="w-full resize-none focus:outline-none h-full text-[#9F9F9F] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] flex flex-col items-start gap-[var(--numberLength,0px)] self-stretch border-[color:var(--Main-Colors-Purple-3,#BE9FF6)] pl-5 pr-2.5 pt-3.5 pb-2.5 rounded-lg border-[1.2px] border-solid"
                      placeholder="Describe your Gig"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                  <div className="flex flex-col items-start gap-[5px] self-stretch">
                    <label
                      htmlFor="images"
                      className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                    >
                      Label
                    </label>
                    <div className="flex flex-col justify-center items-start gap-2.5 self-stretch border-[var(--numberLength,] border-[solid_var(--Main-Colors-Gray-2,#646464)] px-3.5 py-2.5 rounded-lg">
                      <input
                        type="file"
                        id="images"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryImageUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() =>
                          document.getElementById("images").click()
                        }
                        disabled={galleryImages.length === 6 && true}
                        className={`flex w-fit  text-[18.235px] not-italic font-normal leading-[100%] tracking-[-0.912px] justify-center items-start gap-2.5 self-stretch border-[var(--numberLength,] border-[solid_var(--Main-Colors-Gray-2,#646464)] px-3.5 py-2.5 rounded-lg ${
                          galleryImages.length === 6
                            ? "bg-[#E9DFFC]/50 cursor-not-allowed text-[#784DC7]/50"
                            : "bg-[#E9DFFC] text-[color:var(--Main-Colors-Purple-6,#784DC7)]"
                        } bg-[#E9DFFC]`}
                      >
                        <MdOutlineUploadFile className="w-[23.444px] h-[23.444px] shrink-0" />
                        Upload
                      </button>
                      <div className="grid grid-cols-2 w-full gap-2">
                        {galleryImages.map((image) => (
                          <div
                            key={image.id}
                            className="relative w-full h-full  overflow-hidden"
                          >
                            <img
                              src={image.url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => handleGalleryImageDelete(image.id)}
                              className="absolute top-2 left-2 bg-white/40 flex h-6 justify-center items-center gap-0.5 shrink-0 p-1 rounded-xl"
                            >
                              <IoCloseCircleSharp className="flex w-[18px] h-[18px] justify-center items-center text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
          <div className="max-w-[669px] mx-auto w-5/6 h-px bg-[#BABABA]"></div>
          <div className="flex flex-col items-start gap-[19px] mx-auto w-5/6">
            <h5 className="text-black text-[32px] not-italic font-bold leading-[normal]">
              Need Help?
            </h5>
            <p className="max-w-[670px] text-black text-base not-italic font-normal leading-6">
              Check out our help section for additional information and
              resources on how to create a successful seller's profile.{" "}
            </p>
            <Link
              href={"https://www.blackfoxmetaverse.in/"}
              target="_blank"
              className="flex justify-center items-center gap-[5px] rounded px-4 py-2 bg-[#73A876] text-[color:var(--White,var(--Primary-blue,#FFF))] text-base not-italic font-normal leading-6"
            >
              Contact Us
            </Link>
          </div>
          <div className="inline-flex items-start gap-[76px]">
            <Link
              href={"#"}
              className="text-black text-base not-italic font-normal leading-6"
            >
              Terms and Conditions
            </Link>
            <Link
              href={"#"}
              className="text-black text-base not-italic font-normal leading-6"
            >
              Privacy Policy
            </Link>
            <Link
              href={
                "https://www.linkedin.com/company/black-fox-millennium/about/"
              }
              target="_blank"
              className="text-black text-base not-italic font-normal leading-6"
            >
              Social Media
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="flex max-w-[976px] max-h-[768px] items-start justify-between gap-[69px] shrink-0 overflow-hidden">
        <div className="flex-[1_0_0] self-stretch lg:flex hidden justify-center items-center overflow-hidden w-full aspect-[9/16] shrink-0">
          <Image
            src={loginplaceholder}
            alt=""
            className="w-full h-full object-cover shrink-0"
          />
        </div>
        {!hasFilled ? (
          <form
            onSubmit={handleSubmit}
            className="flex max-w-[397px] flex-col justify-center items-start gap-[39px] shrink-0 self-stretch lg:pl-[27px] px-5 lg:pr-[26px] lg:py-[188px]"
          >
            <h1 className="self-stretch text-[color:var(--mono-90,#18181B)] text-[28px] not-italic font-bold leading-8 tracking-[-0.28px]">
              Welcome to Black Fox MetaVerse
            </h1>
            <div className="flex flex-col items-start gap-8 self-stretch">
              <div className="flex lg:max-w-[344px] rounded-xl items-center gap-1 p-4 bg-black/10">
                <select
                  name="select country"
                  required
                  className="flex justify-center items-center gap-2 focus:outline-none bg-transparent"
                  id=""
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="UAE">UAE</option>
                </select>
                <input
                  className="text-[color:var(--mono-90,#18181B)] bg-transparent w-full text-base focus:outline-none not-italic font-medium leading-6"
                  type="text"
                  maxLength={3}
                  required
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
                <input
                  type="number"
                  required
                  maxLength={12}
                  value={mobilenumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="text-[color:var(--mono-90,#18181B)] bg-transparent w-fit text-base focus:outline-none not-italic font-medium leading-6"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center gap-2 self-stretch px-5 py-4 rounded-xl bg-[#0858F7] text-[color:var(--mono-0,#FFF)] text-center text-base not-italic font-bold leading-6"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <div className="flex flex-col justify-center items-start gap-10 flex-[1_0_0] self-stretch lg:px-[132px] lg:py-60 px-5">
            <div className="flex flex-col items-start gap-4 self-stretch">
              <h1 className="self-stretch text-[color:var(--mono-90,#18181B)] text-[28px] not-italic font-bold leading-8 tracking-[-0.28px]">
                Enter the verification code to continue
              </h1>
              <p className="self-stretch text-black/50 text-base not-italic font-medium leading-6">
                We sent to{" "}
                <span className="text-[#0858F7]">hellouser@heads.design</span>.
                If you don’t see it, check your spam.
              </p>
            </div>
            <OtpInput
              numberOfInputs={6}
              onChange={handleOtpChange}
              value={otp}
              on
              handleSubmit={handleOTPSubmit}
            />
            <div className="flex justify-between items-start self-stretch">
              <button
                onClick={() => setHasFilled(false)}
                className="flex justify-center items-center gap-2 text-[color:var(--color-brand-50,#0858F7)] text-center text-base not-italic font-bold leading-6"
              >
                Back
              </button>
              <div className="flex justify-center items-center gap-2">
                {timerEnded ? (
                  <button className="text-[#0858F7] text-sm font-semibold leading-[120%]">
                    Resend OTP
                  </button>
                ) : (
                  <button
                    disabled
                    className="text-black/20 cursor-not-allowed text-sm font-normal leading-[120%]"
                  >
                    Resend OTP in {formatTime(seconds)}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div id="recaptcha"></div> */}
      {verified && (
        <div className="w-full h-screen fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="max-w-[596px] max-h-[346px] aspect-[2.3/1] w-full shrink-0 rounded-[34px] flex bg-white flex-col items-center">
            <div className="w-1/2 aspect-square shrink-0 overflow-hidden">
              <Image
                src={verfiedGif}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-black text-[32px] not-italic font-bold leading-[normal]">
              You are Verified now!
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
