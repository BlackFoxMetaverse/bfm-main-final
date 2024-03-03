"use client";

import BlogCard from "@/components/Modules/Blogs/BlogCard";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const options = ["All", "Marketing", "SEO", "Career", "Branding"];

const Blog = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [blogs, setBlogs] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const handleOptions = (index) => {
    if (selectedOption === index) {
      setSelectedOption(null);
    } else {
      setSelectedOption(index);
    }
  };

  return (
    <main className="space-y-16">
      <div className="w-full xl:aspect-[3/1] md:aspect-[2/1] sm:aspect-[1.5/1] aspect-square relative flex justify-center items-center">
        <Image
          src={require("../../../../public/clients_images/first.svg")}
          alt=""
          className="-z-10 absolute inset-0 object-cover size-full"
        />
        <div className="w-2/3 flex gap-3 flex-col items-center justify-center">
          <div className="max-w-[65px] h-[23px] px-2.5 py-[5px] bg-white bg-opacity-20 rounded-lg flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-white text-[10px] font-bold">
              FASHION
            </div>
          </div>
          <div className="max-w-[706.67px] max-h-[98.44px] text-center text-white 2xl:text-4xl sm:text-2xl text-xl font-bold capitalize">
            Richird Norton photorealistic rendering as real photos
          </div>
          <div className="max-w-[560px] h-[42.80px] text-center text-neutral-200 text-xs font-normal leading-tight">
            Progressively incentivize cooperative systems through technically
            sound functionalities. The credibly productivate seamless data.
          </div>
          <div className="max-w-[177.33px] h-[21.40px] text-center text-white text-xs font-bold leading-tight">
            By Jennifer Lawrence
          </div>
        </div>
      </div>
      <div className="space-y-4 w-11/12 mx-auto pb-8 max-w-[1920px]">
        <div className="max-w-[296px] text-zinc-600 text-4xl font-bold">
          Popular topics
        </div>
        <div className="flex gap-4 justify-between w-full items-center">
          <div className="flex gap-4 items-center">
            {options.map((option, index) => (
              <button
                type="button"
                onClick={() => handleOptions(index)}
                key={index}
                className={`${
                  selectedOption === index ? "text-indigo-500" : "text-black"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 size-full 2xl:gap-8 xl:gap-6 md:gap-4 sm:gap-2 gap-3">
          {blogs?.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Blog;
