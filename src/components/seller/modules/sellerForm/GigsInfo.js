"use client";

import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaDribbble, FaLinkedinIn } from "react-icons/fa6";
import { IoAdd, IoCloseCircleSharp } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { SiBehance } from "react-icons/si";

const SocialTypes = [
  {
    name: "Linked In",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    icon: <RiInstagramFill />,
  },
  {
    name: "Behance",
    icon: <SiBehance />,
  },
  {
    name: "Dribble",
    icon: <FaDribbble />,
  },
];

const GigsInfo = ({ setData }) => {
  const [galleryImages, setGalleryImages] = useState(["", "", "", "", "", ""]);
  const [galleryImagesFile, setGalleryImagesFile] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [socialType, setSocialType] = useState("");
  const [formData, setFormData] = useState({
    description: "",
    socialMedia: [],
    experiences: [],
    galleryImages: [],
    legalization: false,
  });

  const handleGalleryImageUpload = (index, file) => {
    if (file) {
      setGalleryImagesFile((prev) => {
        let tempArr = prev;
        tempArr[index] = file;
        return tempArr;
      });
      const imageUrl = URL.createObjectURL(file);
      setGalleryImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = imageUrl;
        return newImages;
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        galleryImages: [...galleryImagesFile],
      }));
    }
  };

  const handleGalleryImageDelete = (index) => {
    setGalleryImagesFile((prev) => {
      let tempArr = prev;
      tempArr[index] = null;
      return tempArr;
    });
    setGalleryImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
    if (galleryImagesFile) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        galleryImages: [...galleryImagesFile],
      }));
    }
  };

  function handleExperinces({ index, key, value }) {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [key]: value,
      };
      return updatedExperiences;
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      experiences: [...experiences],
    }));
  }

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      socialMedia: [{ [name]: value }],
    }));
  };

  useEffect(() => {
    setData(formData);
  }, [formData, experiences, galleryImagesFile]);

  return (
    <form
      action=""
      className="flex flex-col items-start gap-[22.77px] self-stretch w-5/6 mx-auto"
    >
      <div className="flex flex-col items-start gap-[7px]">
        <h5 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
          Show Your Gigs
        </h5>
        <p className="text-black md:text-base text-xs not-italic font-normal leading-6">
          Describe your gigs that you have worked on.{" "}
        </p>
      </div>
      <div className="flex flex-col lg:items-start items-center gap-[30px] self-stretch">
        <div className="flex flex-col items-start gap-2.5 self-stretch">
          <label
            htmlFor="description"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-xs not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            tell us about yourself
          </label>
          <textarea
            name="description"
            id="description"
            required
            value={formData.description}
            onChange={onFormChange}
            className="w-full resize-none focus:outline-none h-full text-[#9F9F9F] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] flex flex-col items-start gap-[var(--numberLength,0px)] self-stretch border-[color:var(--Main-Colors-Purple-3,#BE9FF6)] pl-5 pr-2.5 pt-3.5 pb-2.5 rounded-lg border-[1.2px] border-solid"
            placeholder="Describe your Gig"
            cols="30"
            rows="10"
            minLength={100}
            maxLength={1000}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2 self-stretch">
          <label
            htmlFor="social"
            className="col-span-2 text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[10.24px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            Social Media
          </label>
          <div className="flex gap-2 items-center">
            <div
              className={`flex max-w-[155px] justify-between items-center border sm:text-sm text-xs border-[solid_var(--main-colors-gray-05,#909090)] xl:p-3.5 lg:p-2.5 p-1.5 rounded-lg`}
            >
              <select
                name="socialType"
                id="socialType"
                value={socialType}
                onChange={(e) => setSocialType(e.target.value)}
                className="focus:outline-none"
              >
                <option
                  value=""
                  className=" sm:text-sm text-[10px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
                >
                  Select
                </option>
                {SocialTypes?.map((type, index) => (
                  <option
                    key={index}
                    value={type.name}
                    className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] sm:text-sm text-[10px] not-italic font-normal leading-[100%] tracking-[-0.7px] hover:bg-gray-200 px-3 py-2"
                  >
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="url"
              name={socialType}
              id={socialType}
              onChange={handleSocialChange}
              className="flex items-center gap-[5px] self-stretch border focus:outline-none w-full sm:text-sm text-[10px] not-italic font-normal leading-[100%] tracking-[-0.7px] border-[solid_var(--main-colors-gray-05,#909090)] xl:p-3.5 lg:p-2.5 p-1.5 rounded-lg"
              placeholder="Behance or linkedin"
            />
          </div>
        </div>
        {experiences?.map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-2.5 self-stretch"
          >
            <label className="text-[color:var(--Main-Colors-Gray-4,#292929)] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize">
              Experience
            </label>
            <label
              htmlFor=""
              className="flex h-4 items-start gap-2.5 self-stretch pb-[5px]"
            ></label>
            <input
              type="text"
              name="title_of_project"
              id="title_of_project"
              placeholder="Enter title of project"
              className="text-sm not-italic font-normal border focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
              value={experiences[index]["title"]}
              onChange={(e) => {
                handleExperinces({
                  index: index,
                  key: "title",
                  value: e.target.value,
                });
              }}
            />
            <label
              htmlFor=""
              className="flex h-4 items-start gap-2.5 self-stretch pb-[5px]"
            ></label>
            <input
              type="url"
              name="url_of_project"
              id="url_of_project"
              placeholder="Paste link"
              className="text-sm not-italic font-normal border focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg"
              value={experiences[index]["link"]}
              onChange={(e) => {
                handleExperinces({
                  index: index,
                  key: "link",
                  value: e.target.value,
                });
              }}
            />
            <textarea
              name="projectDescription"
              id="projectDescription"
              cols=""
              rows="5"
              minLength={69}
              maxLength={500}
              placeholder="Describe your project and services"
              className="text-sm not-italic font-normal border focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch border-[solid_var(--main-colors-gray-05,#909090)] p-3.5 rounded-lg resize-none"
              value={experiences[index]["description"]}
              onChange={(e) => {
                handleExperinces({
                  index: index,
                  key: "description",
                  value: e.target.value,
                });
              }}
            ></textarea>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setExperiences(() => [
              ...experiences,
              { title: "", link: "", description: "" },
            ])
          }
          className="flex w-full text-[#9870FFFC] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize bg-[#F8F8F8] h-[47px] justify-center items-center content-center gap-[9px] flex-wrap p-[4.97px] rounded-[9.111px]"
        >
          <IoAdd /> Add Experience
        </button>
        <div className="flex flex-col items-start gap-[5px] self-stretch">
          <label
            htmlFor=""
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[10.24px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            Upload Your Gigs
          </label>
          <p className="text-[color:var(--Main-Colors-Gray-0,#9F9F9F)] text-xs not-italic font-light leading-[100%] tracking-[-0.6px]">
            Upload upto 6 Gigs in png, jpeg, jpg
          </p>
          <div className="grid grid-cols-3 gap-2 w-full relativee">
            {galleryImages?.map((image, index) => (
              <div
                key={index}
                className={`${
                  index === 0
                    ? "col-span-2 row-span-2"
                    : "col-span-1 row-span-1"
                } shrink-0 md:rounded-[10.477px] rounded overflow-hidden`}
              >
                {image ? (
                  <div
                    className={`w-full aspect-square flex justify-center relative items-center overflow-hidden`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute group inset-2 flex">
                      <div
                        onClick={() => handleGalleryImageDelete(index)}
                        className="w-[28px] h-[28px] lg:group-hover:scale-y-[100%] transition-all duration-300 ease-in-out lg:scale-y-0 lg:transform flex justify-center items-center text-2xl rounded-xl shrink-0 bg-black/50 text-white"
                      >
                        <IoCloseCircleSharp />
                      </div>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor={`imageInput${index}`}
                    className={`max-w-[100%]  self-stretch aspect-square object-cover bg-[#E1CAFF] text-[#9747FF] shrink-0 flex justify-center items-center rounded`}
                  >
                    <IoAdd className="lg:text-6xl sm:text-5xl text-3xl" />
                    <input
                      type="file"
                      id={`imageInput${index}`}
                      name={`imageInput${index}`}
                      className="hidden"
                      required={false}
                      onChange={(e) =>
                        handleGalleryImageUpload(index, e.target.files[0])
                      }
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 w-full">
          <div className="flex w-[16.701px] h-[16.701px] justify-center items-center shrink-0">
            <input
              type="checkbox"
              name="legalization"
              id="legalization"
              required
              className="border border-[#925ff0] rounded appearance-none w-full h-full object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
            />
          </div>
          <label
            htmlFor="legalization"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-sm text-[11.628px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
          >
            By checking this box, I agree to the terms and conditions.
          </label>
        </div>
      </div>
    </form>
  );
};

export default GigsInfo;
