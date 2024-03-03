"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Moment from "react-moment";

const BlogCard = ({ img, date, title, content, id, category }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/blogs/slug/${title}/${id}`)}
      className="size-full flex flex-col gap-4 cursor-pointer shadow-md rounded-md pb-3"
    >
      <div className="w-full aspect-[1.5/1] relative overflow-hidden rounded-md flex justify-end items-end">
        <img
          src={
            img
              ? img
              : "https://s3-alpha-sig.figma.com/img/e916/6b0a/095a8560f93425000012d2718a6c5562?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FCxmScZ9IR~ESMoTxkCKv2MAmlTPIch2zjlyvDmyJVv2MQtvBX-vgVXtVDNRumiyrvqgKSNw7HTzPAgXz~~lkGYIc1d7gCtFHDoteoEdnoq87MQjlWS6TfKx3hGh6uPTbGdTEth9vciiliI0ky9ItRgh9aZHxTehUT8Z6z-rNA6xej-TA8Q4GTgDGPFT3~XOVW9Q8TKSZxDfi4iVicfnq4S9X3JAeyepshYhIvb9WanVEae3f4jm1PN0m1SrN55MdSXm1OK5cNA-7CHSO~GVmip1HPyI855p3mV3Zdqm~fayi6sc532mknHRvGTnmZCiM-PJNxTSgt-Zbfeajb0k6g__"
          }
          alt=""
          className="object-cover size-full absolute inset-0 -z-10"
        />
        <div className="absolute inset-3 w-[79.58px] h-[24.75px] px-[9.79px] py-[5.87px] bg-black bg-opacity-70 rounded-lg justify-center items-center gap-[9.79px] inline-flex">
          <div className="text-center text-white text-[9.79px] font-bold font-['Neue Helvetica']">
            {category ? category : "MARKETING"}
          </div>
        </div>
      </div>
      <Moment
        format="DD.MM.YYYY"
        className="w-11/12 mx-auto text-gray-500 text-sm font-normal font-['Neue Helvetica']"
      >
        {date ? date : "08.08.2021"}
      </Moment>
      <p className="w-11/12 mx-auto text-zinc-600 text-lg font-bold font-['Neue Helvetica'] leading-normal">
        {title ? title : "Lorem ipsum dolor sit amet consectetur."}
      </p>
      <p className="w-11/12 mx-auto text-gray-500 text-xs font-normal font-['Neue Helvetica'] leading-tight">
        {content
          ? content.slice(0, 100) + "..."
          : "Progressively incentivize cooperative systems through technically sound functionalities. Credibly productivate seamless data with flexible schemas...."}
      </p>
    </div>
  );
};

export default BlogCard;
