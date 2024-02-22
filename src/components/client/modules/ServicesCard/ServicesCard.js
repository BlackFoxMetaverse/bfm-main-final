"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

const ServicesCard = ({ username, id, img, distance, profession }) => {
  const router = useRouter();

  return (
    <div
      suppressHydrationWarning
      onClick={() => router.push(`/client/username/${username}/${id}`)}
      className="flex flex-col cursor-pointer items-start w-full border bg-transparent rounded-md overflow-hidden"
    >
      <div className="flex w-full items-center justify-center bg-gradient-to-b from-black/25 to-white/75 overflow-hidden aspect-video relative">
        <img
          loading="eager"
          src={
            img
              ? img
              : "https://s3-alpha-sig.figma.com/img/8039/1376/5c2bce496303f7ed9513ad5c392f334a?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZdhkXKkEMuJe5QUX7MH9NCRRihlc-JEb1G4GdegxSTE1m6mdmDDmtoybW2xP45zzaB~r-oNft~9IVoerFcZkfQ8u8uCXZX0EP6cksDQkV2nrf570mTjNFwVyz4wkVfc-ECBrmqCoFGLbgX9xXnDGfPbOTCIndQ7w3ecyurzKw7TgMf2Yo6TBbMMCgm3Jv9QyCZE-Mb79C0o0PNC4URNv3mg6VZkyaNz3YBPm2yQBO8vp7hX4qeIcwUSKhKZmR7TBa6oqSg0KkEOhGCfI3TFj4n8skfLRMyGIFrpKqzsykVzhchJnDfVQypLOcD9b97z5rg4lk-39TmzXZFJaqbyTow__"
            // "https://s3-alpha-sig.figma.com/img/5ca6/41d6/d9d3087f77befa738f3b738374c70659?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qe2O1YLXcn-DWw8XmPl38AAjMrhqvJIEbjCvA1Vk5eNRkHB7L0DTkb-bl2j1tpsBCUp8qOpJV9AYr2pi6-rI~jqBRnGMht4LyV51BBdgyWPDJCc0HTAXkvN5jx3Wk61k6rIPQMpLbLu53anjEO0j63UOAXmJ7H1BBgA4lxf8fvCAvynlVOxryh0hQLxRZs9bnryjPHeMXfwMnqecPy0gFgt0MnoTVsYvVEPNasb7lxrDMS~JxqeWJz2TypQSIPFB9MFTml9lhqdc0Ea-hKoL15bZYciVudIhDsi3cL9VD~Rj537isdZKj-IZEob-C~K8rhP53whfF-W6RwPyyPPgRg__"
          }
          alt=""
          className={`${
            !img
              ? "w-full h-full object-cover"
              : "w-1/2 h-full p-30 object-contain"
          }`}
        />
        {/* <div className="absolute inset-0 bg-black/30"></div> */}
        {/* <div className="absolute flex gap-2 items-center h-fit w-fit inset-4">
          <FaHeart className="text-red-500" />
          <p className="text-white text-sm">3022</p>
        </div> */}
      </div>
      <div className="flex flex-col w-full items-start gap-2 [background:#FFF] pt-3 rounded-[0px_0px_18px_18px]">
        <div className="flex w-11/12 mx-auto justify-between items-center">
          <div className="flex items-center gap-[7px] shrink-0">
            <img
              loading="eager"
              src="https://s3-alpha-sig.figma.com/img/af89/2b90/0a65f018d2bdf5bceff8c22742283a67?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hXQoUNWndt2rYy2CWR66OA54gO5eswNmRNTnbt9DlGbBNNH1xOVAFuq225~9mwFA~OEyaE7AzjoInedxKPrx7M-C46KYeLwVhKKbLVkF~NFiWKzh8u2VtZfhtDkwxMO116HgIQfYVUeBOseUDm-pYcGnB1UyiNr0DIT9ETO89v5KwbUXsOy0ACY3crN0~SegfsCRKotJudyTiPORcaH0b5~X6-yVPrKbzhfH5RjegBmBwmrXAJDxpOXFGw5NUpKinBmXnpaTYvK4RjyXUpmJ5kuP6OdS31RGqdvz0pCINr8DxKqILbZ84xp5i6l5~u4fm5LU~lVKdJ-U6Vb4qfAa2Q__"
              alt=""
              className="w-[25px] aspect-square shrink-0 rounded-full object-cover"
            />
            <div className="space-y-0.5">
              <p className="text-black text-sm font-normal leading-[normal] tracking-[-0.28px] capitalize">
                {username ? username : "cc__creative"}
              </p>
              <p className="text-black/50 text-sm font-bold leading-[normal] text-indigo-500 tracking-[-0.28px]">
                {profession ? profession : "UI/UX Designer"}
              </p>
            </div>
          </div>
          <div className="px-2 py-1 shrink-0 bg-[#E6E6E6] border border-green-500 rounded-[31px] flex justify-center items-center text-[#464646] text-[13px] font-normal leading-[normal] tracking-[-0.26px]">
            <IoLocationOutline />
            <p>{distance ? parseInt(distance / 1000) : "2"} km</p>
          </div>
        </div>
        <p className="w-11/12 mx-auto min-h-[62.76px] text-neutral-800 text-base font-normal  leading-[23.01px]">
          I will design UI UX for mobile app with figma for ios or android
        </p>
        <div className="flex items-center gap-2 w-11/12 mx-auto">
          <BsStarFill className="text-orange-300" />
          <div>
            <span className="text-orange-300 text-xs font-bold leading-snug">
              5.0{" "}
            </span>
            <span className="text-zinc-400 text-xs font-normal leading-snug">
              (163)
            </span>
          </div>
        </div>
        <div className="w-full min-h-[61.72px] h-full relative border-t border-zinc-100">
          <div className="w-11/12 mx-auto h-full items-center gap-[8.61px] flex absolute inset-0">
            <div className="pl-[11.21px] pr-[11.32px] pt-[3.76px] pb-[3.69px] rounded-[17.34px] border border-stone-950 justify-center items-center flex">
              <div className="text-stone-950 text-xs  leading-[20.81px]">
                SEO
              </div>
            </div>
            <div className="pl-[12.15px] pr-[12.05px] pt-[3.76px] pb-[3.69px] rounded-[17.34px] border border-stone-950 justify-center items-center flex">
              <div className="text-stone-950 text-xs  leading-[20.81px]">
                Freelancing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
