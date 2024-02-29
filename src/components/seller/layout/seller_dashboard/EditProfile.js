"use client";

import React, { useEffect, useState } from "react";
import PersonalInfo from "../../modules/sellerForm/PersonalInfo";
import ProfessionalInfo from "../../modules/sellerForm/ProfessionalInfo";
import GigsInfo from "../../modules/sellerForm/GigsInfo";
import instance from "@/utils/axios";
import { checkUserDataByToken } from "../../../../utils/userData";

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
  const [userNameValid, setUserNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("bfm-client-token");
    checkUserDataByToken(token)
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, []);

  console.log(userData);

  let userNameTimeout;
  let emailTimeout;

  function checkEmail(email) {
    if (emailTimeout) {
      clearTimeout(emailTimeout);
    }

    emailTimeout = setTimeout(() => {
      instance
        .get(`check/email?uid=${userData?.uid}&email=${email}`)
        .then((response) => {
          console.log(response.data);
          setEmailValid(response.data);
        })
        .catch((error) => {
          console.error("Error checking email:", error);
        })
        .finally(() => {
          emailTimeout = null;
        });
    }, 450);
  }

  function checkUserName(userName) {
    if (userNameTimeout) {
      clearTimeout(userNameTimeout);
    }

    userNameTimeout = setTimeout(() => {
      instance
        .get(
          `check/userName?uid=${userData?.data?.user?.uid}&userName=${userName}`
        )
        .then((Res) => setUserNameValid(Res.data))
        .catch((error) => {
          console.error("Error checking username:", error);
        })
        .finally(() => {
          userNameTimeout = null;
        });
    }, 450);
  }

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("bfm-client-token");
      const response = await instance.get("/main/seller", {
        headers: {
          token: token,
        },
      });

      setInputData(response?.data?.data);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(inputData);

  const handleSubmitGigs = async () => {
    try {
      const bodyObj = await filterUpdates(res.seller, inputData);

      const response = await instance.put("/main/seller", bodyObj, {
        headers: {
          token: token,
        },
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <main className="bg-white">
      <section className="flex overflow-hidden lg:py-24 relative flex-col justify-center items-center px-16 py-12 text-white min-h-[346px] max-md:px-5">
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
      <section className="max-w-[1920px] 2xl:w-1/2 lg:w-2/3 flex flex-col gap-10 w-11/12 mx-auto bg-gray-100 my-12 py-10">
        <PersonalInfo
          inputData={inputData}
          setInputData={setInputData}
          userNameValid={userNameValid}
          emailValid={emailValid}
          checkUserName={checkUserName}
          checkEmail={checkEmail}
        />
        <ProfessionalInfo inputData={inputData} setInputData={setInputData} />
        <GigsInfo
          inputData={inputData}
          setInputData={setInputData}
          sellerSubmit={handleSubmitGigs}
        />
      </section>
    </main>
  );
};

export default EditProfile;
