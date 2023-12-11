"use client";

import React, { useEffect,useState } from "react";
import loginplaceholder from "../../../../public/login.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/Modules/Otp/OtpInput";
import { auth } from '../../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobilenumber, setMobileNumber] = useState('');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [timerEnded, setTimerEnded] = useState(false);
  const router = useRouter();
  const generateRecaptcha = () => {
    const recaptchaElement = document.getElementById('recaptcha');
    recaptchaElement.innerHTML = '';
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    }, auth);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(auth);
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const phoneNumber = `${countryCode}${mobilenumber}`;
    console.log(phoneNumber)
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult)
        // Redirect or perform any other action if needed
        
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
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
  const handleOTPSubmit = (e) => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult
    confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      let user = result.user;
      console.log(user);
      alert('User signed in successfully');
      router.push('/auth/register')
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      alert('User couldn\'t sign in (bad verification code?)');
    });
  }
  return (
    <main className="flex max-w-[1512px] max-h-[982px] h-screen overflow-hidden justify-center items-center xl:px-[268px] xl:py-[107px]">
      <div className="flex max-w-[976px] max-h-[768px] items-start justify-between gap-[69px] shrink-0 overflow-hidden">
        <div className="flex-[1_0_0] self-stretch lg:flex hidden justify-center items-center overflow-hidden w-full aspect-[9/16] shrink-0">
          <Image
            src={loginplaceholder}
            alt=""
            className="w-full h-full object-cover shrink-0"
          />
        </div>
        {!hasFilled? (<form
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
        </form>):(
          <div className="flex flex-col justify-center items-start gap-10 flex-[1_0_0] self-stretch lg:px-[132px] lg:py-60 px-5">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h1 className="self-stretch text-[color:var(--mono-90,#18181B)] text-[28px] not-italic font-bold leading-8 tracking-[-0.28px]">
              Enter the verification code to continue
            </h1>
            <p className="self-stretch text-black/50 text-base not-italic font-medium leading-6">
              We sent to{" "}
              <span className="text-[#0858F7]">hellouser@heads.design</span>. If
              you don’t see it, check your spam.
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
      <div id="recaptcha"></div>
    </main>
  );
};

export default Login;
