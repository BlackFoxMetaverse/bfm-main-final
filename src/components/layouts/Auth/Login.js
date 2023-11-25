"use client";

import React, { useState } from "react";
import loginplaceholder from "../../../../public/login.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/auth/login/otp");
  };

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
      </div>
    </main>
  );
};

export default Login;
