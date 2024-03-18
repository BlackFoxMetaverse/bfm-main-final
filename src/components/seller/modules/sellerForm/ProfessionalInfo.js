"use client";

import instance from "@/utils/axios";
import s3FileUpload from "@/utils/imageUploader";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineUploadFile } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

const Experience = ["0-1", "1-3", "3-5", "5+"];

const ProfessionalInfo = ({ inputData, setInputData, setCount, isShown }) => {
  // const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
  const [currentTag, setCurrentTag] = useState("");
  const [currentService, setCurrentService] = useState("");
  const [document, setDocument] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);
  const [profession, setProfession] = useState([]);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    setDocument(window.document);
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await instance.get(
          `/suggestion/skills?keyword=${skillInput}`
        );
        setSkills(
          response.data?.skills?.filter(
            (skill) => !inputData.skills.includes(skill.tag)
          )
        );
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    if (skillInput) {
      fetchSkills();
    } else {
      setSkills([]);
    }
  }, [skillInput, inputData.skills]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await instance.get(
          `/suggestion/services?keyword=${serviceInput}`
        );
        setServices(
          response.data?.services?.filter(
            (service) => !inputData.services.includes(service.tag)
          )
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    if (serviceInput) {
      fetchServices();
    } else {
      setServices([]);
    }
  }, [serviceInput, inputData.services]);

  const handleAddSkills = (skill) => {
    setInputData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
    setSkillInput("");
  };

  const handleAddServices = (service) => {
    setInputData((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));
    setServiceInput("");
  };

  const handleRemoveSkills = (index) => {
    setInputData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveServices = (index) => {
    setInputData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  async function getProfession(e) {
    try {
      const profession = e.target.value;
      setInputData({ ...inputData, profession: profession });
      const res = await instance.get(
        `/suggestion/professions?keyword=${profession}`
      );
      setProfession(res.data?.professions);
    } catch (error) {
      console.error("Error fetching profession:", error);
    }
  }

  const handleProfessionSelection = (selectedProfession) => {
    setInputData({ ...inputData, profession: selectedProfession });
    setProfession([]);
  };

  async function getColleges(e) {
    try {
      const college = e.target.value;
      setInputData({ ...inputData, collegeName: college });
      const res = await instance.get(`/suggestion/colleges?keyword=${college}`);
      setColleges(res.data?.colleges);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  }

  const handleCollegesSelection = (selectedProfession) => {
    setInputData({ ...inputData, collegeName: selectedProfession });
    setColleges([]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputData?.services.length && !inputData?.skills.length) {
      return false;
    }

    setCount(3);
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex w-11/12 mx-auto flex-col items-end gap-10 rounded-[40px]"
    >
      <div className="flex flex-col items-start gap-5 w-full">
        <div className="flex flex-col items-start text-left gap-[7px]">
          <h2 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
            Professional Information
          </h2>
          <p className="text-black md:text-base text-[12.24px] not-italic font-normal leading-6">
            Please provide your professional information below.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 w-full items-start content-start md:gap-[20px] gap-5">
          <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="experience"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              experience
            </label>
            <select
              name="experience"
              id="experience"
              required
              value={inputData?.experience}
              onChange={(e) =>
                setInputData({ ...inputData, experience: e.target.value })
              }
              className="flex items-center selection:bg-gray-800 w-full p-3.5 focus:outline-none rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
            >
              {/* <option value="">0-1 years</option> */}
              {Experience?.map((experience, index) => (
                <option
                  className="appearance-none py-5 bg-slate-200"
                  value={experience}
                  key={index}
                >
                  {experience} years
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start gap-[5px] relative">
            <label
              htmlFor="profession"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              profession
            </label>
            <input
              type="text"
              name="profession"
              id="profession"
              value={inputData?.profession}
              onChange={(e) => getProfession(e)}
              required
              placeholder="Developer"
              className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
            />
            {inputData?.profession !== "" && profession.length > 0 && (
              <div className="absolute inset-x-0 z-10 bg-white py-2 px-3 top-full overflow-auto max-h-[200px] flex flex-col gap-1">
                {profession?.map((profession, index) => (
                  <div
                    key={index}
                    className="flex px-4 py-2 items-center gap-2 self-stretch cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#4461f2] hover:text-white"
                    onClick={() => handleProfessionSelection(profession["tag"])}
                  >
                    {profession["tag"]}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col col-span-2 items-start justify-center relative gap-[5px]">
            <label
              htmlFor="services"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              Services Provided
            </label>
            {inputData.services.length > 0 && (
              <div className="flex items-center content-centerrounded-lg gap-[3.613px] self-stretch flex-wrap px-[10.116px] py-[7.226px] rounded-[5.781px]-[1.445px]">
                {inputData.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex h-6 justify-center items-center gap-0.5 bg-[#C5CEFB] pl-1.5 pr-2 py-1 rounded-xl text-[#4461F2] border border-[#4461F2] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveServices(index)}
                    >
                      <RxCrossCircled />
                    </button>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              name="services"
              id="services"
              placeholder="Enter Service"
              className={`text-sm not-italic font-normal leading-[100%] bg-white w-full h-full p-3 rounded-md tracking-[-0.7px] flex-grow focus:outline-none ${
                inputData?.services.length === 7 ? "hidden" : "block"
              }`}
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
            />
            {serviceInput !== "" && services.length > 0 && (
              <div className="absolute inset-x-0 bg-white py-2 px-3 top-full overflow-auto max-h-[200px] z-10 flex flex-col gap-1">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex px-4 py-2 items-center gap-2 self-stretch cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#4461f2] hover:text-white"
                    onClick={() => handleAddServices(service.tag)}
                  >
                    {service.tag}
                  </div>
                ))}
              </div>
            )}
            <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
              Maximum 4-7 services
            </p>
          </div>
          <div className="flex flex-col col-span-2 items-start relative justify-center gap-[5px]">
            <label
              htmlFor="skills"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              Skills Provided
            </label>
            {inputData.skills.length > 0 && (
              <div className="flex items-center content-center rounded-lg gap-[3.613px] self-stretch flex-wrap px-[10.116px] py-[7.226px] rounded-[5.781px]-[1.445px]">
                {inputData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex h-6 justify-center items-center gap-0.5 bg-[#C5CEFB] pl-1.5 pr-2 py-1 rounded-xl text-[#4461F2] border border-[#4461F2] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveSkills(index)}
                    >
                      <RxCrossCircled />
                    </button>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              name="skills"
              id="skills"
              placeholder="Enter Skills"
              className={`text-sm not-italic font-normal leading-[100%] bg-white w-full h-full p-3 rounded-md tracking-[-0.7px] flex-grow focus:outline-none ${
                inputData?.skills.length === 7 ? "hidden" : "block"
              }`}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            {skillInput !== "" && skills.length > 0 && (
              <div className="absolute inset-x-0 bg-white py-2 z-10 px-3 top-full overflow-auto max-h-[200px] flex flex-col gap-1">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex px-4 py-2 items-center gap-2 self-stretch cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#4461f2] hover:text-white"
                    onClick={() => handleAddSkills(skill.tag)}
                  >
                    {skill.tag}
                  </div>
                ))}
              </div>
            )}
            <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
              Maximum 4-7 skills
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[5px] col-span-2 w-full relative">
          <label
            htmlFor="college"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            college
          </label>
          <input
            type="text"
            name="college"
            id="college"
            value={inputData?.collegeName}
            onChange={(e) => getColleges(e)}
            required
            placeholder="Enter Your College Name"
            className="flex items-center gap-[5px] w-full text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none bg-white"
          />
          {inputData?.collegeName !== "" && colleges.length > 0 && (
            <div className="absolute inset-x-0 z-10 bg-white py-2 px-3 top-full overflow-auto max-h-[200px] flex flex-col gap-1">
              {colleges?.map((college, index) => (
                <div
                  key={index}
                  className="flex px-4 py-2 items-center gap-2 self-stretch cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#4461f2] hover:text-white"
                  onClick={() =>
                    handleCollegesSelection(college["College Name"])
                  }
                >
                  {college["College Name"]}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex h-11 items-center gap-10 justify-between self-stretch-[#909090] mt-7 p-3.5 rounded-lg bg-white relative w-full">
          <label
            htmlFor="resume"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] absolute -top-2/3 inset-0 md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            Resume
          </label>
          <label
            htmlFor="resume"
            className={`${
              inputData?.resume
                ? "text-black"
                : "text-[color:var(--Main-Colors-Gray-0,#9F9F9F)]"
            } whitespace-break-spaces break-words shrink text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]`}
          >
            {inputData?.resume
              ? inputData?.resume?.name === undefined
                ? `${inputData?.name.split(" ")[0]}'sResume.${
                    inputData?.resume.split(".")[1]
                  }`
                : inputData?.resume?.name?.slice(0, 40) + "..."
              : "Upload your resume here"}
          </label>
          <input
            type="file"
            name="resume"
            id="resume"
            accept=".doc, .docx, .pdf"
            onChange={(e) =>
              setInputData({ ...inputData, resume: e.target.files[0] })
            }
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document?.getElementById("resume")?.click()}
            className="w-[79.95px] h-[25.08px] pl-[6.13px] pr-[8.17px] py-[4.08px] bg-black rounded-xl border justify-center items-center gap-0.5 inline-flex"
          >
            <div className="text-white text-sm font-normal font-['Neue Helvetica'] leading-[14.29px]">
              Upload
            </div>
          </button>
        </div>
      </div>
      {/* {isShown && ( */}
      <button
        type="submit"
        className="flex justify-center items-center gap-2 rounded [background:var(--Primary-1,#4461F2)] px-8 py-4 text-[color:var(--Primary-blue,#FFF)] font-[450] leading-[100%] tracking-[-1px]"
      >
        <p className="">Save & Continue</p>
      </button>
      {/* )} */}
    </form>
  );
};

export default ProfessionalInfo;
