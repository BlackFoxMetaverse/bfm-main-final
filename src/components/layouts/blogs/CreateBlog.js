"use client";

import Image from "next/image";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    image: null,
    title: "",
    content: "",
  });
  const [words, setWords] = useState(0);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
    if (name === "content") {
      setWords(value.split(" ").filter((word) => word !== "").length);
    }
  };

  console.log(blogData);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setBlogData({ ...blogData, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="">
      <div className="w-full xl:aspect-[3/1] md:aspect-[2/1] sm:aspect-[1.5/1] aspect-square flex items-start relative bg-black/35">
        <img
          src={blogData?.image ? image : ""}
          alt={blogData?.image}
          className="size-full object-cover absolute inset-0 -z-10"
        />
      </div>
      <form
        method="post"
        action=""
        onSubmit={handleSubmit}
        className="w-11/12 mx-auto py-8 space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-3xl">Heading</h1>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Heading..."
            value={blogData?.title}
            className="mt-1 py-2 w-full border-b-2 border-gray-400 text-[#666] text-sm lg:text-base outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-4">
          <h1 className="lg:text-3xl text-2xl">Body</h1>
          <div className="lg:p-7 p-5 min-h-[565px] w-full rounded-2xl border border-black border-opacity-20 bg-white flex flex-col lg:gap-8 gap-4">
            <textarea
              className="outline-none space-y-3 flex-grow text-sm lg:text-base text-[#666] resize-none"
              placeholder="Type Here..."
              id="content"
              name="content"
              onChange={handleChange}
            ></textarea>
            <div className="flex w-full justify-between">
              <div className="flex lg:gap-5 gap-3">
                <button
                  type="submit"
                  className="bg-indigo-500 rounded-[42px] py-2 px-9 text-white lg:text-sm text-xs"
                >
                  Post
                </button>
                <div className="flex lg:gap-3 gap-2">
                  <button type="button" className="relative">
                    <label
                      htmlFor="image"
                      className="absolute top-2 left-0 z-0 cursor-pointer"
                    >
                      <MdOutlinePermMedia className="text-xl" />
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </button>
                </div>
              </div>
              <button>
                <RiDeleteBin6Line className="text-xl font-bold" />
              </button>
            </div>
          </div>
          <p className="text-[#666] lg:text-base text-sm">
            {words} words has been written until now.
          </p>
        </div>
      </form>
    </main>
  );
};

export default CreateBlog;
