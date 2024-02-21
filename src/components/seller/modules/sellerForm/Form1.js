"use client";

import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";
// import { BsCheckCircleFill } from "react-icons/bs";
// import { FaCamera, FaChevronRight } from "react-icons/fa6";
// import { MdOutlineUploadFile } from "react-icons/md";
// import { RxCrossCircled } from "react-icons/rx";
import PersonalInfo from "./PersonalInfo";
import ProfessionalInfo from "./ProfessionalInfo";
import { BsCheckCircleFill } from "react-icons/bs";

const Form1 = ({ setData, handleSubmit }) => {
  const [userData, setUserData] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [formData, setFormData] = useState({
    ...personalInfo,
    ...professionalInfo,
  });

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.get("/user/user", {
        headers: {
          token: token,
        },
      });

      setUserData(res?.data?.data);
    } catch (error) {
      console.log(error);
      setUserData("Something went wrong");
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setFormData({ ...personalInfo, ...professionalInfo });
  }, [personalInfo, professionalInfo]);

  useEffect(() => {
    setData(formData);
  }, [formData]);

  console.log(userData);

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-center items-center"
    >
      <PersonalInfo userData={userData} setData={setPersonalInfo} />
      <ProfessionalInfo userData={userData} setData={setProfessionalInfo} />
      <button type="submit" className="bg-blue-700 flex gap-2 items-center px-6 py-3 text-white">
        Next <BsCheckCircleFill />
      </button>
    </form>
  );
};

export default Form1;
