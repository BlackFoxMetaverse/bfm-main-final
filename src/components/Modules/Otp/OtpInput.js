"use client";

import React, { useState, useRef, useEffect } from "react";
const OtpInput = ({ numberOfInputs, onChange, value, handleSubmit }) => {
  const myRef = useRef(null)
  const inputRefs = Array(numberOfInputs)
    .fill(null)
    .map(()=> myRef);

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
  }, [otp, onChange]);

  useEffect(() => {
    if (currentIndex >= 0) {
      inputRefs[currentIndex].current.focus();
    }
  }, [currentIndex]);

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
          className="flex w-12 flex-col p-4 items-start justify-center gap-2 border-2 text-[#0858F7] border-[#0858F7] transition-all duration-300 focus:shadow-[#0858F7]/50 focus:shadow-2xl rounded-xl focus:outline-none"
        />
      ))}
      <button type="submit" className="hidden"></button>
    </form>
  );
};

export default OtpInput;
