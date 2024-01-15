"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/Modules/Otp/OtpInput";
import { auth } from "../../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  IoAdd,
  IoCloseCircleSharp,
  IoReturnUpBackOutline,
} from "react-icons/io5";
import axios from "@/utils/axios";
import Link from "next/link";
import verfiedGif from "../../../../public/otpSubmit.gif";
import submittedGif from "../../../../public/formSubmit.gif";
import { FaCamera, FaChevronRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import s3ImageUplaod from "@/utils/imageUploader";

const Professions = [
  "Photographer",
  "Designer",
  "Developer",
  "Software Developer",
];

const CollegeName = ["JNU", "DU", "DTU", "IIT Delhi", "NIT Delhi"];
const Experience = ["0-1", "1-3", "3-5", "5+"];

const Login = () => {
  const [document, setDocument] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
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
  const [galleryImages, setGalleryImages] = useState(["", "", "", "", "", ""]);
  const [galleryImagesFile, setGalleryImagesFile] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form4Obj, setForm4Obj] = useState({});
  const router = useRouter();

  useEffect(() => {
    setDocument(window.document);
  }, []);

  function handleNext() {
    if (formCount === 5) {
      setCount(formCount + 1);
      setTimeout(() => {
        // router.push("/");
      }, 250);
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

  const handleSendOtp = (e) => {
    e.preventDefault();
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const phoneNumber = `${countryCode}${mobilenumber}`;
    console.log(phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        handleNext();
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log("send otp error:", error);
      });
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

  const handleOTPSubmit = (e) => {
    e.preventDefault();
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
              setCount(formCount + 2);
            } else if (data.isUser === false) {
              localStorage.setItem("bfm-user-token", token);
              handleNext();
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

  const handleGalleryImageUpload = (index, file) => {
    if (file) {
      setGalleryImagesFile((prev) => {
        let tempArr = prev;
        tempArr[index] = file;
        return tempArr;
      });
      const imageUrl = URL.createObjectURL(file);
      setGalleryImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = imageUrl;
        return newImages;
      });
    }
  };

  const handleGalleryImageDelete = (index) => {
    setGalleryImagesFile((prev) => {
      let tempArr = prev;
      tempArr[index] = null;
      return tempArr;
    });
    setGalleryImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
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

  const handleTagInputChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === " " && currentTag.trim() !== "") {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
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
    if (formCount > 5) {
      setSubmitted(true);

      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [formCount]);

  async function handleRegister3(data) {
    try {
      // const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
      const token = localStorage.getItem("bfm-user-token");

      // Await the completion of the image upload
      const uploadedImageFileName = await s3ImageUplaod(imageFile);

      const res = await axios.post(
        "/auth/register",
        {
          image: uploadedImageFileName, // Use the uploaded image file name
          name: data.name,
          userName: data.username,
          email: data.email,
          profession: data.profession,
        },
        {
          headers: {
            idtoken: token,
          },
        }
      );

      return Promise.resolve(res);
    } catch (error) {
      console.log("register-axios-error: ", error);
      return Promise.reject(error);
    }
  }

  function handleSubmit3(e) {
    e.preventDefault();
    const f3KeyArr = ["name", "username", "email", "profession"];
    let f3Obj = {};
    for (let key of f3KeyArr) {
      f3Obj[key] = e.target[key].value;
    }
    console.log("f3Obj", f3Obj);
    handleRegister3(f3Obj)
      .then((res) => {
        console.log("register res:", res.status);
        if (res.status === 201) {
          console.log("next");
          handleNext();
        }
      })
      .catch((e) => {
        console.log("register error", e);
      });
  }

  function handleSubmit4(e) {
    e.preventDefault();
    const f4Obj = {
      experience: e.target["experience"].value,
      college_name: e.target["college_name"].value,
      tags: tags,
      document: documentFile,
    };
    setForm4Obj(f4Obj);
    handleNext();
  }

  const handleCreateProfile = async (data) => {
    /**
     * @returns {Json} as promise response from the server
     */

    const {
      experience,
      college_name,
      tags,
      document,
      description,
      social,
      imageGalleryFile,
    } = data;

    const token = localStorage.getItem("bfm-user-token");
    const imageKeyArr = Array(6);
    const documentKey = await s3ImageUplaod(document);

    await Promise.all(
      imageGalleryFile.map(async (file, index) => {
        if (file !== null) {
          imageKeyArr[index] = await s3ImageUplaod(file);
        } else {
          imageKeyArr[index] = null;
        }
      })
    );

    try {
      const response = await axios.post(
        "/userProfile/createProfile",
        {
          experience: experience,
          collegeName: college_name,
          tags: tags,
          certificate: documentKey,
          description: description,
          socialMediaLinks: social,
          images: imageKeyArr,
        },
        {
          headers: {
            idtoken: token,
          },
        }
      );
      return Promise.resolve(response);
    } catch (error) {
      console.log("axioserro: ", error);
      return Promise.reject(error);
    }
  };

  function handleSubmit5(e) {
    e.preventDefault();
    const f5Obj = {
      experience: form4Obj.experience,
      college_name: form4Obj.college_name,
      tags: form4Obj.tags,
      document: form4Obj.document,
      description: e.target["description"].value,
      social: e.target["social"].value,
      imageGalleryFile: galleryImagesFile,
    };
    handleCreateProfile(f5Obj)
      .then((res) => {
        console.log("profile:", res);
        alert("Profile is created succesfully ");
        router.push("/");
      })
      .catch((e) => {
        console.log("profile err", e);
      });
    console.log("f4 & f5:", f5Obj);
  }

  return (
    <main
      className="flex max-w-[1512px] lg:w-11/12 mx-auto h-screen md:overflow-hidden justify-center items-start lg:items-center"
      suppressHydrationWarning
    >
      <div className="w-full md:aspect-[2/1] shrink-0 py-14 lg:backdrop-blur-[16.213233947753906px] rounded-[14px] md:rounded-[34.921px] lg:bg-white/25 overflow-y-auto flex flex-col gap-[27px] items-center relative">
        <button
          onClick={handlePrevious}
          className="absolute lg:inset-x-12 lg:inset-y-7 inset-5 w-8 h-8 flex justify-center items-center rounded-xl shrink-0 bg-white text-black"
        >
          <IoReturnUpBackOutline /> {formCount}
        </button>
        <div className="lg:w-1/2 w-5/6 h-4 relative shrink-0 rounded-[53.067px] border-[1.327px] border-solid border-[rgba(255,255,255,0.48)]">
          <div
            style={{
              width: `${(formCount * 100) / 5}%`,
            }}
            className="h-4 shrink-0 rounded-[53.067px] absolute bg-white"
          ></div>
        </div>
        <div className="inline-flex flex-col md:w-[48%] items-center md:gap-[45px] gap-[34.161px] px-5 pt-[33.26px] bg-white shadow-[0px_4px_8px_0px_rgba(41,41,41,0.08)] md:pt-10 rounded-[14px] md:rounded-[40px]">
          <div className="flex lg:w-5/6 w-full mx-auto justify-between items-center gap-9">
            <div className="flex max-w-[669px] flex-col items-start md:gap-[29px] gap-[17.21px]">
              <h1 className="text-black md:text-[32px] text-[18.99px]  not-italic font-bold leading-[normal]">
                Profile Form
              </h1>
              <p className="text-black md:text-base text-[10.24px] not-italic font-normal leading-6">
                Please fill out the following information to create your
                profile.
              </p>
            </div>
            {formCount !== 1 && formCount !== 2 && (
              <div
                className={`md:w-[121.962px] md:h-[121.962px] w-[93.196px] h-[93.196px] relative shrink-0 rounded-[121.962px]`}
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
                  className="flex md:w-[38.418px] md:h-[37.031px] w-[29.357px] h-[28.297px] flex-col justify-center items-center gap-[12.274px] shrink-0 bg-[#DADADA] z-10 md:p-[12.274px] p-[9.379px] rounded-[71.19px] absolute bottom-0 right-0"
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
            )}
          </div>
          <div className="lg:w-5/6 w-full mx-auto">
            {formCount === 1 && (
              <form action="" className="" onSubmit={handleSendOtp}>
                <div className="flex flex-col items-start md:gap-5">
                  <div className="flex flex-col items-start gap-[7px]">
                    <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
                      Verify yourself
                    </h2>
                    <p className="max-w-[557px] text-[#666] md:text-base text-[10.24px] not-italic font-normal leading-6">
                      Please enter your phone number. You will receive a text
                      message to verify your account. Message & data rates may
                      apply.
                    </p>
                  </div>

                  <div className="flex flex-col w-full md:items-start items-center gap-[25.868px]">
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
                      className={`flex min-w-[200px] h-[50px] justify-center items-center pt-[12.461px] pb-[13.539px] px-12 rounded-[34.54px] text-[color:var(--Primary-blue,#FFF)] ${
                        mobilenumber.length === 10
                          ? "bg-[#925FF0]"
                          : "bg-[#925FF0] opacity-25 cursor-not-allowed"
                      } text-center md:text-[22.635px] text-[12.852px] not-italic font-normal leading-[normal]`}
                      disabled={mobilenumber.length !== 10}
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
              </form>
            )}
            {formCount === 2 && (
              <form
                action=""
                onSubmit={handleOTPSubmit}
                className="flex flex-col items-start gap-5"
              >
                <div className="flex flex-col items-start gap-[7px]">
                  <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
                    Verify yourself
                  </h2>
                  <p className="max-w-[557px] text-[#666] md:text-base text-[10.24px] not-italic font-normal leading-6">
                    Please enter your phone number. You will receive a text
                    message to verify your account. Message & data rates may
                    apply.
                  </p>
                </div>
                <div className="flex flex-col w-full lg:items-start items-center gap-[25.868px]">
                  <div className="flex w-full flex-col items-start gap-[4.317px]">
                    <p className="text-[#292929] md:text-base text-[10.24px] not-italic font-normal leading-[normal]">
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
                    className={`flex min-w-[200px] h-[50px] justify-center items-center pt-[12.461px] pb-[13.539px] px-12 rounded-[34.54px] text-[color:var(--Primary-blue,#FFF)] ${
                      otp.length !== 6
                        ? "bg-[#925FF0] opacity-25 cursor-not-allowed"
                        : "bg-[#925FF0]"
                    } text-center md:text-[22.635px] text-[12.852px] not-italic font-normal leading-[normal]`}
                    disabled={otp.length !== 6}
                  >
                    Verify
                  </button>
                </div>
              </form>
            )}
            {formCount === 3 && (
              <form
                action=""
                onSubmit={handleSubmit3}
                className="flex flex-col w-full justify-center items-center gap-[45px]"
              >
                <div className="flex flex-col items-start gap-5 w-full">
                  <div className="flex flex-col items-start text-left gap-[7px]">
                    <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
                      Personal Information
                    </h2>
                    <p className="text-black md:text-base text-[10.24px] not-italic font-normal leading-6">
                      Please provide your personal information below.{" "}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 w-full items-start content-start md:gap-[31px_20px] gap-[15px]">
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
                        placeholder="Harsh_12"
                        className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      />
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
                        placeholder="12345@gmail.com"
                        className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      />
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
                        required
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
                  type="submit"
                  className="flex justify-end items-center gap-2 rounded pl-8 pr-6 py-4 bg-[#925FF0] text-[color:var(--White,var(--Primary-blue,#FFF))] text-xl not-italic font-normal leading-[100%] tracking-[-1px]"
                >
                  Next <FaChevronRight />
                </button>
              </form>
            )}
            {formCount === 4 && (
              <form
                onSubmit={handleSubmit4}
                className="inline-flex flex-col items-center gap-[45px] w-full pt-10 rounded-[40px]"
              >
                <div className="flex flex-col items-start gap-5 w-full">
                  <div className="flex flex-col items-start text-left gap-[7px]">
                    <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
                      Professional Information
                    </h2>
                    <p className="text-black md:text-base text-[10.24px] not-italic font-normal leading-6">
                      Please provide your professional information below.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-1 grid-cols-1 w-full items-start content-start md:gap-[31px_20px] gap-5">
                    <div className="flex flex-col items-start gap-[5px]">
                      <label
                        htmlFor="experience"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        experience
                      </label>
                      <select
                        name="experience"
                        id="experience"
                        required
                        className="flex items-center border w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                      >
                        <option value="">0-1 years</option>
                        {Experience?.map((experience, index) => (
                          <option value={experience} key={index}>
                            {experience} years
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col items-start gap-[5px]">
                      <label
                        htmlFor="college_name"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        College name
                      </label>
                      <select
                        name="college_name"
                        id="college_name"
                        className="flex items-center border w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
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
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        tags
                      </label>
                      <div className="flex items-center content-center gap-[3.613px] self-stretch flex-wrap border-[solid_var(--main-colors-gray-05,#909090)] px-[10.116px] py-[7.226px] rounded-[5.781px] border-[1.445px]">
                        {tags.map((tag) => (
                          <div
                            key={tag}
                            className="flex h-6 justify-center items-center gap-0.5 border bg-[#E9DFFC] border-[#BE9FF6] pl-1.5 pr-2 py-1 rounded-xl text-[color:var(--Main-Colors-Purple-6,#784DC7)] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                          >
                            <button
                              type="button"
                              onClick={() => handleTagRemove(tag)}
                            >
                              <RxCrossCircled />
                            </button>
                            <span className="">{tag}</span>
                          </div>
                        ))}
                        <input
                          type="text"
                          name="skills"
                          id="skills"
                          required
                          placeholder="Frontend Developer"
                          value={currentTag}
                          onChange={handleTagInputChange}
                          onKeyPress={handleTagInputKeyPress}
                          className={`text-sm not-italic font-normal leading-[100%] w-1/2 h-full p-1 tracking-[-0.7px] flex-grow focus:outline-none ${
                            tags.length >= 4 ? "hidden" : "block"
                          }`}
                        />
                      </div>
                      <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
                        Maximum 4 skills
                      </p>
                    </div>
                  </div>
                  <div className="flex h-11 items-center gap-10 justify-between self-stretch border border-[#909090] p-3.5 rounded-lg">
                    <label
                      htmlFor="certification"
                      className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] whitespace-break-spaces break-words shrink text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                    >
                      {document?.getElementById("certification")?.value
                        ? document
                            ?.getElementById("certification")
                            ?.value?.slice(12, 40) + "..."
                        : "Upload your certification here"}
                    </label>
                    <input
                      type="file"
                      name="certification"
                      id="certification"
                      onChange={(e) => setDocumentFile(e.target.files[0])}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document?.getElementById("certification")?.click()
                      }
                      className="flex h-[31.259px] justify-center items-center gap-[2.605px] pl-[7.815px] pr-[10.42px] py-[5.21px] rounded-[15.63px] bg-[#E9DFFC] text-[color:var(--Main-Colors-Purple-6,#784DC7)] text-[18.235px] not-italic font-normal leading-[100%] tracking-[-0.912px]"
                    >
                      <MdOutlineUploadFile />
                      Upload
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex justify-end items-center gap-2 rounded pl-8 pr-6 py-4 bg-[#925FF0] text-[color:var(--White,var(--Primary-blue,#FFF))] text-xl not-italic font-normal leading-[100%] tracking-[-1px]"
                >
                  Next <FaChevronRight />
                </button>
              </form>
            )}
            {formCount === 5 && (
              <form
                action=""
                onSubmit={handleSubmit5}
                className="flex flex-col items-start gap-[30px] self-stretch w-full"
              >
                <div className="flex flex-col items-start gap-[7px]">
                  <h5 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
                    Show Your Gigs
                  </h5>
                  <p className="text-black md:text-base text-[10.24px] not-italic font-normal leading-6">
                    Describe your gigs that you have worked on.{" "}
                  </p>
                </div>
                <div className="flex flex-col lg:items-start items-center gap-[30px] self-stretch">
                  <div className="flex flex-col items-start gap-2.5 self-stretch">
                    <label
                      htmlFor="description"
                      className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[10.24px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                    >
                      tell us about yourself
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      required
                      className="w-full resize-none focus:outline-none h-full text-[#9F9F9F] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] flex flex-col items-start gap-[var(--numberLength,0px)] self-stretch border-[color:var(--Main-Colors-Purple-3,#BE9FF6)] pl-5 pr-2.5 pt-3.5 pb-2.5 rounded-lg border-[1.2px] border-solid"
                      placeholder="Describe your Gig"
                      cols="30"
                      rows="10"
                      minLength={100}
                      maxLength={1000}
                    ></textarea>
                  </div>
                  <div className="flex flex-col items-start gap-[5px] self-stretch">
                    <label
                      htmlFor="social"
                      className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[10.24px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                    >
                      attach your social media link
                    </label>
                    <input
                      type="url"
                      name="social"
                      id="social"
                      className="flex items-center gap-[5px] self-stretch border focus:outline-none w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                      placeholder="Behance or linkedin"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-[5px] self-stretch">
                    <label
                      htmlFor=""
                      className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[10.24px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                    >
                      Upload Your Gigs
                    </label>
                    <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px]">
                      Upload upto 6 Gigs in png, jpeg, jpg
                    </p>
                    <div className="grid grid-cols-3 gap-2 w-full relativee">
                      {galleryImages?.map((image, index) => (
                        <div
                          key={index}
                          className={`${
                            index === 0
                              ? "col-span-2 row-span-2"
                              : "col-span-1 row-span-1"
                          } shrink-0 md:rounded-[10.477px] rounded overflow-hidden`}
                        >
                          {image ? (
                            <div
                              className={`w-full aspect-square flex justify-center relative items-center overflow-hidden`}
                            >
                              <img
                                src={image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute group inset-2 flex">
                                <div
                                  onClick={() =>
                                    handleGalleryImageDelete(index)
                                  }
                                  className="w-[28px] h-[28px] lg:group-hover:scale-y-[100%] transition-all duration-300 ease-in-out lg:scale-y-0 lg:transform flex justify-center items-center text-2xl rounded-xl shrink-0 bg-black/50 text-white"
                                >
                                  <IoCloseCircleSharp />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <label
                              htmlFor={`imageInput${index}`}
                              className={`max-w-[100%]  self-stretch aspect-square object-cover bg-[#E1CAFF] text-[#9747FF] shrink-0 flex justify-center items-center rounded`}
                            >
                              <IoAdd className="text-6xl" />
                              <input
                                type="file"
                                id={`imageInput${index}`}
                                name={`imageInput${index}`}
                                className="hidden"
                                required={false}
                                onChange={(e) =>
                                  handleGalleryImageUpload(
                                    index,
                                    e.target.files[0]
                                  )
                                }
                              />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex w-[16.701px] h-[16.701px] justify-center items-center shrink-0">
                      <input
                        type="checkbox"
                        name="legalization"
                        id="legalization"
                        required
                        className="border border-[#925ff0] rounded appearance-none w-full h-full object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
                      />
                    </div>
                    <label
                      htmlFor="legalization"
                      className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-sm text-[10.628px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
                    >
                      All the porjects showed here are made by the potential
                      user and not copied from any other sources.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="flex justify-center items-center gap-[6.073px] pl-[24.292px] pr-[18.219px] py-[12.146px] rounded-[3.036px] bg-[#925FF0] text-[color:var(--White,var(--Primary-blue,#FFF))] text-[12.85px] not-italic font-normal leading-[100%] tracking-[-0.643px]"
                  >
                    Submit
                    <BsCheckCircleFill />
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="max-w-[669px] mx-auto w-5/6 h-px bg-[#BABABA]"></div>
          <div className="flex flex-col items-start gap-[19px] mx-auto w-5/6">
            <h5 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
              Need Help?
            </h5>
            <p className="max-w-[670px] text-black md:text-base text-[10.24px] not-italic font-normal leading-6">
              Check out our help section for additional information and
              resources on how to create a successful sellers profile.{" "}
            </p>
            <Link
              href={"https://www.blackfoxmetaverse.in/"}
              target="_blank"
              className="flex justify-center items-center gap-[5px] rounded px-4 py-2 bg-[#73A876] text-[color:var(--White,var(--Primary-blue,#FFF))] md:text-base text-[10.24px] not-italic font-normal leading-6"
            >
              Contact Us
            </Link>
          </div>
          <div className="inline-flex items-start gap-10 justify-between">
            <Link
              href={"#"}
              className="text-black md:text-base text-[10.24px] not-italic font-normal leading-6"
            >
              Terms and Conditions
            </Link>
            <Link
              href={"#"}
              className="text-black md:text-base text-[10.24px] not-italic font-normal leading-6"
            >
              Privacy Policy
            </Link>
            <Link
              href={
                "https://www.linkedin.com/company/black-fox-millennium/about/"
              }
              target="_blank"
              className="text-black md:text-base text-[10.24px] not-italic font-normal leading-6"
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
                  className="text-[color:var(--mono-90,#18181B)] bg-transparent w-full md:text-base text-[10.24px] focus:outline-none not-italic font-medium leading-6"
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
                  className="text-[color:var(--mono-90,#18181B)] bg-transparent w-fit md:text-base text-[10.24px] focus:outline-none not-italic font-medium leading-6"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center gap-2 self-stretch px-5 py-4 rounded-xl bg-[#0858F7] text-[color:var(--mono-0,#FFF)] text-center md:text-base text-[10.24px] not-italic font-bold leading-6"
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
              <p className="self-stretch text-black/50 md:text-base text-[10.24px] not-italic font-medium leading-6">
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
                className="flex justify-center items-center gap-2 text-[color:var(--color-brand-50,#0858F7)] text-center md:text-base text-[10.24px] not-italic font-bold leading-6"
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
      */}
      {verified && (
        <div className="w-full h-screen fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="max-w-[596px] max-h-[346px] aspect-[2.3/1] w-full shrink-0 rounded-[34px] flex bg-white flex-col items-center pb-[77px]">
            <div className="w-1/2 aspect-square shrink-0 overflow-hidden">
              <Image
                src={verfiedGif}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
              You are Verified now!
            </p>
          </div>
        </div>
      )}
      {submitted && (
        <div className="w-full h-screen fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="max-w-[596px] max-h-[346px] aspect-[2.3/1] w-full shrink-0 rounded-[34px] flex bg-white flex-col items-center pb-[77px]">
            <div className="w-1/3 aspect-square shrink-0 overflow-hidden">
              <Image
                src={submittedGif}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="gap-[30px] flex flex-col justify-center items-center w-full">
              <h4 className="text-[#212121] text-center w-full text-3xl not-italic font-bold leading-[normal]">
                Thank you for Subscribing!
              </h4>
              <p className="w-3/4 text-[#212121] text-center text-lg not-italic font-normal leading-[normal]">
                You have successfully subscribed to our list. We will let you
                know when we launch.
              </p>
            </div>
          </div>
        </div>
      )}
      <div id="recaptcha"></div>
    </main>
  );
};

export default Login;
