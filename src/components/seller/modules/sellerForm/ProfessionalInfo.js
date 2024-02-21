"use client";

import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineUploadFile } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

const Experience = ["0-1", "1-3", "3-5", "5+"];
const CollegeName = ["JNU", "DU", "DTU", "IIT Delhi", "NIT Delhi"];

const ProfessionalInfo = ({ setData }) => {
  const [currentTag, setCurrentTag] = useState("");
  const [currentService, setCurrentService] = useState("");
  const [document, setDocument] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [profession, setProfession] = useState([
    "Photographer",
    "Designer",
    "Developer",
    "Software Developer",
  ]);

  useEffect(() => {
    setDocument(window.document);
  }, []);

  const [formData, setFormData] = useState({
    experience: "",
    profession: "",
    skills: [],
    services: [],
  });

  const handleTagInputChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === " " && currentTag.trim() !== "") {
      e.preventDefault();
      setCurrentTag("");
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, currentTag.trim()],
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill !== tagToRemove),
    }));
  };

  const handleServiceInputChange = (e) => {
    setCurrentService(e.target.value);
  };

  const handleServiceInputKeyPress = (e) => {
    if (e.key === " " && currentService.trim() !== "") {
      e.preventDefault();
      setCurrentService("")
      setFormData((prevData) => ({
        ...prevData,
        services: [...prevData.services, currentService.trim()],
      }));
    }
  };

  const handleServiceRemove = (ServiceToRemove) => {
    ((prevServices) =>
      prevServices.filter((Service) => Service !== ServiceToRemove)
    );
    setFormData((prevData) => ({
      ...prevData,
      services: prevData.services.filter((service) => service !== ServiceToRemove),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      certification: e.target.files[0],
    }));
  };

  useEffect(() => {
    setData(formData);
  }, [formData]);

  return (
    <div
      // action=""
      //   onChange={() => setData(formData)}
      className="flex w-5/6 mx-auto flex-col items-center gap-[45px] md:pt-10 rounded-[40px]"
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
              value={formData.experience}
              onChange={handleInputChange}
              className="flex items-center border selection:bg-gray-800 w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
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
          <div className="flex flex-col items-start justify-center gap-[5px]">
            <label
              htmlFor="profession"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              profession
            </label>
            <select
              name="profession"
              id="profession"
              value={formData.profession}
              onChange={handleInputChange}
              required
              className="flex items-center border focus:outline-none w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
            >
              <option value="" className="text-[#9F9F9F]">
                Select Profession
              </option>
              {profession?.map((profession, index) => (
                <option key={index} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="flex flex-col items-start gap-[5px]">
            <label
              htmlFor="college_name"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              College name
            </label>
            <select
              name="college_name"
              id="college_name"
              value={formData.college_name}
              onChange={handleInputChange}
              className="flex items-center border w-full border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
            >
              <option value="">Select your college</option>
              {CollegeName?.map((college, index) => (
                <option value={college} key={index}>
                  {college}
                </option>
              ))}
            </select>
          </div> */}
          <div className="flex flex-col col-span-2 items-start justify-center gap-[5px]">
            <label
              htmlFor="services"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              services
            </label>
            <div className="flex items-center content-center gap-[3.613px] self-stretch flex-wrap border-[solid_var(--main-colors-gray-05,#909090)] px-[10.116px] py-[7.226px] rounded-[5.781px] border-[1.445px]">
              {formData?.services.map((service) => (
                <div
                  key={service}
                  className="flex h-6 justify-center items-center gap-0.5 border bg-[#E9DFFC] border-[#BE9FF6] pl-1.5 pr-2 py-1 rounded-xl text-[color:var(--Main-Colors-Purple-6,#784DC7)] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                >
                  <button
                    type="button"
                    onClick={() => handleServiceRemove(service)}
                  >
                    <RxCrossCircled />
                  </button>
                  <span className="">{service}</span>
                </div>
              ))}
              <input
                type="text"
                name="services"
                id="services"
                placeholder="Developement"
                value={currentService}
                onChange={handleServiceInputChange}
                onKeyPress={handleServiceInputKeyPress}
                className={`text-sm not-italic font-normal leading-[100%] w-fit h-full p-1 tracking-[-0.7px] flex-grow focus:outline-none ${
                  formData?.services.length === 7 ? "hidden" : "block"
                }`}
              />
            </div>
            {/* <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
              Maximum 4 services
            </p> */}
          </div>
          <div className="flex flex-col col-span-2 items-start justify-center gap-[5px]">
            <label
              htmlFor="skills"
              className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              skills
            </label>
            <div className="flex items-center content-center gap-[3.613px] self-stretch flex-wrap border-[solid_var(--main-colors-gray-05,#909090)] px-[10.116px] py-[7.226px] rounded-[5.781px] border-[1.445px]">
              {formData?.skills.map((tag) => (
                <div
                  key={tag}
                  className="flex h-6 justify-center items-center gap-0.5 border bg-[#E9DFFC] border-[#BE9FF6] pl-1.5 pr-2 py-1 rounded-xl text-[color:var(--Main-Colors-Purple-6,#784DC7)] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
                >
                  <button type="button" onClick={() => handleTagRemove(tag)}>
                    <RxCrossCircled />
                  </button>
                  <span className="">{tag}</span>
                </div>
              ))}
              <input
                type="text"
                name="skills"
                id="skills"
                placeholder="Frontend_Developer"
                value={currentTag}
                onChange={handleTagInputChange}
                onKeyPress={handleTagInputKeyPress}
                className={`text-sm not-italic font-normal leading-[100%] w-fit h-full p-1 tracking-[-0.7px] flex-grow focus:outline-none ${
                  formData?.skills.length === 7 ? "hidden" : "block"
                }`}
              />
            </div>
            <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px] capitalize">
              Maximum 4-7 skills
            </p>
          </div>
        </div>
        {/* <div className="flex h-11 items-center gap-10 justify-between self-stretch border border-[#909090] p-3.5 rounded-lg">
          <label
            htmlFor="certification"
            className={`${
              formData.certification
                ? "text-black"
                : "text-[color:var(--Main-Colors-Gray-0,#9F9F9F)]"
            } whitespace-break-spaces break-words shrink text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]`}
          >
            {formData.certification
              ? formData.certification?.name?.slice(0, 40) + "..."
              : "Upload your certification here"}
          </label>
          <input
            type="file"
            name="certification"
            id="certification"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document?.getElementById("certification")?.click()}
            className="flex h-[31.259px] justify-center items-center gap-[2.605px] pl-[7.815px] pr-[10.42px] py-[5.21px] rounded-[15.63px] bg-[#E9DFFC] text-[color:var(--Main-Colors-Purple-6,#784DC7)] text-[18.235px] not-italic font-normal leading-[100%] tracking-[-0.912px]"
          >
            <MdOutlineUploadFile />
            Upload
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProfessionalInfo;
