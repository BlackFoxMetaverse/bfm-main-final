"use client";
import React, { useState } from "react";
import { CiFacebook, CiLocationOn } from "react-icons/ci";
import { FaHeart, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import Profile from "../../../../assets/graphicDesigner.png";
import Image from "next/image";
import Frame1 from "../../../../assets/Frame1.svg";
import Frame2 from "../../../../assets/Frame2.svg";
import Frame3 from "../../../../assets/Frame3.svg";
import Frame4 from "../../../../assets/Frame4.svg";
import Frame5 from "../../../../assets/Frame5.svg";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "@/components/Modules/Modal/Modal";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ImageModal from "@/components/admin/Modules/ImageModal/ImageModal";
import { useRouter } from "next/navigation";
const SellerDetails = () => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const image = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame1];
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeImageModal = () => {
    setModalImageUrl(null);
  };
  return (
    <div className="pt-20 bg-[#fff]">
      <div className={` h-full pb-10 p-10`}>
        <div className="w-11/12 mx-auto mb-10">
          <button
            onClick={() => router.back()}
            className="bg-blue-50 text-blue-600 p-2 flex justify-center items-center gap-2 rounded"
          >
            {" "}
            <IoArrowBackCircleOutline className="w-5 h-5" />
            Back
          </button>
        </div>

        <div className="space-y-10 h-full">
          <div className="flex w-10/12 gap-5 mx-auto shrink-0 rounded-[20px]">
            <div className="w-1/3 space-y-5 ">
              <div className="w-full overflow-hidden px-5 p-4 bg-white  shadow-md shadow-gray-500 gap-8 rounded-[25.636px] items-center">
                <div className=" p-4 bg-white flex gap-8 rounded-[25.636px] items-center">
                  <Image
                    src={Profile}
                    onClick={() => openImageModal(Profile)}
                    className="flex cursor-pointer object-cover 3xl:w-[9.17rem] 2xl:w-[7rem] xl:w-[5rem] lg:w-[3rem] aspect-square justify-center items-center shrink-0 rounded-full"
                    alt=""
                  />

                  <div className="space-y-2">
                    <p className="text-black  whitespace-pre-wrap break-words 3xl:text-[20px] 2xl:text-xl xl:text-base lg:text-medium not-italic font-bold leading-[normal] capitalize">
                      Ri*****
                    </p>

                    <p className="text-[#696969] 3xl:text-xl 2xl:text-base xl:text-base not-italic font-normal leading-[36.814px]">
                      FrontEnd Developer
                    </p>

                    <p className="flex text-green-500 bg-gray-200 max-w-[100px] text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-full">
                      Available
                    </p>
                  </div>
                </div>

                <div className=" px-5 space-y-9">
                  <div className=" flex justify-center text-gray-600 items-center  text-sm max-w-[250px]  bg-gray-200 gap-[4.866px] pl-[12.164px] pr-[9.732px] py-[4.082px] rounded-full">
                    Faridabad, Haryana <CiLocationOn />
                  </div>
                  <div className="self-stretch relative space-y-8 text-[#696969] text-xl not-italic font-bold leading-[27px] p-3">
                    {!showDetails ? (
                      <div className=" absolute inset-0 backdrop-blur-[3.799999952316284px] "></div>
                    ) : null}
                    <div className="space-y-2 ">
                      <p className="self-stretch  text-[#696969] text-xl not-italic font-bold leading-[27px]">
                        Phone Number
                      </p>
                      <p className="self-stretch text-[#696969] text-lg not-italic font-normal leading-[27px]">
                        8709360543
                      </p>
                    </div>
                    <div className="self-stretch space-y-4 text-[#696969] text-xl not-italic font-bold leading-[27px]">
                      <p className="self-stretch  text-[#696969] text-xl not-italic font-bold leading-[27px]">
                        Email Address
                      </p>
                      <p className="self-stretch text-[#696969] text-lg not-italic font-normal leading-[27px]">
                        ritikbhushanmain@gmail.com
                      </p>
                    </div>
                    <div className="self-stretch space-y-4 text-[#696969] text-xl not-italic font-bold leading-[27px]">
                      <p>Social Media</p>
                      <div className="flex gap-3">
                        <div className="bg-gray-100 p-2 rounded-full hover:text-red-500 hover:border-red-500 hover:border ">
                          <FaInstagram className=" " />
                        </div>
                        <div className="bg-gray-100 p-2 rounded-full hover:text-blue-600 hover:border-blue-600 hover:border ">
                          <CiFacebook className=" " />
                        </div>
                        <div className="bg-gray-100 p-2 hover:text-red-700 hover:border-red-700 hover:border  rounded-full">
                          <FaYoutube className=" " />
                        </div>

                        <div className="bg-gray-100 p-2 rounded-full hover:text-blue-900 hover:border-blue-900 hover:border ">
                          <FaLinkedin className=" " />
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch space-y-4 text-[#696969] text-xl not-italic font-bold leading-[27px]">
                      <p className="self-stretch  text-[#696969] text-xl not-italic font-bold leading-[27px]">
                        Rating
                      </p>
                      <div className="flex gap-4">
                        <FaHeart className="text-red-500" />
                        <FaHeart className="text-red-500" />
                        <FaHeart className="text-red-500" />
                        <FaHeart className="text-red-100" />
                        <FaHeart className="text-red-100" />
                        <p className=" text-gray-500">3022</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full relative justify-end items-end py-5 text-end ">
                    <div
                      className="relative inline-block"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <FaInfoCircle className="w-4 h-4 text-blue-600 cursor-pointer" />
                      {showTooltip && (
                        <div className="absolute right-6 w-[270px] p-2 space-y-4 bottom-full bg-white  rounded shadow-lg">
                          <h2 className="font-semibold text-sm text-center ">
                            How to get contact information?
                          </h2>
                          <p className=" text-xs text-center ">
                            There are a lot of things you can do in space, and
                            space essentially is unlimited resources.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {!showDetails ? (
                <button
                  className="bg-blue-500 w-full text-white flex justify-center items-center p-3 rounded-full "
                  onClick={openModal} // Open modal when button is clicked
                >
                  Reveal Contact Information
                </button>
              ) : (
                <button className="bg-blue-500 w-full text-white flex justify-center items-center p-3 rounded-full ">
                  Message
                </button>
              )}
            </div>
            {/* {notFound ? (
              <div className="flex flex-col w-2/3 space-y-10 h-[650px] overflow-hidden justify-center items-center space-x-10 bg-white p-10 rounded-[20px]">
                404 Not Found
              </div>
            ) : ( */}
            <div className="flex flex-col w-2/3 space-y-10  space-x-10 bg-white p-10 rounded-[20px]">
              <div className="  space-y-6">
                <div className="bg-blue-50 rounded-full px-3">
                  <p className="shrink-0 text-blue-600 text-sm  not-italic font-normal leading-[160%]">
                    www.randomlinkoftheproject.com/sefhsf12r93rhxm29h47r29
                    hc29r37h923h293r7s,hm29hrxh
                  </p>
                </div>
                <div>
                  <p className="shrink-0 text-[color:var(--Davys-Grey,#4D4D4D)] text-[15.413px] not-italic font-normal leading-[160%]">
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a document or a typeface without relying on
                    meaningful content. Lorem ipsum may be used as a placeholder
                    before the final copy is available.
                  </p>
                </div>
                <div className="border w-full"></div>
                <div className="flex gap-3">
                  <p className="flex text-green-600 bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]">
                    Illustration
                  </p>
                  <p className="flex text-green-600 bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]">
                    Illustration
                  </p>
                  <p className="flex text-green-600 bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]">
                    Illustration
                  </p>
                </div>
                {!showImage ? (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h1 className="text-xl font-bold">Project Title</h1>
                      <p className="shrink-0 text-[color:var(--Davys-Grey,#4D4D4D)] text-[15.413px] not-italic font-normal leading-[160%]">
                        In publishing and graphic design, Lorem ipsum is a
                        placeholder text commonly used to demonstrate the visual
                        form of a document or a typeface without relying on
                        meaningful content. Lorem ipsum may be used as a
                        placeholder before the final copy is available.
                      </p>
                      <div className="bg-blue-50 rounded-full px-3">
                        <p className="shrink-0 text-blue-600 text-sm  not-italic font-normal leading-[160%]">
                          www.randomlinkoftheproject.com/sefhsf12r93rhxm29h47r29
                          hc29r37h923h293r7s,hm29hrxh
                        </p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h1 className="text-xl font-bold">Project Title</h1>
                      <p className="shrink-0 text-[color:var(--Davys-Grey,#4D4D4D)] text-[15.413px] not-italic font-normal leading-[160%]">
                        In publishing and graphic design, Lorem ipsum is a
                        placeholder text commonly used to demonstrate the visual
                        form of a document or a typeface without relying on
                        meaningful content. Lorem ipsum may be used as a
                        placeholder before the final copy is available.
                      </p>
                      <div className="bg-blue-50 rounded-full px-3">
                        <p className="shrink-0 text-blue-600 text-sm  not-italic font-normal leading-[160%]">
                          www.randomlinkoftheproject.com/sefhsf12r93rhxm29h47r29
                          hc29r37h923h293r7s,hm29hrxh
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* <div className="flex gap-8">
                    <div className="flex gap-1 justify-center items-center ">
                      <CiHeart />
                      <p>3,245</p>
                    </div>
                    <div>
                      <p className="text-[color:var(--Davys-Grey,#4D4D4D)] text-[13.211px] not-italic font-bold leading-[160%]">
                        Sep 12, 2021
                      </p>
                    </div>
                  </div> */}
              </div>
              {showImage ? (
                <div className=" justify-center items-center grid grid-cols-2  w-full p-10 gap-2">
                  {image?.map((data, i) => (
                    <div
                      key={i}
                      className={`relative ${
                        i === 5 || i === 0 ? "col-span-2 row-span-2" : ""
                      }`}
                    >
                      <Image
                        loading="lazy"
                        className="w-[100%] h-[100%] cursor-pointer object-cover"
                        src={data}
                        alt=""
                        onClick={() => openImageModal(data)}
                      />
                    </div>
                  ))}

                  {modalImageUrl && (
                    <ImageModal
                      imageUrl={modalImageUrl}
                      closeModal={closeImageModal}
                    />
                  )}
                </div>
              ) : null}
            </div>
            {/* )} */}
          </div>
        </div>
      </div>

      {showModal && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default SellerDetails;
