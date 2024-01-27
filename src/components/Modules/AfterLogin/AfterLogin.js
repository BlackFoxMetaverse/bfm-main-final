"use client"

import Image from 'next/image';
import React from 'react'

const AfterLogin = ({ check }) => {
  return (
    <main className="flex w-full h-screen justify-center items-center">
      <div className="max-w-[1125px] w-5/6 py-12 aspect-video flex justify-center flex-col gap-3 items-center bg-white shrink-0 rounded-[40px]">
        <Image
          src={require("../../../../public/formSubmit.gif")}
          alt=""
          className="2xl:w-[348px] xl:w-[300px] lg:w-[250px] md:w-[200px] w-[150px] aspect-auto shrink-0 rounded-[var(--numberLength,0px)]"
        />
        <h1 className="text-[#212121] 3xl:text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg not-italic font-bold leading-[normal]">
          {check?.check === "already" ? "You are already Subcribed" : "Thank you for Subscribing!"}
        </h1>
        <p className="max-w-[820px] w-5/6 text-[#212121] text-center 3xl:text-3xl 2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm not-italic font-normal leading-[normal]">
          You have successfully subscribed to our list. We will let you know
          when we launch.
        </p>
      </div>
    </main>
  );
}

export default AfterLogin
