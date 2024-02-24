"use client";

import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaDribbble, FaLinkedinIn } from "react-icons/fa6";
import { IoAdd, IoCloseCircleSharp } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { SiBehance } from "react-icons/si";
import { TbCaretDownFilled } from "react-icons/tb";

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

const CollegeName = ["JNU", "DU", "DTU", "IIT Delhi", "NIT Delhi"];

const GigsInfo = ({ setData, handleSubmit }) => {
  const [images, setGalleryImages] = useState(["", "", "", "", "", ""]);
  const [galleryImagesFile, setGalleryImagesFile] = useState([]);
  const [document, setDocument] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [experienceDetails, setExperiences] = useState([]);
  const [socialType, setSocialType] = useState("");
  const [selectedSocialMedia, setSelectedSocialMedia] = useState([]);
  const [showSocialMediaOptions, setShowSocialMediaOptions] = useState(false);
  const [formData, setFormData] = useState({
    // college_name: "",
    // certification: null,
    description: "",
    socialMediaLinks: [
      {
        platformType: "linkedIn",
        link: "www.linkedIn.com",
      },
      {
        platformType: "twitter",
        link: "www.twitter/satyam",
      },
    ],
    experienceDetails: [],
    images: [],
    legalization: false,
    coordinates: {
      longitude: 10.1,
      latitude: 10.11,
    },
  });

  useEffect(() => {
    setDocument(window.document);
  }, []);

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
        images: [...galleryImagesFile],
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
        images: [...galleryImagesFile],
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
      experienceDetails: [...experienceDetails],
    }));
  }

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { value } = e.target;
    setSelectedSocialMedia((prevSelected) => {
      if (prevSelected.includes(value)) {
        // Deselect the social media if it's already selected
        return prevSelected.filter((item) => item !== value);
      } else {
        // Select the social media if it's not selected
        return [...prevSelected, value];
      }
    });
  };

  // const handleSocialMediaSelect = (selectedSocialMedia) => {
  //   if (formData.socialMediaLinks.includes(selectedSocialMedia)) {
  //     // If already selected, remove it
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       socialMediaLinks: prevFormData.socialMediaLinks.filter(
  //         (social) => social !== selectedSocialMedia
  //       ),
  //     }));
  //   } else {
  //     // If not selected, add it
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       socialMediaLinks: [...prevFormData.socialMediaLinks, selectedSocialMedia],
  //     }));
  //   }
  // };

  // const removeSocialMedia = (index) => {
  //   setFormData((prevFormData) => {
  //     const updatedSocialMedia = [...prevFormData.socialMediaLinks];
  //     updatedSocialMedia.splice(index, 1);
  //     return { ...prevFormData, socialMediaLinks: updatedSocialMedia };
  //   });
  // };

  // const handleFileChange = (e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     certification: e.target.files[0],
  //   }));
  // };

  useEffect(() => {
    setData(formData);
  }, [formData, experienceDetails, galleryImagesFile]);

  return (
    <form
      action=""
      className="flex flex-col items-end gap-10 self-stretch w-5/6 mx-auto"
    >
      {/* <div className="flex flex-col w-full items-start gap-[5px]">
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
          onChange={onFormChange}
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
      {/* <div className="flex h-11 items-center gap-10 justify-between self-stretch border border-[#909090] p-3.5 rounded-lg">
        <label
          htmlFor="certification"
          className={`${
            formData.certification ? "text-black" : "text-black/60"
          } whitespace-break-spaces break-words shrink text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]`}
        >
          {formData.certification
            ? formData.certification?.name?.slice(0, 40) + "..."
            : "Upload your Resume here"}
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
      <div className="flex flex-col w-full items-start gap-[7px]">
        <h5 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
          Show Your Work
        </h5>
        <p className="text-black md:text-base text-xs not-italic font-normal leading-6">
          Describe your project that you have worked on.
        </p>
      </div>
      <div className="flex flex-col lg:items-start items-center gap-[30px] self-stretch">
        {/* <div className="flex flex-col items-start w-full gap-[7px]">
          <label
            htmlFor="social"
            className="col-span-2 text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[10.24px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            Social Media
          </label>
          <div className="flex items-start w-full gap-[7px]">
            <div className="relative w-full flex-grow">
              <button
                type="button"
                onClick={() =>
                  setShowSocialMediaOptions(!showSocialMediaOptions)
                }
                className="flex gap-2 items-center bg-white w-full pr-3.5 text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] p-3.5 rounded-lg focus:outline-none"
              >
                <span className="flex-grow text-left">
                  {"Select Social Media"}
                </span>
                <TbCaretDownFilled />
              </button>
              {showSocialMediaOptions && (
                <ul className="absolute z-10 top-full left-0 w-full bg-white border rounded-lg shadow-md mt-2">
                  {SocialTypes.map((social) => (
                    <li
                      key={social.name}
                      onClick={() => handleSocialMediaSelect(social.name)}
                      className={`cursor-pointer px-4 py-2 flex items-center gap-2 hover:bg-gray-200 ${
                        formData.socialMediaLinks.includes(social.name)
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      {social.icon}
                      {social.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2">
              {formData.socialMediaLinks.map((social, index) => (
                <div
                  key={index}
                  className="w-14 h-[42px] text-white text-xl bg-indigo-500 rounded-lg justify-center items-center gap-3.5 inline-flex"
                >
                  {SocialTypes.find((type) => type.name === social).icon}
  
                </div>
              ))}
            </div>
          </div>
        </div> */}
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
            className="w-full resize-none focus:outline-none h-full text-black text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] flex flex-col items-start gap-[var(--numberLength,0px)] self-stretch  pl-5 pr-2.5 pt-3.5 pb-2.5 rounded-lg"
            placeholder="Describe your Gig"
            cols="30"
            rows="10"
            minLength={100}
            maxLength={1000}
          ></textarea>
        </div>
        {experienceDetails?.map((_, index) => (
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
              className="text-sm not-italic font-normal focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch p-3.5 rounded-lg"
              value={experienceDetails[index]["title"]}
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
              className="text-sm not-italic font-normal focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch p-3.5 rounded-lg"
              value={experienceDetails[index]["link"]}
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
              className="text-sm not-italic font-normal focus:outline-none w-full leading-[100%] tracking-[-0.7px] flex items-center gap-[5px] self-stretch p-3.5 rounded-lg resize-none"
              value={experienceDetails[index]["content"]}
              onChange={(e) => {
                handleExperinces({
                  index: index,
                  key: "content",
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
              ...experienceDetails,
              { title: "", link: "", content: "" },
            ])
          }
          className="flex w-full text-[#4461F2] text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize bg-[#ECEFFE] h-[47px] justify-center items-center content-center gap-[9px] flex-wrap p-[4.97px] rounded-[9.111px]"
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
            {images?.map((image, index) => (
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
                    className={`max-w-[100%]  self-stretch aspect-square object-cover bg-[#ECEFFE] text-[#4461F2] shrink-0 flex justify-center items-center rounded`}
                  >
                    <IoAdd className="lg:text-6xl sm:text-5xl text-3xl" />
                    <input
                      type="file"
                      id={`imageInput${index}`}
                      name={`imageInput${index}`}
                      className="hidden"
                      required={
                        formData.images[0] !== null ||
                        formData?.images.length > 0
                          ? false
                          : true
                      }
                      // required
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
              className="border border-[#4461F2] rounded appearance-none w-full h-full object-cover checked:bg-[#4461F2] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
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
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-8 py-4 bg-indigo-500 rounded-md border-2 justify-center items-center gap-2 inline-flex"
      >
        <p className="text-white text-xl leading-tight">Finish</p>
      </button>
    </form>
  );
};

export default GigsInfo;
