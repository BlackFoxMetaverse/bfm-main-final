"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { RiDeleteBin5Fill, RiSearch2Line } from "react-icons/ri";

const Tags = ["Fixed Rate", "Time Auction", "Open For Bids"];

const EditProfile = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [socialLinks, setSocialLinks] = useState([""]);
  const router = useRouter();

  const handleImageChange = (index, file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = imageUrl;
        return newImages;
      });
    }
  };

  const handleDelete = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <main className="px-24 py-28">
      <div className="space-y-12">
        <h1 className="text-[color:var(--mono-90,#18181B)] text-[32px] not-italic font-bold leading-8 tracking-[-0.32px]">
          Add Details on your Profile
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-start gap-[60px]"
        >
          <div className="flex flex-col items-start gap-6">
            <p className="text-black text-[25.6px] not-italic font-semibold leading-[22.012px]">
              Upload Image{" "}
            </p>
            <div className="grid grid-cols-2 gap-7">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="max-w-[408px] max-h-80 shrink-0 rounded overflow-hidden"
                >
                  {image ? (
                    <div className="w-[408px] h-80 flex justify-center relative items-center overflow-hidden">
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute group inset-5 flex justify-end items-end">
                        <div
                          onClick={() => handleDelete(index)}
                          className="w-[38px] h-[38px] group-hover:scale-y-[100%] transition-all duration-300 ease-in-out scale-y-0 transform flex justify-center items-center text-2xl rounded-xl shrink-0 bg-[#DE1E5C] text-white"
                        >
                          <RiDeleteBin5Fill />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor={`imageInput${index}`}
                      className="w-[408px] h-80 object-cover bg-black/20 shrink-0 flex justify-center items-center rounded"
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
          <div className="flex flex-col items-start gap-6">
            <label
              htmlFor="textarea"
              className="w-[332.8px] text-black text-[25.6px] not-italic font-semibold leading-[38.4px]"
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
              className="flex w-[848px] focus:outline-none bg-black/20 resize-none items-center gap-[19.2px] py-[27.2px] px-8 rounded-[32px] text-sm not-italic font-normal leading-[21px]"
            ></textarea>
          </div>
          <div className="flex flex-col items-start gap-[24.946px]">
            <h3
              htmlFor="tags"
              className="text-black text-[26.609px] not-italic font-semibold leading-[39.914px]"
            >
              Tags
            </h3>
            <label
              htmlFor="tags"
              className="w-[523px] px-6 py-3 flex gap-4 items-center shrink-0 bg-black/20 rounded-[37px]"
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
                  className="flex bg-black/20 flex-col justify-center items-center gap-[16.631px] px-[33.261px] py-[19.957px] rounded-[63.197px] text-[color:var(--neutral-black,#000)] not-italic font-bold leading-[18px]"
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
                className="flex w-full items-center gap-[20.423px]"
              >
                <input
                  type="url"
                  name="social"
                  id={`social-${index}`}
                  required
                  value={link}
                  onChange={(e) => handleSocialChange(index, e.target.value)}
                  placeholder={`e.g: https://yoursite.io/item/${index + 1}`}
                  className="flex w-full items-center gap-[20.423px] px-[34.038px] py-4 focus:outline-none bg-black/20 rounded-[34.038px]"
                />
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
              className="flex w-[526.402px] bg-[#0858F7] text-[color:var(--mono-0,#FFF)] text-center text-base not-italic font-bold leading-6 justify-center items-center gap-[12.242px] px-[30.605px] py-[24.484px] rounded-[18.363px]"
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
