"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { CiFacebook, CiHeart, CiLocationOn } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaAngleRight, FaHeart, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import ImageModal from "../../Modules/ImageModal/ImageModal";
import Link from "next/link";
import PreLoader from "@/components/Modules/Preloader/preLoader";
import instance from "@/utils/axios";
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
        const response = await instance.get(
          `/super_user/getUserProfile?uid=${id}`,
          {
            headers: {
              token: accessToken,
            },
          }
        );
        // const data = await response.json();
        if (data.message === "Admin token has expired") {
          router.replace("/admin/auth/login");
        } else if (data?.message === `user with ${id} not found !`) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
        setUserData(data?.userProfile);
        setImages(data?.userProfile.images);
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

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeModal = () => {
    setModalImageUrl(null);
  };

  return (
    <main className={`${name}'s_detail h-full pb-10`}>
      <div className="space-y-10 h-full">
        <div className="max-w-[1603px] min-h-[3.2rem] flex items-center shrink-0 bg-[#7F63F4]/10">
          <p className="max-w-[849px] text-[#7F63F4] 3xl:text-[22px] 2xl:text-xl xl:text-lg lg:text-base not-italic font-semibold leading-[54px] mx-8">
            User Management / user profile
          </p>
        </div>
        <div className="w-11/12 space-y-6 mx-auto">
          <p className="text-black 3xl:text-[40px] 2xl:text-3xl xl:text-xl lg:text-lg not-italic font-medium leading-[100%]">
            Seller Profile
          </p>
          <div className="flex items-center gap-8 h-[13rem]">
            <div className="max-w-[63.4rem] w-2/3 py-7 bg-white h-full shrink-0 rounded-[1.5rem]">
              <div className="w-5/6 mx-auto h-full">
                <p className="text-black 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]">
                  User Login/Activity History
                </p>
                {ActivityHistory.length === 0 ? (
                  <div className="w-full h-full flex justify-center gap-2 items-center">
                    <BsExclamationCircleFill className="text-red-600" />
                    <span>No Data</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="max-w-[30.5rem] w-1/3 h-full py-5 bg-white shrink rounded-[25px]">
              <div className="w-5/6 mx-auto flex flex-col justify-between items-start h-full">
                <p className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]">
                  Actions
                </p>
                <div className="flex items-end flex-grow justify-between w-full">
                  <button
                    type="button"
                    disabled={
                      adminPrevilages?.data?.sub_admin_privilege?.user?.has
                        ?.update
                        ? true
                        : false
                    }
                    className={`text-white px-4 py-2 rounded ${
                      adminPrevilages?.data?.sub_admin_privilege?.user?.has
                        ?.update
                        ? "opacity-1 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    } bg-[#374fcb] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={
                      adminPrevilages?.data?.sub_admin_privilege?.user?.has
                        ?.update
                        ? true
                        : false
                    }
                    className={`text-white px-4 py-2 rounded ${
                      adminPrevilages?.data?.sub_admin_privilege?.user?.has
                        ?.update
                        ? "opacity-1 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    } bg-[#f25350] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]`}
                  >
                    Suspend{" "}
                  </button>
                  <button
                    type="button"
                    disabled={
                      adminPrevilages?.data?.sub_admin_privilege?.user?.has
                        ?.delete
                        ? true
                        : false
                    }
                    className={`text-white px-4 py-2 rounded 3xl:text-2xl${
                      adminPrevilages?.data?.sub_admin_privilege?.user?.has
                        ?.delete
                        ? "opacity-1 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    } bg-[#E53935] 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-11/12 gap-5 mx-auto shrink-0 rounded-[20px]">
          <div className="w-1/3 space-y-5 ">
            <div className="w-full overflow-hidden px-5 p-4 bg-white gap-8 rounded-[25.636px] items-center">
              <div className=" p-4 bg-white flex gap-8 rounded-[25.636px] items-center">
                {decodeURIComponent(image) === "img" ? (
                  <div className="w-20 h-20 rounded-full bg-purple-500 flex justify-center items-center text-3xl font-bold text-white">
                    {decodeURIComponent(name).charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <img
                    src={s3Url + decodeURIComponent(image)}
                    onClick={() => openModal(s3Url + image)}
                    className="flex cursor-pointer object-cover 3xl:w-[9.17rem] 2xl:w-[7rem] xl:w-[5rem] lg:w-[3rem] aspect-square justify-center items-center shrink-0 rounded-full"
                    alt=""
                  />
                )}
                <div className="space-y-1">
                  <p className="text-black  whitespace-pre-wrap break-words 3xl:text-[20px] 2xl:text-xl xl:text-base lg:text-medium not-italic font-bold leading-[normal] capitalize">
                    {decodeURIComponent(name)}
                  </p>

                  <p className="text-[#696969] 3xl:text-xl 2xl:text-base xl:text-base not-italic font-normal leading-[36.814px]">
                    {decodeURIComponent(designation)}
                  </p>

                  {/* <p className="flex text bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]">
                    Available
                  </p> */}
                </div>
              </div>

              <div className=" px-5 space-y-9">
                {/* <div className=" flex justify-center text-gray-600 items-center  bg-gray-200 gap-[4.866px] pl-[12.164px] pr-[9.732px] py-[6.082px] rounded-full">
                  Faridabad, Haryana <CiLocationOn />
                </div> */}
                <div>
                  <p className="flex text-green-500 bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]">
                    Available
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="self-stretch  text-[#696969] text-xl not-italic font-bold leading-[27px]">
                    Phone Number
                  </p>
                  <p className="self-stretch text-[#696969] text-lg not-italic font-normal leading-[27px]">
                    {decodeURIComponent(phone)}
                  </p>
                </div>
                <div className="self-stretch space-y-4 text-[#696969] text-xl not-italic font-bold leading-[27px]">
                  <p className="self-stretch  text-[#696969] text-xl not-italic font-bold leading-[27px]">
                    Email Address
                  </p>
                  <p className="self-stretch text-[#696969] text-lg not-italic font-normal leading-[27px]">
                    {decodeURIComponent(email)}
                  </p>
                </div>
                <div className="self-stretch space-y-4 text-[#696969] text-xl not-italic font-bold leading-[27px]">
                  <p>Social Media</p>
                  <div className="flex gap-3">
                    {/* <div className="bg-gray-100 p-2 rounded-full">
                      <FaInstagram />
                    </div>
                    <div className="bg-gray-100 p-2 rounded-full">
                      <CiFacebook />
                    </div>
                    <div className="bg-gray-100 p-2 rounded-full">
                      <FaYoutube />
                    </div> */}

                    {/* <Link
                      target=" "
                      href={userData?.socialMediaLinks}
                      className="bg-gray-100 p-2 rounded-full"
                    >
                      <FaLinkedin />
                    </Link> */}
                  </div>
                </div>
                {/* <div className="self-stretch space-y-4 text-[#696969] text-xl not-italic font-bold leading-[27px]">
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
                </div> */}
              </div>
            </div>
            <div className=" px-5 space-y-5 overflow-hidden p-4 bg-white gap-8 rounded-[25.636px] items-center">
              <div className="flex justify-center items-center w-full">
                <select className="p-2 bg-transparent outline-none shrink-0 border-blue-600 text-blue-600  px-[20px]  rounded-[15px] border-[1.5px] border-solid">
                  <option value="Action order">Action order</option>
                </select>
              </div>
              <p className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-xl not-italic font-bold leading-[normal]">
                Active Order : 0
              </p>
            </div>
          </div>
          {notFound ? (
            <div className="flex flex-col w-2/3 space-y-10 h-[650px] overflow-hidden justify-center items-center space-x-10 bg-white p-10 rounded-[20px]">
              404 Not Found
            </div>
          ) : (
            <div className="flex flex-col w-2/3 space-y-10 h-[650px] overflow-y-scroll space-x-10 bg-white p-10 rounded-[20px]">
              <div className="  space-y-8">
                {/* <div>
                    <div className=" shrink-0 text-[color:var(--Black,#000)] text-[40.35px] not-italic font-semibold leading-[140%] tracking-[-0.807px]">
                      Galactic skull Luminescence
                    </div>
                  </div> */}
                <div>
                  <p className="shrink-0 text-[color:var(--Davys-Grey,#4D4D4D)] text-[15.413px] not-italic font-normal leading-[160%]">
                    {userData?.description}
                  </p>
                </div>
                <div className="border w-full"></div>
                <div className="flex gap-3">
                  {userData?.tags?.map((tag, index) => (
                    <p
                      key={index}
                      className="flex text-green-600 bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
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
              <div className="grid grid-cols-2  w-full p-10 gap-2">
                {getImages?.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      loading="lazy"
                      key={index}
                      className="w-[100%] h-[100%] cursor-pointer"
                      src={s3Url + image}
                      alt=""
                      onClick={() => openModal(s3Url + image)}
                    />
                  </div>
                ))}
                {modalImageUrl && (
                  <ImageModal
                    imageUrl={modalImageUrl}
                    closeModal={closeModal}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        {/* <div className="max-w-[96rem] w-11/12 bg-white mx-auto min-h-[25.25rem] shrink-0 rounded-[20px]">
          <div className="w-11/12 mx-auto py-14">
            <div className="flex-col text-center justify-center items-center">
              <h1 className="text-black 3xl:text-3xl 2xl:text-2xl xl:text-xl lg:text-lg not-italic font-bold leading-[normal]">
                Priority Orders
              </h1>
              
            </div>
            <table className="table-auto mt-9 w-full">
              <thead>
                <tr className="flex items-center gap-4 justify-between pt-[0.75rem] px-[0.75rem]">
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Section
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Buyer
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Gig
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pr-10 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Due On
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Total
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Note
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Status
                  </th>
                </tr>
              </thead>
              <hr className="w-full h-px bg-black my-4" />
              <tbody className=" flex-col justify-center items-center">
                {PurchaseHistory.length === 0 ? (
                  <tr className="flex w-full h-full justify-center items-center gap-2">
                    <BsExclamationCircleFill className="text-red-500" />
                    No Data
                  </tr>
                ) : (
                  PurchaseHistory?.map((history, index) => (
                    <tr
                      key={index}
                      className="flex w-full gap-4 justify-between items-center my-[1.5rem] pt-[0.75rem] px-[0.75rem]"
                    >
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        {index + 1}
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        Harsh Singh
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        23.11.23
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        Yes
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        Yes
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        Yes
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        <button
                          type="button"
                          className="flex justify-center items-center gap-[var(--numberLength,12.547px)] text-[color:var(--Foundation-Blue-blue-500,var(--Primary-1,#4461F2))] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]"
                        >
                          Action <FaAngleRight />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default SellerData;
