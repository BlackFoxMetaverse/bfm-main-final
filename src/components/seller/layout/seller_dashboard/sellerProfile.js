"use client";

import React, { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaBehance,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import Modal from "@/components/Modules/Modal/Modal";
import ImageModal from "@/components/admin/Modules/ImageModal/ImageModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import FeedBackCard from "@/components/client/modules/FeedBackSection/FeedBackCard";
import instance from "@/utils/axios";
import Toast from "@/components/Modules/Toast/Toast";
import { getSellerProfile } from "../../../../utils/userData";
// import FeedBackCard from "../../modules/FeedBackSection/FeedBackCard";
// import ProposalModal from "../../modules/proposalSection/ProposalModal";

const ImageComponent = ({ src, alt, className, onClick }) => (
  <img
    loading="eager"
    src={src}
    alt={alt}
    onClick={onClick}
    className={className}
  />
);

const SellerPortfolio = ({ params }) => {
  const router = useRouter();
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;

  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [feedbackData, setFeedBackData] = useState(null);

  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeImageModal = () => {
    setModalImageUrl(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("bfm-client-token");
    getSellerProfile(token)
      .then((data) => setUserData(data?.data))
      .catch((err) => console.error(err));
  }, []);

  async function getFeedBack() {
    try {
      const token = localStorage.getItem("bfm-client-token");
      const response = await instance.get(
        `/main/sellerFeedback?uid=${params?.id}`,
        {
          headers: {
            token: token,
          },
        }
      );

      setFeedBackData(response?.data?.data);
    } catch (error) {
      console.error(error?.response);
    }
  }

  useEffect(() => {
    getFeedBack();
  }, []);

  return (
    <div className="flex lg:flex-row flex-col w-11/12 justify-between max-w-[1920px] gap-14 py-32 mx-auto">
      <div className="flex gap-7 xl:w-[40%] w-full items-start xl:sticky static inset-y-24 h-full">
        <div className="space-y-5 w-full">
          <div className="w-full flex flex-col overflow-hidden gap-8 rounded-lg justify-center bg-white p-7 items-center">
            <div className="w-full h-full items-start shrink-0 gap-[22.29px] flex">
              <div className="w-1/3 aspect-square rounded-2xl shrink-0 overflow-hidden relative bg-stone-300">
                <img
                  src={userData?.image ? s3Url + userData?.image : ""}
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
                    {userData?.userName ? userData?.userName : "Username"}
                  </div>
                  <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                    {userData?.profession}
                  </div>
                </div>
                {/* <div className="w-[72.45px] h-[25.03px] pl-[9.82px] pr-[8.63px] pt-[4.91px] pb-[5.12px] bg-gray-200 rounded-xl justify-center items-center inline-flex">
                  <div className="text-zinc-700 text-[13px] font-normal font-['Work Sans']">
                    {userData?.isActive ? "Available" : "Unavailable"}
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
                  <div className=" text-black text-base leading-normal">
                    {Number(userData?.rating?.value).toFixed(1)}
                  </div>
                  <div className=" text-black text-base leading-normal">
                    ({userData?.rating?.count})
                  </div>
                </div>
              </div>
            </div>
            {/* {showDetails && ( */}
            <div className="w-full flex-col justify-start items-start gap-7 flex">
              <div className="flex-col w-full justify-start items-start gap-0.5 flex">
                <div className="text-black text-xl font-bold">
                  Phones Number
                </div>
                <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal flex justify-between items-center w-full">
                  {userData?.phone_number}
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 flex">
                <div className="text-black text-xl font-bold">
                  Email Address
                </div>
                <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                  {userData?.email}
                </div>
              </div>
              <div className="w-full text-3xl justify-start items-start gap-[18px] inline-flex">
                {userData?.socialMediaLinks?.map((link, index) => (
                  <Link key={index} href={"/"}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* )} */}
          </div>
          {/* {!showDetails ? ( */}
          <button
            className="bg-black w-full text-white flex justify-center items-center p-3 rounded-lg "
            onClick={() =>
              router.push(
                "/seller/form"
                // `/seller/dashboard/${params?.username}/${params?.id}/edit`
              )
            }
          >
            Edit Profile
          </button>
          {/* ) : null} */}
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
      <div className="flex flex-col rounded-xl w-full">
        {userData?.images[0] ? (
          <ImageComponent
            src={s3Url + userData?.images[0]}
            alt=""
            className="object-cover size-full rounded-xl"
          />
        ) : null}
        <div>
          <h2 className="mt-8 w-full text-3xl font-bold text-neutral-800 max-md:max-w-full">
            About Me
          </h2>
          <p className="mt-2.5 w-full text-lg leading-7 text-neutral-600 max-md:max-w-full">
            {userData?.description}
          </p>
        </div>
        {/* Experience */}
        {userData?.experienceDetails && (
          <div className="flex-col justify-start items-start gap-2.5 mt-7 inline-flex">
            <div className="text-neutral-800 text-[32px] font-bold">
              Experience
            </div>
            <div className="flex-col justify-start items-start gap-5 w-full flex">
              {userData?.experienceDetails?.map((exp, index) => (
                <div
                  key={index}
                  className="px-[30px] py-5 rounded-[10px] border w-full border-zinc-300 flex-col justify-start items-start gap-2.5 flex"
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
        {showImage ? (
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
                      className="size-full cursor-pointer object-cover rounded-xl"
                      src={s3Url + data}
                      alt=""
                      onClick={() => openImageModal(data)}
                    />
                  </div>
                ) : null
              )}

            {modalImageUrl && (
              <ImageModal
                imageUrl={s3Url + modalImageUrl}
                closeModal={closeImageModal}
              />
            )}
          </div>
        ) : null}

        {/* Feedback Section */}
        <section className="space-y-8 p-7 bg-white rounded-xl">
          <header className="text-3xl font-bold text-black max-md:max-w-full">
            Client Feedback
          </header>
          {feedbackData?.length === 0 ? (
            feedbackData.map((feedbackData, index) => (
              <FeedBackCard key={index} {...feedbackData} />
            ))
          ) : (
            <div>No Feedbacks</div>
          )}
          {feedbackData?.length > 5 && (
            <button className="justify-center w-full items-center px-16 py-2.5 mt-7 text-sm font-bold text-black whitespace-nowrap bg-gray-100 rounded-md border border-solid border-neutral-200 max-md:px-5 max-md:max-w-full">
              Load More
            </button>
          )}
        </section>
      </div>
      {userData === "You Need to Login Click Here 👆" && (
        <Toast type={"warning"} message={userData} />
      )}
      {userData === "Something went wrong" && (
        <Toast type={"error"} message={userData} />
      )}
    </div>
  );
};

export default SellerPortfolio;
