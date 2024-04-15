"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaDribbble, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IoAdd, IoCloseCircleSharp } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { SiBehance } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";

const SocialTypes = [
  {
    name: "LinkedIn",
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
    name: "Dribbble",
    icon: <FaDribbble />,
  },
  {
    name: "Github",
    icon: <FaGithub />,
  },
];

// const s3Urls = "https://bucketbfm.s3.ap-south-1.amazonaws.com/";

const GigsInfo = ({ inputData, setInputData, setCount, sellerSubmit }) => {
  const [socialType, setSocialType] = useState();
  const [socialLink, setSocialLink] = useState();
  const [descriptionwordCount, setDescriptionWordCount] = useState(0);

  const imagesRef = useRef([]);
  const videoRef = useRef(null);

  const createFileUrl = (file) => {
    return URL.createObjectURL(file);
  };

  const handlePlay = (e) => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  function validateURL(url) {
    try {
      const isUrl = new URL(url);
      if (
        socialType.toLowerCase() ===
        (isUrl.hostname.includes("www")
          ? isUrl.hostname.split(".")[1]
          : isUrl.hostname.split(".")[0])
      ) {
        return true;
      } else {
        throw new Error();
      }
    } catch (err) {
      return false;
    }
  }

  function addSocials({ type, link }) {
    setInputData((prev) => {
      return {
        ...prev,
        socialMediaLinks: [
          ...prev.socialMediaLinks,
          { platformType: type, link: link },
        ],
      };
    });
    setSocialLink("");
    setSocialType("");
  }

  function removeSocials(index) {
    let arr = inputData.socialMediaLinks;
    arr.splice(index, 1);
    setInputData({ ...inputData, socialMediaLinks: arr });
  }

  function getIconByName(name) {
    const socialType = SocialTypes.find(
      (social) => social.name.toLowerCase() === name?.toLowerCase()
    );
    return socialType ? socialType.icon : null;
  }

  const handleAddExperinces = () => {
    setInputData((prev) => {
      return {
        ...prev,
        experienceDetails: [
          ...prev.experienceDetails,
          { title: "", link: "", content: "" },
        ],
      };
    });
  };

  const handleExpFields = ({ index, field, value }) => {
    setInputData((prev) => {
      let expArr = prev.experienceDetails;
      expArr[index][field] = value;
      return { ...prev, experienceDetails: expArr };
    });
  };

  const handleRemoveExp = (index) => {
    setInputData((prev) => {
      const newExpArr = prev.experienceDetails.filter((_, i) => i !== index);
      return { ...prev, experienceDetails: newExpArr };
    });
  };

  const handleMediaAdd = ({ index, file }) => {
    const fileType = file?.type.split("/")[0];
    if (fileType === "video") {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        if (video.duration <= 60) {
          setInputData((prev) => {
            let imgsArr = prev.images;
            imgsArr[index] = file;
            return { ...prev, images: imgsArr };
          });
        } else {
          alert("Please upload a video less than 1 minute in duration.");
        }
      };
    } else {
      setInputData((prev) => {
        let imgsArr = prev.images;
        imgsArr[index] = file;
        return { ...prev, images: imgsArr };
      });
    }
  };

  const handleRemoveMedia = (index) => {
    setInputData((prev) => {
      let imgsArr = prev.images;
      imgsArr[index] = null;
      return { ...prev, images: imgsArr };
    });

    if (imagesRef.current[index] && imagesRef.current[index].current) {
      imagesRef.current[index].current.value = "";
    }
  };

  useEffect(() => {
    setDescriptionWordCount(
      inputData.description.length && inputData.description.split(" ").length
    );
  }, [inputData.description]);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputData.experienceDetails.length === 0) return false;
    console.log("last", inputData);
    sellerSubmit();
    console.log("end");
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col items-end gap-10 self-stretch w-11/12 mx-auto"
    >
      <div className="flex flex-col w-full items-start gap-[7px]">
        <h5 className="text-black md:text-[32px] text-[18.99px] not-italic font-bold leading-[normal]">
          Show Your Work
        </h5>
        <p className="text-black md:text-base text-xs not-italic font-normal leading-6">
          Describe your project that you have worked on.
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
            value={inputData?.description}
            onChange={(e) =>
              setInputData({ ...inputData, description: e.target.value })
            }
            className="w-full resize-none focus:outline-none h-full text-black text-sm not-italic font-normal leading-[100%] tracking-[-0.7px] flex flex-col items-start gap-[var(--numberLength,0px)] self-stretch  pl-5 pr-2.5 pt-3.5 pb-2.5 rounded-lg"
            placeholder="Describe your Gig"
            cols="30"
            rows="10"
            minLength={100}
            maxLength={1000}
          ></textarea>
          <div className="w-full flex justify-between items-center">
            <div className="text-red-500/50">
              Description should be of 50 to 300 words
            </div>
            <div>{descriptionwordCount} / 300 words</div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[5px] w-full">
          <label
            htmlFor="socialMediaLinks"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-base text-[12.226px] not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize"
          >
            Social Types
          </label>
          <ul className="gap-4 flex items-center">
            {inputData?.socialMediaLinks?.map((social, index) => (
              <li
                key={index}
                className="flex items-center p-2 rounded-lg shadow-md bg-white"
              >
                <div className="bg-gray-200 rounded-full p-2">
                  {getIconByName(social.platformType)}
                </div>
                <div className="flex-grow flex justify-between">
                  <button
                    className="text-red-500 focus:outline-none hover:text-red-600 p-2"
                    type="button"
                    onClick={() => removeSocials(index)}
                  >
                    <RxCross2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center w-full gap-4 relative">
            <select
              className="border border-gray-300 w-full rounded-md px-4 py-2 bg-white shadow-sm focus:outline-none border-none"
              name="social-media"
              id="social-media"
              value={socialType}
              onChange={(e) => setSocialType(e.target.value)}
            >
              <option value="" disabled>
                Select a platform
              </option>
              {SocialTypes?.filter(
                (social) => social !== inputData?.socialMediaLinks
              ).map((social, index) => (
                <option key={index} value={social.name}>
                  {social.name}
                </option>
              ))}
            </select>
            <input
              className={`border w-full border-gray-300 transition-all duration-500 absolute inset-x-0 transform ${
                socialType ? "translate-y-full" : "scale-y-0"
              } rounded-md px-4 py-2 bg-white shadow-sm focus:outline-none border-none`}
              placeholder="Enter your profile URL"
              type="text"
              value={socialLink}
              onChange={(e) =>
                setSocialLink(() => {
                  if (e.target.value.trim() === "") {
                    setSocialLink("");
                    return;
                  }

                  if (
                    !e.target.value.startsWith("http://") &&
                    !e.target.value.startsWith("https://")
                  ) {
                    e.target.value = "https://" + e.target.value;
                  }

                  // Update the social link state
                  setSocialLink(e.target.value);
                })
              }
            />
            {socialType && validateURL(socialLink) && (
              <button
                className={`bg-blue-500 text-white px-6 py-2 transform rounded-md shadow-sm hover:bg-blue-600`}
                type="button"
                onClick={() =>
                  addSocials({ type: socialType, link: socialLink })
                }
              >
                Add
              </button>
            )}
            {socialType && (
              <button
                className={`bg-gray-300 text-gray-700 px-6 py-2 rounded-md shadow-sm hover:bg-gray-400`}
                type="button"
                onClick={() => {
                  setSocialLink("");
                  setSocialType("");
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {inputData?.experienceDetails?.map((_, index) => (
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
              required
              value={inputData?.experienceDetails[index]["title"]}
              onChange={(e) => {
                setInputData((prev) => {
                  const newData = { ...prev };
                  newData.experienceDetails[index] = {
                    ...newData.experienceDetails[index],
                    title: e.target.value,
                  };
                  return newData;
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
              required
              value={inputData?.experienceDetails[index]["link"]}
              onChange={(e) => {
                setInputData((prev) => {
                  const newData = { ...prev };
                  newData.experienceDetails[index] = {
                    ...newData.experienceDetails[index],
                    link: e.target.value,
                  };
                  return newData;
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
              required
              value={inputData?.experienceDetails[index]["content"]}
              onChange={(e) => {
                setInputData((prev) => {
                  const newData = { ...prev };
                  newData.experienceDetails[index] = {
                    ...newData.experienceDetails[index],
                    content: e.target.value,
                  };
                  return newData;
                });
              }}
            ></textarea>
            <button
              type="button"
              onClick={() => handleRemoveExp(index)}
              className="flex w-full text-red-500 text-base not-italic font-normal leading-[100%] tracking-[-0.8px] capitalize border-4 bg-white border-[#ECEFFE] h-[46px] justify-center items-center content-center gap-[9px] flex-wrap p-[4.97px] rounded-[9.111px]"
            >
              <RxCross2 /> Remove Experience
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddExperinces}
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
            Upload upto 6 Gigs in png, jpeg, jpg, mp4 or any media format
          </p>
          <div className="grid grid-cols-3 gap-2 w-full relativee">
            {inputData?.images?.map((media, index) => (
              <div
                key={index}
                className={`${
                  index === 0
                    ? "col-span-2 row-span-2"
                    : "col-span-1 row-span-1"
                } shrink-0 md:rounded-[10.477px] rounded overflow-hidden`}
              >
                {media ? (
                  <div
                    className={`w-full aspect-square flex justify-center relative items-center overflow-hidden`}
                  >
                    {typeof media === "string" ? (
                      media.endsWith(
                        ".mp4" ||
                          ".mov" ||
                          ".avi" ||
                          ".wmv" ||
                          ".avchd" ||
                          "WebM" ||
                          ".flv"
                      ) ? (
                        <video
                          src={media}
                          alt=""
                          className="size-full object-cover cursor-pointer"
                          ref={videoRef}
                          onClick={handlePlay}
                        />
                      ) : (
                        <img
                          src={media}
                          alt=""
                          className="size-full object-cover cursor-pointer bg-black/10"
                        />
                      )
                    ) : media.type && media.type.startsWith("video/") ? (
                      <video
                        src={createFileUrl(media)}
                        alt=""
                        className="size-full object-cover cursor-pointer"
                        ref={videoRef}
                        onClick={handlePlay}
                      />
                    ) : (
                      <img
                        src={createFileUrl(media)}
                        alt=""
                        className="size-full object-cover cursor-pointer bg-black/10"
                      />
                    )}
                    <div className="absolute group inset-2 flex">
                      <div
                        className="w-[28px] h-[28px] lg:group-hover:scale-y-[100%] transition-all duration-300 ease-in-out lg:scale-y-0 lg:transform flex justify-center items-center text-2xl rounded-xl shrink-0 bg-black/50 text-white"
                        onClick={() => handleRemoveMedia(index)}
                      >
                        <IoCloseCircleSharp />
                      </div>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor={media}
                    className={`max-w-[100%]  self-stretch aspect-square object-cover bg-[#ECEFFE] text-[#4461F2] shrink-0 flex justify-center items-center rounded`}
                  >
                    <IoAdd className="lg:text-6xl sm:text-5xl text-3xl" />
                    <input
                      type="file"
                      id={media}
                      name={media}
                      className="hidden"
                      required={
                        inputData.images[0] === null ||
                        inputData?.images.length === 0
                      }
                      onChange={(e) =>
                        handleMediaAdd({ index, file: e.target.files[0] })
                      }
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex items-center justify-center gap-1 w-full">
          <div className="flex w-[16.701px] h-[16.701px] justify-center items-center shrink-0">
            <input
              type="checkbox"
              name="legalization"
              id="legalization"
              required
              className="border border-[#4461F2] rounded appearance-none size-4 object-cover checked:bg-[#4461F2] flex justify-center items-center checked:after:content-['\2713'] checked:after:text-white checked:after:text-xs"
            />
          </div>
          <label
            htmlFor="legalization"
            className="text-[color:var(--Main-Colors-Gray-4,#292929)] md:text-sm text-[11.628px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
          >
            By checking this box, I agree to the terms and conditions.
          </label>
        </div> */}
      </div>
      <button
        type="submit"
        className="flex justify-center items-center gap-2 rounded [background:var(--Primary-1,#4461F2)] px-8 py-4 text-[color:var(--Primary-blue,#FFF)] font-[450] leading-[100%] tracking-[-1px]"
      >
        <p className="">Finish</p>
      </button>
    </form>
  );
};

export default GigsInfo;
