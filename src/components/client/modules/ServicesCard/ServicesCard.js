"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { IoCamera, IoLocationOutline, IoVideocam } from "react-icons/io5";

const ServicesCard = ({
  userName,
  uid,
  coverImage,
  distance,
  profession,
  image,
  services,
  rating,
  description,
}) => {
  const router = useRouter();

  return (
    <div
      suppressHydrationWarning
      onClick={() => {
        if (userName && uid) {
          router.push(`/client/slug/${userName}/${uid}`);
        } else {
          return;
        }
      }}
      className="flex flex-col cursor-pointer items-start w-full border bg-transparent rounded-md overflow-huidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex size-full items-center justify-center bg-gradient-to-b -z-10 from-black/25 to-white/75 overflow-hidden aspect-video relative"
      >
        {coverImage?.endsWith(
          ".mp4" ||
            ".avi" ||
            ".wmv" ||
            ".mov" ||
            ".mkv" ||
            ".flv" ||
            ".webm" ||
            ".avchd"
        ) && (
          <div className="bg-black/50 rounded-full p-1 absolute top-3 right-3">
            <IoVideocam className="text-white" />
          </div>
        )}
        {uid ? (
          coverImage ? (
            coverImage?.endsWith(
              ".mp4" ||
                ".avi" ||
                ".wmv" ||
                ".mov" ||
                ".mkv" ||
                ".flv" ||
                ".webm" ||
                ".avchd"
            ) ? (
              <video
                className="size-full object-cover -z-10"
                src={coverImage}
                alt=""
                // controls
              />
            ) : (
              <img src={coverImage} alt="" className="size-full object-cover" />
            )
          ) : (
            <Image
              src={require("../../../../../public/clients_images/service_placeholder.svg")}
              alt=""
              className="w-1/2 h-full p-30 object-contain"
            />
          )
        ) : (
          <div className="w-full min-h-2 rounded skeletonLoader"></div>
        )}
      </div>
      <div className="flex flex-col w-full items-start gap-2 [background:#FFF] pt-3">
        <div className="flex w-11/12 mx-auto justify-between items-center">
          <div className="flex items-center gap-[7px] shrink-0">
            {uid ? (
              <img
                loading="eager"
                src={
                  image
                    ? image
                    : "https://i.pinimg.com/564x/70/dd/61/70dd612c65034b88ebf474a52ccc70c4.jpg"
                }
                alt=""
                className="w-[25px] aspect-square shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="w-[25px] aspect-square shrink-0 rounded-full object-cover skeletonLoader"></div>
            )}
            <div className="space-y-0.5 w-full">
              <p className="text-black text-sm w-full font-normal leading-[normal] tracking-[-0.28px] capitalize">
                {userName ? (
                  userName
                ) : (
                  <span className="w-20 min-h-2 rounded skeletonLoader"></span>
                )}
              </p>
              <p className="text-black/50 text-sm font-bold leading-[normal] text-indigo-500 tracking-[-0.28px]">
                {profession ? (
                  profession
                ) : (
                  <span className="w-20 min-h-2 rounded skeletonLoader"></span>
                )}
              </p>
            </div>
          </div>
          {distance ? (
            <div className="px-2 py-1 shrink-0 bg-[#E6E6E6] border border-green-500 rounded-[31px] flex justify-center items-center text-[#464646] text-[13px] font-normal leading-[normal] tracking-[-0.26px]">
              <div className="size-full flex gap-2 items-center">
                <IoLocationOutline />
                <p>{distance === 0 ? "0" : parseInt(distance / 1000)} km</p>
              </div>
            </div>
          ) : (
            <div className="w-10 min-h-2 rounded skeletonLoader"></div>
          )}
        </div>
        <p className="w-11/12 mx-auto min-h-[62.76px] text-neutral-800 text-base font-normal  leading-[23.01px]">
          {description ? (
            description?.slice(0, 75) + "..."
          ) : (
            <span className="w-full min-h-[62.76px] rounded skeletonLoader"></span>
          )}
        </p>
        {rating ? (
          <div className="flex items-center gap-2 w-11/12 mx-auto">
            <BsStarFill className="text-orange-500" />
            <span className="text-orange-500 text-xs font-bold leading-snug mr-1">
              {rating?.value?.toString()?.slice(0, 3)}
            </span>
            <span className="text-zinc-400 text-xs font-normal leading-snug">
              ({rating?.count})
            </span>
          </div>
        ) : (
          <div className="w-11/12 mx-auto min-h-2 rounded skeletonLoader"></div>
        )}
        <div className="w-full min-h-[61.72px] h-full relative border-t border-zinc-100">
          {services == null ? (
            <div className="w-11/12 mx-auto h-full items-center gap-[8.61px] flex absolute inset-0">
              <div className="w-1/3 h-1/2 overflow-hidden rounded-[17.34px] border border-stone-950 justify-center items-center flex">
                <div className="w-full rounded skeletonLoader"></div>
              </div>
              <div className="w-1/3 h-1/2 overflow-hidden rounded-[17.34px] border border-stone-950 justify-center items-center flex">
                <div className="w-full rounded skeletonLoader"></div>
              </div>
            </div>
          ) : (
            <div className="w-11/12 mx-auto h-full items-center gap-[8.61px] flex absolute inset-0">
              {services?.slice(0, 1)?.map((service, index) => (
                <div
                  key={index}
                  className="pl-[11.21px] pr-[11.32px] pt-[3.76px] pb-[3.69px] rounded-[17.34px] border border-stone-950 justify-center items-center flex"
                >
                  <div className="text-stone-950 text-xs  leading-[20.81px]">
                    {service}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
