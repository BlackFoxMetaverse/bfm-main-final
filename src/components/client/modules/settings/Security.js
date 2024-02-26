"use client"

import OtpInput from "@/components/Modules/Otp/OtpInput";
import React, { useState } from "react";

// Reusable InputField Component
const InputField = ({ label, type, value }) => (
  <div>
    <label className="sr-only" htmlFor={label}>
      {label}
    </label>
    <input
      className="justify-center items-start w-full focus:outline-none py-4 pr-16 pl-4 mt-1.5 text-base tracking-tighter whitespace-nowrap bg-white rounded-lg text-neutral-400"
      type={type}
      id={label}
      value={value}
      aria-label={label}
    />
  </div>
);

// Main Authentication Form Component
const Security = () => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  return (
    <section className="flex flex-col px-10 py-8 text-lg leading-5 max-w-[847px] max-md:px-5">
      <header className="self-start text-4xl font-bold text-black max-md:max-w-full">
        Two-Factor Authentication
      </header>
      <div className="self-start mt-4 text-black leading-[150%] max-md:max-w-full">
        Please provide your professional information below.
      </div>
      <form action="" method="post" className="mt-10 space-y-9">
        <InputField
          label="Verify Email Address"
          type="email"
          value="randomemail@gmail.com"
        />
        <OtpInput numberOfInputs={6} onChange={handleOtpChange} />
        <button
          type="submit"
          className="justify-center self-end px-8 py-4 mt-9 text-xl tracking-tighter text-white whitespace-nowrap bg-indigo-500 rounded font-[450] max-md:px-5"
        >
          Verify
        </button>
      </form>
    </section>
  );
};

export default Security;
