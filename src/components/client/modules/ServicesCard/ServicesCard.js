"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaHeart } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

const ServicesCard = ({ username, id, img, distance, profession }) => {
  const router = useRouter();

  return (
    <div
      suppressHydrationWarning
      onClick={() => router.push(`/client/username/${username}/${id}`)}
      className="flex flex-col cursor-pointer items-start w-full shadow-[0px_6px_12px_0px_rgba(41,41,41,0.08)] bg-transparent rounded-[18px] overflow-hidden"
    >
      <div className="flex h-[233px] w-full items-center justify-center bg-gradient-to-b from-black/25 to-white/75 overflow-hidden relative">
        <img
          loading="eager"
          src={
            img
              ? img
              : "https://s3-alpha-sig.figma.com/img/5ca6/41d6/d9d3087f77befa738f3b738374c70659?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qe2O1YLXcn-DWw8XmPl38AAjMrhqvJIEbjCvA1Vk5eNRkHB7L0DTkb-bl2j1tpsBCUp8qOpJV9AYr2pi6-rI~jqBRnGMht4LyV51BBdgyWPDJCc0HTAXkvN5jx3Wk61k6rIPQMpLbLu53anjEO0j63UOAXmJ7H1BBgA4lxf8fvCAvynlVOxryh0hQLxRZs9bnryjPHeMXfwMnqecPy0gFgt0MnoTVsYvVEPNasb7lxrDMS~JxqeWJz2TypQSIPFB9MFTml9lhqdc0Ea-hKoL15bZYciVudIhDsi3cL9VD~Rj537isdZKj-IZEob-C~K8rhP53whfF-W6RwPyyPPgRg__"
          }
          alt=""
          className="w-1/2 h-full p-30 object-contain"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute flex gap-2 items-center h-fit w-fit inset-4">
          <FaHeart className="text-red-500" />
          <p className="text-white text-sm">3022</p>
        </div>
      </div>
      <div className="flex flex-col w-full items-start gap-5 [background:#FFF] px-3.5 py-[11px] rounded-[0px_0px_18px_18px]">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-[7px] shrink-0">
            <img
              loading="eager"
              src="https://s3-alpha-sig.figma.com/img/7ebd/724b/be44b4b28bb6905c41f02f62fe20852a?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Luk3JLigyY~Bb0zVs~iRAl9UHuPgyEvneJF8IA~7WdRslGQkINtfsJMDn2VTAEfPk~37IsyhXN99Wu1DvDEkDoxtpcrO12M2n1iKaL8tAYISEuDEbdFtf5x3TSJYBmCdeCldcEqWYijipe4jNTzpW4d5hVHN47KbElrk~i64cH4NwdZi31QQ4~vWJCdktIsy~MiNjkgdNnwSdj1aVIeh7TdRs8zqUsIbzvf-G3nBXGCSDG7PrnU~F2b413~Rf9YbkFK0gaRffZumutXS31DNNiWQ77h~eP1NlYCpYIjh91HkyXo~7QCdODmbY6s3HVpLogDoYZHbOAS59isFm~PBOg__"
              alt=""
              className="w-[25px] h-[25px] shrink-0 rounded-[25px] object-cover"
            />
            <div className="space-y-1">
              <p className="text-black text-sm font-normal leading-[normal] tracking-[-0.28px] capitalize">
                {username ? username : "user***"}
              </p>
              <p className="text-black/50 text-sm font-normal leading-[normal] tracking-[-0.28px]">
                {profession}
              </p>
            </div>
          </div>
          {distance && (
            <div className="p-2 shrink-0 bg-[#E6E6E6] rounded-[31px] flex justify-center items-center text-[#464646] text-[13px] font-normal leading-[normal] tracking-[-0.26px]">
              <IoLocationOutline />
              <p>{parseInt(distance / 1000)} km</p>
            </div>
          )}
        </div>
        <p className="text-[#303030] text-lg font-normal leading-[normal]">
          I will design responsive websites
        </p>
        <div className="flex items-start gap-[9px]">
          <div className="flex h-6 justify-center items-center gap-[5px] [background:#EAF2EB] px-2 py-1 rounded-xl bg-[#EAF2EB] text-[#2A722E] text-sm font-normal leading-[100%] tracking-[-0.7px]">
            Illustration
          </div>
          <div className="flex h-6 justify-center items-center gap-[5px] [background:#EAF2EB] px-2 py-1 rounded-xl bg-[#EAF2EB] text-[#2A722E] text-sm font-normal leading-[100%] tracking-[-0.7px]">
            Sketching
          </div>
          <div className="flex h-6 justify-center items-center gap-[5px] [background:#EAF2EB] px-2 py-1 rounded-xl bg-[#EAF2EB] text-[#2A722E] text-sm font-normal leading-[100%] tracking-[-0.7px]">
            Painting
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
