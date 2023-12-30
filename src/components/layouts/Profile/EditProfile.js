"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { RiDeleteBin5Fill, RiSearch2Line } from "react-icons/ri";
import s3ImageUpload from "@/utils/imageUploader";
import axios from "@/utils/axios";

const Tags = ["Fixed Rate", "Time Auction", "Open For Bids"];

const EditProfile = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [imagesFile, setImagesFile] = useState([null, null, null, null]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [socialLinks, setSocialLinks] = useState([""]);
  const router = useRouter();

  const handleCreateProfile = async () => {
    /**
     * @returns {Json} as promise response from the server
     */
    const token = localStorage.getItem("bfm-user-token");
    const imageKeyArr = Array(4);

    await Promise.all(
      imagesFile.map(async (file, index) => {
        if (file !== null) {
          imageKeyArr[index] = await s3ImageUpload(file);
        } else {
          imageKeyArr[index] = null;
        }
      })
    );

    try {
      const response = await axios.post(
        "/userProfile/createProfile",
        {
          images: imageKeyArr,
          description: description,
          tags: [tags],
          socialMediaLinks: socialLinks,
        },
        {
          headers: {
            idtoken: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("axioserro: ", error);
      return null;
    }
  };

  const handleImageChange = (index, file) => {
    if (file) {
      setImagesFile((prev) => {
        let tempArr = prev;
        tempArr[index] = file;
        return tempArr;
      });
      const imageUrl = URL.createObjectURL(file);
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = imageUrl;
        return newImages;
      });
    }
    console.log("file:", imagesFile);
  };

  const handleDelete = (index) => {
    setImagesFile((prev) => {
      let tempArr = prev;
      tempArr[index] = null;
      return tempArr;
    });
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
    console.log("file:", imagesFile);
  };

  const handleAddMore = () => {
    setSocialLinks((prevLinks) => [...prevLinks, ""]);
  };

  const handleSocialChange = (index, value) => {
    setSocialLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks[index] = value;
      return newLinks;
    });
  };

  const handleRemove = (index) => {
    if (index !== 0) {
      setSocialLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.splice(index, 1);
        return newLinks;
      });
    } else {
      setSocialLinks([""]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateProfile()
      .then((respones) => {
        console.log("response: ", respones);
        router.push("/");
      })
      .catch((e) => console.log("createProfileError: ", e));
  };

  return (
    <main className="lg:px-24 lg:py-28 pt-[75.862px] pb-[117.548px] px-5">
      <div className="space-y-12">
        <h1 className="text-[color:var(--mono-90,#18181B)] lg:text-[32px] text-[24px] not-italic font-bold leading-8 tracking-[-0.32px]">
          Add Details on your Profile
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-start gap-[60px]"
        >
          <div className="flex w-full flex-col items-start gap-6">
            <p className="text-black lg:text-[25.6px] not-italic font-semibold leading-[22.012px]">
              Upload Image{" "}
            </p>
            <div className="grid max-w-[850px] lg:grid-cols-2 w-full grid-cols-1 gap-7">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 rounded overflow-hidden"
                >
                  {image ? (
                    <div className="w-full aspect-square flex justify-center relative items-center overflow-hidden">
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute group inset-5 flex justify-end items-end">
                        <div
                          onClick={() => handleDelete(index)}
                          className="w-[38px] h-[38px] lg:group-hover:scale-y-[100%] transition-all duration-300 ease-in-out lg:scale-y-0 lg:transform flex justify-center items-center text-2xl rounded-xl shrink-0 bg-[#DE1E5C] text-white"
                        >
                          <RiDeleteBin5Fill />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor={`imageInput${index}`}
                      className="max-w-[408px] w-full aspect-square object-cover bg-black/20 shrink-0 flex justify-center items-center rounded"
                    >
                      <HiOutlineDocumentAdd className="text-6xl" />
                      <input
                        type="file"
                        id={`imageInput${index}`}
                        name={`imageInput${index}`}
                        className="hidden"
                        required={false}
                        onChange={(e) =>
                          handleImageChange(index, e.target.files[0])
                        }
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full items-start gap-6">
            <label
              htmlFor="textarea"
              className="max-w-[332.8px] text-black text-[25.6px] not-italic font-semibold leading-[38.4px]"
            >
              Description
            </label>
            <textarea
              name="textarea"
              id="textarea"
              cols="30"
              rows="10"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g: This is a very limited item"
              className="flex max-w-[848px] w-full focus:outline-none bg-black/20 resize-none items-center gap-[19.2px] py-[27.2px] px-8 rounded-[32px] text-sm not-italic font-normal leading-[21px]"
            ></textarea>
          </div>
          <div className="flex flex-col w-full items-start gap-[24.946px]">
            <h3
              htmlFor="tags"
              className="text-black text-[26.609px] not-italic font-semibold leading-[39.914px]"
            >
              Tags
            </h3>
            <label
              htmlFor="tags"
              className="max-w-[523px] w-full px-6 py-3 flex gap-4 items-center shrink-0 bg-black/20 rounded-[37px]"
            >
              <RiSearch2Line className="text-black/50" />
              <input
                type="text"
                name="tags"
                id="tags"
                value={tags}
                required
                onChange={(e) => setTags(e.target.value)}
                className="bg-transparent w-full focus:outline-none"
                placeholder="Search Tags"
              />
            </label>
            <div className="flex justify-center items-center gap-[24.946px]">
              {Tags?.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setTags(tag)}
                  className="flex bg-black/20 flex-col justify-center items-center gap-[16.631px] lg:px-[33.261px] lg:py-[19.957px] px-[20.976px] py-[12.586px] rounded-[63.197px] text-[color:var(--neutral-black,#000)] text-xs lg:text-base not-italic font-bold leading-[18px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="flex max-w-[850px] w-full flex-col items-start gap-[25.528px]">
            <label
              htmlFor="social"
              className="text-black text-[27.23px] not-italic font-semibold leading-[40.845px]"
            >
              Social Media Links
            </label>
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className="flex w-full items-center gap-5 px-[34.038px] py-4 focus:outline-none bg-black/20 rounded-[34.038px]"
              >
                <input
                  type="url"
                  name="social"
                  id={`social-${index}`}
                  required
                  value={link}
                  onChange={(e) => handleSocialChange(index, e.target.value)}
                  placeholder={`e.g: https://yoursite.io/item/${index + 1}`}
                  className="focus:outline-none bg-transparent w-full"
                />
                <button
                  onClick={() => handleRemove(index)}
                  className={`w-[38px] ${
                    link === "" ? "hidden" : "flex"
                  } h-[38px] justify-center items-center text-2xl rounded-full shrink-0 bg-[#DE1E5C] text-white`}
                >
                  <RiDeleteBin5Fill />
                </button>
              </div>
            ))}
            <div className="flex w-full justify-center">
              <button
                onClick={handleAddMore}
                className={`flex justify-center items-center gap-2.5 px-[21px] py-2.5 rounded-lg bg-[#4461F2] text-white text-xl not-italic font-semibold leading-[normal] ${
                  socialLinks[socialLinks.length - 1] === ""
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={socialLinks[socialLinks.length - 1] === ""}
              >
                Add More
              </button>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="flex max-w-[526.402px] w-full bg-[#0858F7] text-[color:var(--mono-0,#FFF)] text-center text-base not-italic font-bold leading-6 justify-center items-center gap-[12.242px] px-[30.605px] py-[24.484px] rounded-[18.363px]"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
