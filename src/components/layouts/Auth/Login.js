"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
import {
  FaCamera,
  FaChevronRight,
  FaDribbble,
  FaLinkedinIn,
} from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import s3ImageUplaod from "@/utils/imageUploader";
import { RiInstagramFill } from "react-icons/ri";
import { SiBehance } from "react-icons/si";
import Toast from "@/components/Modules/Toast/Toast";
import { updateUserLocation } from "@/utils/location";

const Professions = [
  "Photographer",
  "Designer",
  "Developer",
  "Software Developer",
];

const toastType = {
  one: {
    is: true,
    type: "error",
    msg: "OTP can not be send right now !!!",
  },
  two: {
    is: true,
    type: "error",
    msg: "OTP is not valid !!!",
  },
  threePic: {
    is: true,
    type: "warning",
    msg: "Looks like you missed the profile picture !!!",
  },
  threeIsUser: {
    is: true,
    type: "warning",
    msg: "You are already regirted ,Please complete your profile",
  },
  threeUserDone: {
    is: true,
    type: "success",
    msg: "Registration completed, Please complete your profile",
  },
  threeUserError: {
    is: true,
    type: "error",
    msg: "Registration can not be done !!!",
  },
  fiveDone: {
    is: true,
    type: "success",
    msg: "Profile making completed",
  },
  fiveError: {
    is: true,
    type: "error",
    msg: "Not able to complete profile !!!",
  },
};

const SocialTypes = [
  {
    name: "Linked In",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    icon: <RiInstagramFill />,
  },
  {
    name: "Behance",
    icon: <SiBehance />,
  },
  {
    name: "Dribble",
    icon: <FaDribbble />,
  },
];

const CollegeName = ["JNU", "DU", "DTU", "IIT Delhi", "NIT Delhi"];
const Experience = ["0-1", "1-3", "3-5", "5+"];

