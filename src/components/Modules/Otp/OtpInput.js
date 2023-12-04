"use client";

import React, { useState, useRef, useEffect } from "react";
const OtpInput = ({ numberOfInputs, onChange, value, handleSubmit }) => {
  const MyRef = () => useRef(null)
  const inputRefs = Array(numberOfInputs)
    .fill(null)
    .map(()=>MyRef());

  const [otp, setOtp] = useState(value || Array(numberOfInputs).fill(""));
  const currentIndex = otp.findIndex((val) => val === "");

  const handleInputChange = (e, index) => {
    e.preventDefault();
    const newOtp = [...otp];
    const inputValue = e.target.value;

    if (inputValue.length === 1 && /^[0-9]$/.test(inputValue)) {
      newOtp[index] = inputValue;
      setOtp(newOtp);
      if (index < numberOfInputs - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  useEffect(() => {
    onChange(otp.join(""));
  }, [otp, onChange, inputRefs]);

  useEffect(() => {
    if (currentIndex >= 0) {
      inputRefs[currentIndex].current.focus();
    }
  }, [currentIndex, inputRefs]);

  return (
    <form onSubmit={handleSubmit} className="flex justify-between items-start self-stretch">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          ref={inputRefs[index]}
          value={digit}
          onChange={(e) => handleInputChange(e, index)}
          required
          // placeholder="0"
          className="flex w-12 flex-col p-4 items-start justify-center gap-2 border-2 text-[#0858F7] border-[#0858F7] transition-all duration-300 focus:outline-[#0858F7]/50 focus:outline rounded-xl focus:outline-4"
        />
      ))}
      <button type="submit" className="hidden"></button>
    </form>
  );
};

export default OtpInput;
