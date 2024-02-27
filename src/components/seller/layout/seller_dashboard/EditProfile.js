"use client";

import React, { useState } from "react";
import PersonalInfo from "../../modules/sellerForm/PersonalInfo";
import ProfessionalInfo from "../../modules/sellerForm/ProfessionalInfo";
import GigsInfo from "../../modules/sellerForm/GigsInfo";

const EditProfile = () => {
  const [inputData, setInputData] = useState({
    userName: "",
    city: "",
    profession: "",
    gender: "",
    experience: "",
    services: [],
    skills: [],
    collegeName: "",
    resume: "",
    description: "",
    socialMediaLinks: [],
    experienceDetails: [],
    images: [],
    coordinates: {},
  });
  return (
    <main className="bg-white">
      <section className="flex overflow-hidden py-24 relative flex-col justify-center items-center px-16 py-12 text-white min-h-[346px] max-md:px-5">
        <img
          loading="lazy"
          src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Decorative background"
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="flex relative flex-col mt-7 w-full lg:w-2/3">
          <h2 className="self-center text-2xl font-light whitespace-nowrap">
            Become a Seller
          </h2>
          <p className="mt-8 text-6xl font-bold text-center leading-[67px] max-md:max-w-full tracking-wider max-md:text-4xl max-md:leading-[51px]">
            Paperwork is our passion. What&apos;s yours?
          </p>
        </div>
      </section>
      {/* Form */}
      <section className="max-w-[1920px] 2xl:w-1/2 lg:w-2/3 w-11/12 mx-auto bg-gray-100 my-12 py-10">
        <PersonalInfo inputData={inputData} setInputData={setInputData} />
        <ProfessionalInfo inputData={inputData} setData={setInputData} />
        <GigsInfo inputData={inputData} setData={setInputData} />
      </section>
    </main>
  );
};

export default EditProfile;