const Login = () => {
  const router = useRouter();
  const pathname = usePathname();
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
  let toastTimeout; // tracking the toast setTimeout
  let checkUserNameTimeout;
  let checkEmailTimeout;

  const [document, setDocument] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [countryCode, setCountryCode] = useState("+91");
  const [mobilenumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [formCount, setCount] = useState(4);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageKey, setImageKey] = useState(null);
  const [galleryImages, setGalleryImages] = useState(["", "", "", "", "", ""]);
  const [galleryImagesFile, setGalleryImagesFile] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [experiences, setExperiences] = useState([]); //TODO : state for exs,,
  const [form4Obj, setForm4Obj] = useState({});
  const [toast, setToast] = useState({
    is: false,
    type: "",
    msg: "",
  });

  const [isUniqueUsername, setIsUniqueUserName] = useState(false);
  const [isUniqueEmail, setIsUniqueEmail] = useState(false);

  function handleToast(type, duration = 1500) {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    setToast(type);

    toastTimeout = setTimeout(() => {
      setToast({
        is: false,
        type: "",
        msg: "",
      });
    }, duration);
  }

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

  const handleServiceInputChange = (e) => {
    setCurrentService(e.target.value);
  };

  const handleServiceInputKeyPress = (e) => {
    if (e.key === " " && currentService.trim() !== "") {
      e.preventDefault();
      setServices((prevServices) => [...prevServices, currentService.trim()]);
      setCurrentService("");
    }
  };

  const handleServiceRemove = (ServiceToRemove) => {
    setServices((prevServices) => prevServices.filter((Service) => Service !== ServiceToRemove));
  };

  //--------------user to backend interaction-------------
  async function loginUser(token) {
    try {
      const response = await axios.post("/user/login", null, {
        headers: {
          idtoken: `${token}`,
        },
      });
      const data = response?.data;
      if (data?.check?.isUser) {
        const ok = await updateUserLocation(token);
        console.log("user location updated:", ok);
      }
      return Promise.resolve(data);
    } catch (e) {
      console.log("axios error: ", e.message);
      return Promise.reject(e.message);
    }
  }

  async function handleRegister3(data) {
    try {
      const token = localStorage.getItem("bfm-user-token");

      let uploadedImageFileName = imageKey ? imageKey : "";
      if (imageFile !== null) {
        uploadedImageFileName = await s3ImageUplaod(imageFile);
      }

      const res = await axios.post(
        "/user/createUser",
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

      if (res.status === 201) {
        const ok = await updateUserLocation(token);
        console.log("user location updated:", ok);
      }

      return Promise.resolve(res);
    } catch (error) {
      console.log("register-axios-error: ", error);
      return Promise.reject(error);
    }
  }

  async function handleCreateProfile(data) {
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
      experienceDetail,
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
        "/user/createProfile",
        {
          experience: experience,
          collegeName: college_name,
          tags: tags,
          certificate: documentKey,
          description: description,
          socialMediaLinks: social,
          experienceDetail: experienceDetail,
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
  }

  const [username, setUsername] = useState("");
  function checkUserName(UserName) {
    setUsername(UserName.target.value);
    if (UserName === "") return false;
    if (checkUserNameTimeout) {
      clearTimeout(checkUserNameTimeout);
    }
    checkUserNameTimeout = setTimeout(() => {
      axios
        .get(`/check/userName?userName=${UserName.target.value}`)
        .then((res) => {
          setIsUniqueUserName(res.data);
        })
        .catch((err) => {
          console.log("checkUserName err", err);
        });
    }, 300);
  }

  const [email, setEmail] = useState("");
  function checkEmail(email) {
    setEmail(email.target.value);
    if (email === "") return false;
    if (checkEmailTimeout) {
      clearTimeout(checkEmailTimeout);
    }
    checkEmailTimeout = setTimeout(() => {
      axios
        .get(`/check/email?email=${email.target.value}`)
        .then((res) => {
          setIsUniqueEmail(res.data);
        })
        .catch((err) => {
          console.log("checkemail err", err);
        });
    }, 300);
  }

  //--------------user to backend interaction-------------

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
        handleToast(toastType.one, 3000);
        console.log("send otp error:", error);
      });
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        let token = result.user.accessToken;

        console.log("token: ", token);
        localStorage.setItem("bfm-user-token", token);

        loginUser(token).then((data) => {
          const { check, message, details } = data;

          if (check.isProfile && check.isUser) {
            router.replace("/thanksPage/already");
          }
          if (check.isUser && !check.isProfile) {
            handleToast(toastType.threeIsUser, 2500);
            setImage(s3Url + details.user.image);
            setImageKey(details.user.image);
            setCount(4);
          } else {
            setCount(3);
          }
        });
        setVerified(true);

        const timer = setTimeout(() => {
          setVerified(false);
        }, 2000);

        return () => clearTimeout(timer);
      })
      .catch((error) => {
        handleToast(toastType.two, 2500);
        window.location.reload();
        console.log("user login error:", error);
      });
  };

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
          handleToast(toastType.threeUserDone, 2500);
          setCount(4);
        }
      })
      .catch((e) => {
        handleToast(toastType.threeUserError, 2500);
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
    // setCount(5);
    handleNext();
  }

  function handleSubmit5(e) {
    e.preventDefault();
    const f5Obj = {
      experience: form4Obj.experience,
      college_name: form4Obj.college_name,
      tags: form4Obj.tags,
      document: form4Obj.document,
      description: e.target["description"].value,
      social: e.target["social"].value,
      experienceDetail: experiences,
      imageGalleryFile: galleryImagesFile,
    };
    handleCreateProfile(f5Obj)
      .then((res) => {
        console.log("profile:", res);
        handleToast(toastType.fiveDone, 2500);
        router.replace("/thanksPage/completed");
      })
      .catch((e) => {
        console.log("profile err", e);
        handleToast(toastType.fiveError, 2500);
      });
    console.log("f4 & f5:", f5Obj);
  }

  useEffect(() => {
    if (formCount > 5) {
      setSubmitted(true);

      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [formCount]);

  useEffect(() => {
    setDocument(window.document);
  }, []);

  useEffect(() => {
    const handlePopstate = () => {
      // Handle the popstate event here
      if (pathname === "/auth/login") {
        // Check if the user is on the login page
        // and update the formCount accordingly
        if (formCount === 1) {
          router.back();
        } else {
          setCount(formCount - 1);
        }
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("popstate", handlePopstate);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [pathname]);

  function handleExperinces({ index, key, value }) {
    setExperiences((prev) => {
      prev[index][key] = value;
      return [...prev];
    });
  }

  return (
    <main
      className="flex max-w-[1920px] lg:w-11/12 mx-auto h-screen overflow-hidden justify-center 3xl:items-start 3xl:mt-5 md:items-center items-start"
      suppressHydrationWarning
    >
      <div className="w-full 2xl:aspect-[2/1] xl:aspect-[1.5/1] lg:aspect-[1.4/1] max-h-screen shrink-0 pt-14 sm:backdrop-blur-[16.213233947753906px] rounded-[14px] sm:rounded-[34.921px] lg:bg-white/25 md:overflow-hidden flex flex-col gap-[27px] items-center relative">
        <button
          onClick={handlePrevious}
          className="absolute lg:inset-x-12 lg:inset-y-7 inset-5 w-8 h-8 flex justify-center items-center rounded-xl shrink-0 bg-white text-black"
        >
          <IoReturnUpBackOutline strokeLinejoin="inherit" />
        </button>
        <div className="xl:w-1/2 w-5/6 h-4 relative shrink-0 rounded-[53.067px] border-[1.327px] border-solid border-[rgba(255,255,255,0.48)] mt-2">
          <div
            style={{
              width: `${(formCount * 100) / 5}%`,
            }}
            className="h-4 shrink-0 rounded-[53.067px] absolute bg-white transition-all duration-700 ease-in-out"
          ></div>
        </div>
        <div className="xl:w-1/2 sm:w-5/6 w-full overflow-auto rounded-[14px] sm:rounded-t-[40px] sm:rounded-b-[0px] lg:my-0 my-5">
          <div className="inline-flex flex-col w-full items-center md:gap-[45px] gap-[21px] px-5 md:px-10 pt-[33.26px] md:pt-10 bg-white shadow-[0px_4px_8px_0px_rgba(41,41,41,0.08)] rounded-[14px] sm:rounded-[40px]">
            <div className="flex lg:w-5/6 w-full mx-auto justify-between items-center gap-9">
              <div className="flex max-w-[669px] flex-col items-start md:gap-[29px] gap-[17.21px]">
                <h1 className="text-black md:text-[32px] text-[18.99px]  not-italic font-bold leading-[normal]">
                  Profile Form
                </h1>
                <p className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6">
                  Please fill out the following information to create your
                  profile.
                </p>
              </div>
              {formCount !== 1 && formCount !== 2 && (
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
              )}
            </div>
            <div className="lg:w-5/6 w-full mx-auto">
              {formCount === 1 && (
                <form onSubmit={handleSendOtp}>
                  <div className="flex flex-col items-start md:gap-5 space-y-3">
                    <div className="flex flex-col items-start gap-[7px]">
                      <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
                        Verify yourself
                      </h2>
                      <p className="max-w-[557px] text-[#666] md:text-base text-[12.24px] not-italic font-normal md:leading-6">
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
                          className="text-[#111] lg:text-[19.401px] sm:text-base text-sm not-italic w-10 font-normal leading-[normal] focus:outline-none"
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
                            const inputValue = e.target.value.replace(
                              /\D/g,
                              ""
                            );
                            setMobileNumber(inputValue.slice(0, 10));
                          }}
                          className="text-[#111] lg:text-[19.401px] sm:text-base text-sm w-full not-italic font-normal leading-[normal] focus:outline-none"
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
                    <p className="max-w-[557px] text-[#666] md:text-base text-[12.24px] not-italic font-normal md:leading-6">
                      Please enter your phone number. You will receive a text
                      message to verify your account. Message & data rates may
                      apply.
                    </p>
                  </div>
                  <div className="flex flex-col w-full lg:items-start items-center gap-[25.868px]">
                    <div className="flex w-full flex-col items-start gap-[4.317px]">
                      <p className="text-[#292929] md:text-base text-[12.24px] not-italic font-normal leading-[normal]">
                        Enter OTP
                      </p>
                      <OtpInput
                        numberOfInputs={6}
                        onChange={handleOtpChange}
                        value={otp}
                        on
                        //handleSubmit={handleNext}
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
                          onChange={checkUserName}
                          placeholder="Harsh_12"
                          className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                        />
                        {username !== "" &&
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
                          onChange={checkEmail}
                          placeholder="12345@gmail.com"
                          className="flex items-center gap-[5px] border w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                        />
                        {email !== "" &&
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
                          required
                          className="flex items-center border focus:outline-none w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                        >
                          <option value="" className="text-[#9F9F9F]">
                            Select Profession
                          </option>
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
                  action=""
                  onSubmit={handleSubmit4}
                  className="inline-flex flex-col items-center gap-[45px] w-full md:pt-10 rounded-[40px]"
                >
                  <div className="flex flex-col items-start gap-5 w-full">
                    <div className="flex flex-col items-start text-left gap-[7px]">
                      <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
                        Professional Information
                      </h2>
                      <p className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6">
                        Please provide your professional information below.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 w-full items-start content-start md:gap-[20px] gap-5">
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
                          className="flex items-center border selection:bg-gray-800 w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                        >
                          {/* <option value="">0-1 years</option> */}
                          {Experience?.map((experience, index) => (
                            <option
                              className="appearance-none py-5 bg-slate-200"
                              value={experience}
                              key={index}
                            >
                              {experience} years
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col items-start gap-[5px]">
                        <label
                          htmlFor="city"
                          className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                        >
                          city
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Delhi"
                          className="flex items-center gap-[5px] self-stretch border focus:outline-none w-full sm:text-sm text-[10px] not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] xl:p-3.5 lg:p-2.5 p-1.5 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col col-span-2 items-start gap-[5px]">
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
                      <div className="flex flex-col col-span-2 items-start justify-center gap-[5px]">
                        <label
                          htmlFor="services"
                          className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                        >
                          services
                        </label>
                        <div className="flex items-center content-center gap-[3.613px] self-stretch flex-wrap border-[solid_var(--main-colors-gray-05,#909090)] px-[10.116px] py-[7.226px] rounded-[5.781px] border-[1.445px]">
                          {services.map((service) => (
                            <div
                              key={service}
                              className="flex h-6 justify-center items-center gap-0.5 border bg-[#E9DFFC] border-[#BE9FF6] pl-1.5 pr-2 py-1 rounded-xl text-[color:var(--Main-Colors-Purple-6,#784DC7)] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                            >
                              <button
                                type="button"
                                onClick={() => handleServiceRemove(service)}
                              >
                                <RxCrossCircled />
                              </button>
                              <span className="">{service}</span>
                            </div>
                          ))}
                          <input
                            type="text"
                            name="services"
                            id="services"
                            placeholder="Developement"
                            value={currentService}
                            onChange={handleServiceInputChange}
                            onKeyPress={handleServiceInputKeyPress}
                            className={`text-sm not-italic font-normal leading-[100%] w-fit h-full p-1 tracking-[-0.7px] flex-grow focus:outline-none ${
                              services.length === 7 ? "hidden" : "block"
                            }`}
                          />
                        </div>
                        {/* <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
                          Maximum 4 skills
                        </p> */}
                      </div>
                      <div className="flex flex-col col-span-2 items-start justify-center gap-[5px]">
                        <label
                          htmlFor="skills"
                          className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                        >
                          skills
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
                            placeholder="Frontend_Developer"
                            value={currentTag}
                            onChange={handleTagInputChange}
                            onKeyPress={handleTagInputKeyPress}
                            className={`text-sm not-italic font-normal leading-[100%] w-fit h-full p-1 tracking-[-0.7px] flex-grow focus:outline-none ${
                              tags.length === 7 ? "hidden" : "block"
                            }`}
                          />
                        </div>
                        <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
                          Maximum 4-7 skills
                        </p>
                      </div>
                    </div>
                    <div className="flex h-11 items-center gap-10 justify-between self-stretch border border-[#909090] p-3.5 rounded-lg">
                      <label
                        htmlFor="certification"
                        className={`${
                          document?.getElementById("certification")?.value
                            ? "text-black"
                            : "text-[color:var(--Main-Colors-Gray-0,#9F9F9F)]"
                        } whitespace-break-spaces break-words shrink text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]`}
                      >
                        {document?.getElementById("certification")?.value
                          ? document
                              ?.getElementById("certification")
                              ?.value?.slice(12, 40) + "..."
                          : "Upload your resume here"}
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
                  className="flex flex-col items-start gap-[22.77px] self-stretch w-full"
                >
                  <div className="flex flex-col items-start gap-[7px]">
                    <h5 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
                      Show Your Gigs
                    </h5>
                    <p className="text-black md:text-base text-xs not-italic font-normal leading-6">
                      Describe your gigs that you have worked on.{" "}
                    </p>
                  </div>
                  <div className="flex flex-col lg:items-start items-center gap-[30px] self-stretch">
                    <div className="flex flex-col items-start gap-2.5 self-stretch">
                      <label
                        htmlFor="description"
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-xs not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
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
                    <div className="flex flex-col gap-2 self-stretch">
                      <label
                        htmlFor="social"
                        className="col-span-2 text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[10.24px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
                      >
                        Social Media
                      </label>
                      <div className="flex gap-2 items-center">
                        <div
                          className={`flex max-w-[155px] justify-between items-center border sm:text-sm text-xs border-[solid_var(--main-colors-gray-05,#909090)] xl:p-3.5 lg:p-2.5 p-1.5 rounded-lg`}
                        >
                          <select
                            name="socialType"
                            id="socialType"
                            className="focus:outline-none"
                          >
                            <option
                              value=""
                              className=" sm:text-sm text-[10px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
                            >
                              Select
                            </option>
                            {SocialTypes?.map((type, index) => (
                              <option
                                key={index}
                                value={type.name}
                                className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] sm:text-sm text-[10px] not-italic font-normal leading-[100%] tracking-[-0.7px] hover:bg-gray-200 px-3 py-2"
                              >
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="url"
                          name="social"
                          id="social"
                          className="flex items-center gap-[5px] self-stretch border focus:outline-none w-full sm:text-sm text-[10px] not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] xl:p-3.5 lg:p-2.5 p-1.5 rounded-lg"
                          placeholder="Behance or linkedin"
                        />
                      </div>
                    </div>
                    {experiences?.map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start gap-2.5 self-stretch"
                      >
                        <label className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize">
                          Experience
                        </label>
                        <label
                          htmlFor=""
                          className="flex h-4 items-start gap-2.5 self-stretch pb-[5px]"
                        ></label>
                        <input
                          type="text"
                          name="title_of_project"
                          id="title_of_project"
                          placeholder="Enter title of project"
                          className="text-sm not-italic font-normal border focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                          value={experiences[index]["title"]}
                          onChange={(e) => {
                            handleExperinces({
                              index: index,
                              key: "title",
                              value: e.target.value,
                            });
                          }}
                        />
                        <label
                          htmlFor=""
                          className="flex h-4 items-start gap-2.5 self-stretch pb-[5px]"
                        ></label>
                        <input
                          type="url"
                          name="url_of_project"
                          id="url_of_project"
                          placeholder="Paste link"
                          className="text-sm not-italic font-normal border focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
                          value={experiences[index]["link"]}
                          onChange={(e) => {
                            handleExperinces({
                              index: index,
                              key: "link",
                              value: e.target.value,
                            });
                          }}
                        />
                        <textarea
                          name="projectDescription"
                          id="projectDescription"
                          cols=""
                          rows="5"
                          minLength={69}
                          maxLength={500}
                          placeholder="Describe your project and services"
                          className="text-sm not-italic font-normal border focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg resize-none"
                          value={experiences[index]["description"]}
                          onChange={(e) => {
                            handleExperinces({
                              index: index,
                              key: "description",
                              value: e.target.value,
                            });
                          }}
                        ></textarea>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setExperiences(() => [
                          ...experiences,
                          { title: "", link: "", description: "" },
                        ])
                      }
                      className="flex w-full text-[#9870FFFC] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize bg-[#F8F8F8] h-[47px] justify-center items-center content-center gap-[9px] flex-wrap p-[4.97px] rounded-[9.111px]"
                    >
                      <IoAdd /> Add Experience
                    </button>
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
                                <IoAdd className="lg:text-6xl sm:text-5xl text-3xl" />
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
                        className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-sm text-[11.628px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
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
            <div className="max-w-[669px] mx-auto lg:w-5/6 w-full h-px bg-[#BABABA]"></div>
            <div className="flex flex-col items-start gap-[19px] mx-auto lg:w-5/6 w-full">
              <h5 className="text-black lg:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
                Need Help?
              </h5>
              <p className="max-w-[670px] text-black md:text-base text-[12.24px] not-italic font-normal md:leading-6 leading-[14px]">
                Check out our help section for additional information and
                resources on how to create a successful sellers profile.{" "}
              </p>
              <Link
                href={"https://www.blackfoxmetaverse.in/"}
                target="_blank"
                className="flex justify-center items-center gap-[5px] rounded px-4 py-2 bg-[#73A876] text-[color:var(--White,var(--Primary-blue,#FFF))] md:text-base text-[12.24px] not-italic font-normal leading-6"
              >
                Contact Us
              </Link>
            </div>
            <div className="inline-flex items-start gap-5 justify-around w-full sm:h-9 h-[22.86px]">
              <Link
                href={"#"}
                className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6"
              >
                Terms and Conditions
              </Link>
              <Link
                href={"#"}
                className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6"
              >
                Privacy Policy
              </Link>
              <Link
                href={
                  "https://www.linkedin.com/company/black-fox-millennium/about/"
                }
                target="_blank"
                className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6"
              >
                Social Media
              </Link>
            </div>
          </div>
        </div>
      </div>
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
      {toast?.is && <Toast type={toast?.type} message={toast?.msg} />}
    </main>
  );
};

export default Login;
