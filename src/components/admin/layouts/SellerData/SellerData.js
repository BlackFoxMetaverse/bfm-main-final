"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsExclamationCircleFill, BsStarFill } from "react-icons/bs";
import { CiFacebook, CiHeart, CiLocationOn } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import {
  FaAngleRight,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import ImageModal from "../../Modules/ImageModal/ImageModal";
import Link from "next/link";
import PreLoader from "@/components/Modules/Preloader/preLoader";
import instance from "@/utils/axios";
import { IoLocationOutline } from "react-icons/io5";
const ActivityHistory = [];
const PurchaseHistory = ["", "", "", "", "", "", ""];
const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
const SellerData = ({ name, id, phone, email, designation, image }) => {
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [adminPrevilages, setAdminPrevilages] = useState(null);
  const [getImages, setImages] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem("bfm-admin-token");
    const fetchData = async () => {
      try {
        const response = await instance.get(`/super_user/seller?uid=${id}`, {
          headers: {
            token: accessToken,
          },
        });
        // const data = await response.json();
        // if (data.message === "Admin token has expired") {
        //   router.replace("/admin/auth/login");
        // } else if (data?.message === `user with ${id} not found !`) {
        //   setNotFound(true);
        // } else {
        //   setNotFound(false);
        // }
        console.log("data", response?.data?.data);
        setUserData(response?.data?.data);
        setImages(response?.data?.data?.images);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchAdminData = async () => {
      const response = await instance.get("/super_user/login", {
        headers: {
          token: accessToken,
        },
      });

      if (response.status === 200) {
        setAdminPrevilages(response?.data);
      } else {
        setAdminPrevilages("Internal Server Error");
      }
    };

    fetchAdminData();
    fetchData();
  }, []);
  const handleDeleteSellerData = async (uid) => {
    const accessToken = localStorage.getItem("bfm-admin-token");

    try {
      const response = await instance.delete(`/super_user/seller?uid=${uid}`, {
        headers: {
          token: accessToken,
        },
      });
      console.log(response);
      console.log("Seller data deleted successfully");
    } catch (error) {
      console.error("Error deleting seller data:", error);
    }
  };
  const ImageComponent = ({ src, alt, className, onClick }) => (
    <img
      loading="eager"
      src={src}
      alt={alt}
      onClick={onClick}
      className={className}
    />
  );

  return (
    <main className={`${name}'s_detail h-full pb-10`}>
      <div className="max-w-[1603px] min-h-[3.2rem] bg-blue-50 fixed w-[84%] z-50 flex items-center justify-between shrink-0 bg-[#7F63F4]/10">
        <div>
          <p className="max-w-[849px] text-[#7F63F4] 3xl:text-[22px] 2xl:text-xl xl:text-lg lg:text-base not-italic font-semibold leading-[54px] mx-8">
            User Management / user profile
          </p>
        </div>
        <div className=" space-x-5 px-10">
          <button
            type="button"
            disabled={
              adminPrevilages?.data?.sub_admin_privilege?.user?.has?.update
                ? true
                : false
            }
            className={`text-white px-4 py-1 rounded ${
              adminPrevilages?.data?.sub_admin_privilege?.user?.has?.update
                ? "opacity-1 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } bg-[#374fcb] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]`}
          >
            Edit
          </button>
          <button
            type="button"
            disabled={
              adminPrevilages?.data?.sub_admin_privilege?.user?.has?.update
                ? true
                : false
            }
            className={`text-white px-4 py-1 rounded ${
              adminPrevilages?.data?.sub_admin_privilege?.user?.has?.update
                ? "opacity-1 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } bg-[#f25350] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]`}
          >
            Suspend{" "}
          </button>
          <button
            type="button"
            onClick={() => handleDeleteSellerData(userData?.uid)}
            className={`text-white px-4 py-1 rounded 3xl:text-2xl
                      
                         opacity-1 cursor-pointer
                      
                     bg-[#E53935] 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]`}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col w-11/12 justify-between max-w-[1920px] gap-14 lg:py-10 py-24 mx-auto">
        {/* {error !== null && <Toast type={"error"} message={error} />} */}
        <div className="flex gap-7 xl:w-[40%] w-full items-start lg:sticky static inset-y-28 h-full">
          <div className="space-y-5 w-full">
            <div className="w-full flex flex-col overflow-hidden gap-8 rounded-lg justify-center bg-white p-7 items-center">
              <div className="w-full h-full items-start shrink-0 gap-[22.29px] flex">
                <div className="w-1/3 aspect-square rounded-2xl shrink-0 overflow-hidden relative bg-stone-300">
                  <img
                    src={userData?.image ? userData?.image : null}
                    alt=""
                    className="size-full object-cover shrink-0"
                  />
                </div>
                <div className="flex-col w-2/3 justify-between h-full items-start 3xl:gap-2 gap-1 inline-flex">
                  <div className="text-black 3xl:text-2xl 2xl:text-xl lg:text-lg text-lg font-bold whitespace-nowrap">
                    {userData?.name}
                  </div>
                  <div className="flex-col justify-start items-start gap-[4.68px] flex">
                    <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                      {/* {params?.username
                      ? decodeURIComponent(params?.username)
                      : "Username"} */}
                    </div>
                    <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                      {userData?.profession}{" "}
                    </div>
                  </div>
                  {/* <div className="w-[72.45px] h-[25.03px] pl-[9.82px] pr-[8.63px] pt-[4.91px] pb-[5.12px] bg-gray-200 rounded-xl justify-center items-center inline-flex">
                    <div className="text-zinc-700 text-[13px] font-normal font-['Work Sans']">
                      Available
                    </div>
                  </div> */}
                  <div className="px-2 py-1 bg-black rounded-xl justify-center items-center gap-1 inline-flex">
                    <div className="text-white text-base font-normal whitespace-nowrap">
                      {userData?.city}
                    </div>
                    <IoLocationOutline className="text-white" />
                  </div>
                  <div className="justify-start items-start gap-2 inline-flex">
                    <BsStarFill className="w-[21.14px] h-[20.25px] text-orange-500 relative" />
                    <div className="w-[81px] text-black text-base leading-normal">
                      {userData?.rating?.value?.toString()?.slice(0, 3)} (
                      {userData?.rating?.count})
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex-col justify-start items-start gap-7 flex">
                <div className="flex-col w-full justify-start items-start gap-0.5 flex">
                  <div className="text-black text-xl font-bold">
                    Phones Number
                  </div>

                  <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal flex justify-between items-center w-full">
                    {userData?.phone_number}
                  </div>
                </div>
                {userData?.email && (
                  <div className="flex-col justify-start items-start gap-0.5 flex">
                    <div className="text-black text-xl font-bold">
                      Email Address
                    </div>
                    <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                      {userData?.email}
                    </div>
                  </div>
                )}
                {userData?.socialMediaLinks?.length > 0 && (
                  <div className="w-full text-3xl justify-start items-start gap-[18px] inline-flex">
                    {userData?.socialMediaLinks?.map((link, index) => (
                      <Link key={index} href={link}>
                        <FaGithub />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="max-w-[295px] text-stone-500 text-base font-normal leading-[27px]">
                  Service Provided
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  {userData?.services?.map((service, index) => (
                    <div
                      key={index}
                      className="px-[12.95px] pt-[4.35px] pb-[3.52px] rounded-[20.03px] border border-stone-950 justify-center items-center inline-flex"
                    >
                      <p className="text-stone-950 text-sm leading-normal">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="max-w-[295px] text-stone-500 text-base font-normal leading-[27px]">
                  Skills
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  {userData?.skills?.map((skill, index) => (
                    <div
                      key={index}
                      className="px-[12.95px] pt-[4.35px] pb-[3.52px] rounded-[20.03px] border border-stone-950 justify-center items-center inline-flex"
                    >
                      <p className="text-stone-950 text-sm leading-normal">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded w-full">
          {/* <div className="flex overflow-hidden aspect-video size-full relative px-10 pt-12 pb-8 max-md:px-5 max-md:max-w-full"> */}
          {userData?.images[0] && (
            <video
              src={userData.images[0]}
              alt=""
              className="object-cover size-full rounded"
            />
          )}
          <div>
            <h2 className="mt-8 w-full text-3xl font-bold text-neutral-800 max-md:max-w-full">
              About Me
            </h2>
            <p className="mt-2.5 w-full text-lg leading-7 text-neutral-600 text-justify max-md:max-w-full">
              {userData?.description}
            </p>
          </div>
          {/* Experience */}
          {userData?.experienceDetails && (
            <div className="flex-col justify-start items-start gap-2.5 mt-7 inline-flex">
              <div className="text-neutral-800 text-[32px] font-bold">
                Experience
              </div>
              <div className="flex-col justify-start items-start gap-5 flex w-full">
                {userData?.experienceDetails?.map((exp, index) => (
                  <div
                    key={index}
                    className="px-[30px] py-5 rounded-[10px] border border-zinc-300 w-full flex-col justify-start items-start gap-2.5 flex"
                  >
                    <div className="text-indigo-500 text-2xl leading-[27px]">
                      {exp?.title}
                    </div>
                    <div className="self-stretch text-neutral-600 text-lg font-normal leading-[27px]">
                      {exp?.content}
                    </div>
                    <Link
                      href={exp?.link}
                      target="_blank"
                      type="button"
                      className="px-7 py-2.5 rounded border border-black justify-center items-center gap-2.5 inline-flex"
                    >
                      <div className="text-black text-lg font-bold font-['Helvetica Neue'] leading-7">
                        Look At the Project
                      </div>
                      <FaAngleRight />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div
            style={{
              margin: 0,
            }}
            className="grid grid-cols-1 justify-center py-7 items-center w-full gap-2"
          >
            {userData?.videos
              ?.slice(1, userData?.videos?.length)
              ?.map((data, i) =>
                data ? (
                  <div key={i} className={`relative`}>
                    <video
                      loading="lazy"
                      className="size-full cursor-pointer object-cover rounded"
                      src={data}
                      alt=""
                      onClick={() => openImageModal(data)}
                    />
                  </div>
                ) : null
              )}
          </div>

          <div
            style={{
              margin: 0,
            }}
            className="grid grid-cols-1 justify-center py-7 items-center w-full gap-2"
          >
            {userData?.images
              ?.slice(1, userData?.images?.length)
              ?.map((data, i) =>
                data ? (
                  <div key={i} className={`relative`}>
                    <ImageComponent
                      loading="lazy"
                      className="size-full cursor-pointer object-cover rounded -z-20"
                      src={data}
                      alt=""
                      onClick={() => openImageModal(data)}
                    />
                  </div>
                ) : null
              )}

            {modalImageUrl && (
              <ImageModal
                imageUrl={modalImageUrl}
                closeModal={closeImageModal}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerData;
