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
    <div
      className="flex h-11 items-center gap-[5.396px]"
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          ref={inputRefs[index]}
          value={digit}
          onChange={(e) => handleInputChange(e, index)}
          required
          className="flex w-12 px-[18px] aspect-square justify-center items-center gap-[10.792px] border rounded-[12.951px] border-[solid_rgba(102,102,102,0.35)] focus:outline-none"
        />
      ))}
    </div>
  );
};

export default OtpInput;
