import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ numberOfInputs, onChange, value, handleSubmit }) => {
  const MyRef = () =>  useRef(null);
  const inputRefs = Array(numberOfInputs)
    .fill(0)
    .map(() => MyRef());
  const [otp, setOtp] = useState(value || Array(numberOfInputs).fill(""));

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
    } else if (inputValue.length === 0) {
      // Handle backspace
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");

    if (/^[0-9]{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);

      for (let i = 0; i < numberOfInputs; i++) {
        if (i < numberOfInputs - 1) {
          inputRefs[i + 1].current.focus();
        }
      }
    }
  };

  useEffect(() => {
    onChange(otp.join(""));
  }, [otp, onChange, inputRefs]);

  return (
    <div className="flex h-11 items-center gap-[5.396px]" onPaste={handlePaste}>
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
