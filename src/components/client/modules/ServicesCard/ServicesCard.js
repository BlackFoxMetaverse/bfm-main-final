"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import placeHolderImage from "../../../../../public/clients_images/placeholderImage.svg";

const MessageModal = ({ close, params }) => {
  const myRef = useRef(null);
  const router = useRouter();

  const handleClose = (e) => {
    if (myRef.current && !myRef.current.contains(e.target)) {
      close();
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
    >
      <div
        ref={myRef}
        onClick={(e) => e.stopPropagation()}
        className="2xl:w-1/5 xl:w-1/4 lg:w-1/3 rounded sm:w-1/2 w-11/12 m-auto p-7 bg-white aspect-video flex flex-col justify-center items-center"
      >
        <p className="flex-grow font-bold">
          On Clicking on the card may deduct your 1 token automatically
        </p>
        <button
          type="button"
          className="flex justify-center items-center rounded-md px-7 py-3 bg-black text-white"
          onClick={() =>
            router.push(`/client/username/${params.userName}/${params.uid}`)
          }
        >
          Go Anyway
        </button>
      </div>
    </div>
  );
};

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
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
  const router = useRouter();
  const [showWarnig, setWarning] = useState(false);

  return (
    <div
      suppressHydrationWarning
      onClick={() => setWarning(!showWarnig)}
      className="flex flex-col cursor-pointer items-start w-full border bg-transparent rounded-md overflow-huidden"
    >
      <div className="flex size-full items-center justify-center bg-gradient-to-b from-black/25 to-white/75 overflow-hidden aspect-video relative">
        <img
          loading="eager"
          src={
            coverImage
              ? s3Url + coverImage
              : "https://s3-alpha-sig.figma.com/img/5ca6/41d6/d9d3087f77befa738f3b738374c70659?Expires=1710115200&Key-Pair-uid=APKAQ4GOSFWCVNEHN3O4&Signature=WuyyuidfYLtxkaphdUE3nkuMWrxElbay11DcUq3bzbd-fu2OuidU~aMU5n~j3nd2er5L~26u3z9yMQvLGsCvDfeIHuGO6GKIgSU3dR~N6w43RKXMNY2q71~DSqq4-alU4R9G7t7tGnXYJQI5Y5TaEsOg-ERR32wZDLmXArziE9FjoB2PKkAQPbPC-rpI0sU7cVNX7Pqjvoq-lF1nx9HMKVBBjpBN-5FlUMxhYZmH8XgDmO~XYkgiVYiuBYSwn3gunY~Yz3uKjSmxNY14GOGni6qUiJipoZSVUrKSfURwdjrjdqggDV-Dgq-rVXecHmQe~dxceXnaAps3AnriBS9ypgIQ__"
            // "https://s3-alpha-sig.figma.com/img/8039/1376/5c2bce496303f7ed9513ad5c392f334a?Expires=1709510400&Key-Pair-uid=APKAQ4GOSFWCVNEHN3O4&Signature=ZdhkXKkEMuJe5QUX7MH9NCRRihlc-JEb1G4GdegxSTE1m6mdmDDmtoybW2xP45zzaB~r-oNft~9IVoerFcZkfQ8u8uCXZX0EP6cksDQkV2nrf570mTjNFwVyz4wkVfc-ECBrmqCoFGLbgX9xXnDGfPbOTCIndQ7w3ecyurzKw7TgMf2Yo6TBbMMCgm3Jv9QyCZE-Mb79C0o0PNC4URNv3mg6VZkyaNz3YBPm2yQBO8vp7hX4qeIcwUSKhKZmR7TBa6oqSg0KkEOhGCfI3TFj4n8skfLRMyGIFrpKqzsykVzhchJnDfVQypLOcD9b97z5rg4lk-39TmzXZFJaqbyTow__"
          }
          alt=""
          className={`${
            coverImage
              ? "size-full object-cover"
              : "w-1/2 h-full p-30 object-contain"
          }`}
        />
        {/* <div className="absolute inset-0 bg-black/30"></div> */}
        {/* <div className="absolute flex gap-2 items-center h-fit w-fit inset-4">
          <FaHeart className="text-red-500" />
          <p className="text-white text-sm">3022</p>
        </div> */}
      </div>
      <div className="flex flex-col w-full items-start gap-2 [background:#FFF] pt-3">
        <div className="flex w-11/12 mx-auto justify-between items-center">
          <div className="flex items-center gap-[7px] shrink-0">
            <img
              loading="eager"
              src={
                image
                  ? s3Url + image
                  : "../../../../../public/clients_images/placeholderImage.svg"
              }
              alt=""
              className="w-[25px] aspect-square shrink-0 rounded-full object-cover"
            />
            <div className="space-y-0.5">
              <p className="text-black text-sm font-normal leading-[normal] tracking-[-0.28px] capitalize">
                {userName}
              </p>
              <p className="text-black/50 text-sm font-bold leading-[normal] text-indigo-500 tracking-[-0.28px]">
                {profession}
              </p>
            </div>
          </div>
          <div className="px-2 py-1 shrink-0 bg-[#E6E6E6] border border-green-500 rounded-[31px] flex justify-center items-center text-[#464646] text-[13px] font-normal leading-[normal] tracking-[-0.26px]">
            <IoLocationOutline />
            <p>{distance ? parseInt(distance / 1000) : "0"} km</p>
          </div>
        </div>
        <p className="w-11/12 mx-auto min-h-[62.76px] text-neutral-800 text-base font-normal  leading-[23.01px]">
          {description?.slice(0, 75) + "..."}
        </p>
        <div className="flex items-center gap-2 w-11/12 mx-auto">
          <BsStarFill className="text-orange-500" />
          <div>
            <span className="text-orange-500 text-xs font-bold leading-snug mr-1">
              {rating?.value?.toString()?.slice(0, 3)}
            </span>
            <span className="text-zinc-400 text-xs font-normal leading-snug">
              ({rating?.count})
            </span>
          </div>
        </div>
        <div className="w-full min-h-[61.72px] h-full relative border-t border-zinc-100">
          <div className="w-11/12 mx-auto h-full items-center gap-[8.61px] flex absolute inset-0">
            {services?.slice(0, 2)?.map((service, index) => (
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
        </div>
      </div>
      {showWarnig && (
        <MessageModal
          close={() => setWarning(!showWarnig)}
          params={{ uid, userName }}
        />
      )}
    </div>
  );
};

export default ServicesCard;
