"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../../../assets/light_logo.svg";
import OtpInput from "@/components/Modules/Otp/OtpInput";
import axios from "axios";
import PreLoader from "@/components/Modules/Preloader/preLoader";
import { auth } from "../../../../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
} from "firebase/auth";
import instance from "@/utils/axios";
const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [number, setNumber] = useState("");
  const [numberLength, setLength] = useState(0);
  const [isFilled, setFilled] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const router = useRouter();

  // const handleOtpSubmit = (e) => {
  //   e.preventDefault();
  //   router.replace("/admin/user");
  // };

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  const handleNumberInput = async (e) => {
    setNumber(e.target.value);
    setLength(e.target.value.toString().length);
    // const phone_number = encodeURIComponent(countryCode + e.target.value);
    // if (e.target.value.toString().length === 10) {
    //   await axios
    //     .get(`${checkAdminUri}${phone_number}`)
    //     .then((response) => {
    //       setAdmin(response.data);
    //       setChecked(true);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setChecked(true);
    //     });
    // } else {
    //   setAdmin(false);
    //   setChecked(false);
    // }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken;
      const userEmail = result.user.email;
      console.log("User email:", userEmail);
      const response = await instance.get("/super_user/login", {
        headers: {
          token: token,
        },
      });

      if (response.status === 200) {
        console.log(response);
        router.replace("/admin/user");

        // setAdminPrevilages(response?.data);
      } else {
        // setAdminPrevilages("Internal Server Error");
      }
      localStorage.setItem("bfm-admin-token", token);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert(error?.message);
    }
  };

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

  const handleNumberSubmit = (e) => {
    e.preventDefault();
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const phoneNumber = `${countryCode}${number}`;
    console.log(phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setFilled(true);
      })
      .catch((error) => {
        // handleToast(toastType.one, 3000);
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

        localStorage.setItem("bfm-admin-token", token);

        // setVerified(true);
        router.replace("/admin/user");

        // const timer = setTimeout(() => {
        //   setVerified(false);
        // }, 2000);

        return () => clearTimeout(timer);
      })
      .catch((error) => {
        window.location.reload();
        console.log("user login error:", error);
      });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden justify-center space-y-20 items-center xl:px-[288px] ">
      <div className=" w-full flex flex-col items-center space-y-10 justify-center">
        <Image src={Logo} alt="" className=" w-1/4  fill-white" />
        <p className="self-stretch text-white text-center text-lg not-italic font-bold leading-[normal] uppercase">
          Local Talent, Global Impact: Connecting You to Services Near and Far!
        </p>
      </div>
      <div className="flex w-2/3 py-[35px] rounded-[40px]  bg-white  items-center justify-center gap-[69px] shrink-0 overflow-hidden">
        {!isFilled ? (
          <form
            onSubmit={handleNumberSubmit}
            className="flex max-w-[597px] flex-col justify-center items-center gap-[19px] shrink-0 self-stretch lg:pl-[27px] px-5 lg:pr-[26px]"
          >
            <div className="flex flex-col space-y-4 justify-center items-center">
              <h1 className="text-black text-[32px] not-italic font-bold leading-[normal]">
                WELCOME Admin!
              </h1>
              <p className=" text-[#666] text-center not-italic font-normal leading-[27px]">
                Pleae enter your phone number. You will receive a text message
                to verify your account. Message & data rates may apply.
              </p>
            </div>
            <div className="flex flex-col items-center gap-8 self-stretch">
              <div className="flex flex-col lg:max-w-[458px] bg-white rounded-xl items-start gap-1 px-4 py-3 bg-black/10">
                <label className="text-[color:var(--Main-Colors-Gray-4,#292929)] pl-2 text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize">
                  Enter Your Number
                </label>
                <div className="flex  lg:max-w-[458px] bg-white border-2 rounded-xl items-center gap-1 px-4 py-3 bg-black/10">
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
                    className="text-[color:var(--mono-90,#18181B)] bg-transparent w-[29px] text-base focus:outline-none not-italic font-medium leading-6"
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
                    value={number}
                    onChange={handleNumberInput}
                    className="text-[color:var(--mono-90,#18181B)] bg-transparent w-fit text-base focus:outline-none not-italic font-medium leading-6"
                  />
                </div>
                <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
                  You will receive an verification code on the number entered
                </p>
              </div>
            </div>
            <div className=" w-full flex justify-center items-center">
              <button
                type="submit"
                disabled={numberLength !== 10}
                className={`${
                  numberLength !== 10
                    ? "opacity-20 cursor-not-allowed"
                    : "opacity-1"
                } gap-2 self-stretch px-8 py-3 rounded-xl bg-[#925FF0] text-[color:var(--mono-0,#FFF)] text-center text-base not-italic font-bold leading-6`}
              >
                Verify
              </button>
            </div>
            {"or"}
            <br />
            {/* <button className="googleBtn" >
                <img src="/logo_google.svg" alt="" />
                Sign in with Google
              </button> */}
            <button
              class="flex items-center bg-white  border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={handleGoogleSignIn}
            >
              
              <span>Continue with Google</span>
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleOTPSubmit}
            className="flex max-w-[597px] flex-col justify-center items-center gap-[19px] shrink-0 self-stretch lg:pl-[27px] px-5 lg:pr-[26px]"
          >
            <div className="flex flex-col space-y-4 justify-center items-center">
              <h1 className="text-black text-[32px] not-italic font-bold leading-[normal]">
                WELCOME Admin!
              </h1>
              <p className=" text-[#666] text-center not-italic font-normal leading-[27px]">
                Pleae enter your phone number. You will receive a text message
                to verify your account. Message & data rates may apply.
              </p>
            </div>
            <div className="flex flex-col items-center gap-8 self-stretch">
              <div className="flex flex-col lg:max-w-[458px] bg-white rounded-xl items-start gap-1 px-4 py-3 bg-black/10">
                <label className="text-[color:var(--Main-Colors-Gray-4,#292929)] pl-2 text-base text-center w-full not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize">
                  Enter Verification Code
                </label>
                <OtpInput numberOfInputs={6} onChange={handleOtpChange} />
                {/* <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
                  You will receive an verification code on the number entered
                </p> */}
              </div>
            </div>
            <div className=" w-full flex justify-center items-center">
              <button
                type="submit"
                className="   gap-2 self-stretch px-8 py-3 rounded-xl bg-[#925FF0] text-[color:var(--mono-0,#FFF)] text-center text-base not-italic font-bold leading-6"
              >
                Verify
              </button>
            </div>
            <button className="googleBtn" onClick={handleGoogleSignIn}>
              <img src="/logo_google.svg" alt="" />
              Sign in with Google
            </button>
          </form>
        )}
        {/* <button
          onClick={handleGoogleSignIn}
          className="gap-2 self-stretch px-8 py-3 rounded-xl bg-[#DB4437] text-[color:var(--mono-0,#FFF)] text-center text-base not-italic font-bold leading-6"
        >
          Sign in with Google
        </button> */}
        {/* <button className="googleBtn" onClick={handleGoogleSignIn}>
              <img src="/logo_google.svg" alt="" />
              Sign in with Google
            </button> */}
      </div>
      <div className=" w-full flex flex-col items-center space-y-10 justify-center">
        <p className="self-stretch text-white text-center text-lg not-italic font-bold leading-[normal] uppercase">
          Discover More, Connect Locally
        </p>
      </div>
      <div className="absolute" id="recaptcha"></div>
    </div>
  );
};

export default Login;
