import React from "react";

const Security = () => {
  return (
    <div className="flex flex-col px-10 py-8 text-lg leading-5  max-md:px-5 gap-8">
      <div className="self-start text-4xl font-bold text-black max-md:max-w-full">
        Two-Factor Authentication{" "}
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="reason"
            className="self-start mt-4 text-black leading-[150%] max-md:max-w-full"
          >
            Please provide your professional information below.{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className=" w-full flex flex-col justify-center items-start gap-1.5  [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
            placeholder="placeholder."
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="reason"
            className="mt-9 tracking-tighter capitalize text-zinc-800 max-md:max-w-full"
          >
            Enter Verification Code
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className=" w-full flex flex-col justify-center items-start gap-1.5  [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
            placeholder="placeholder."
          />
        </div>
      </div>

      <button className="justify-center self-end px-8 py-4 mt-9 text-xl tracking-tighter text-white whitespace-nowrap bg-indigo-500 rounded font-[450] max-md:px-5">
        Verify
      </button>
    </div>
  );
};

export default Security;
