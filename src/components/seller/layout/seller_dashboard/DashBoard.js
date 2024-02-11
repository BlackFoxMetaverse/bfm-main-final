import React from "react";
import Profile from "../../../../assets/graphicDesigner.png";
import Image from "next/image";
import { CgLogOut } from "react-icons/cg";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { LuCalendarCheck2 } from "react-icons/lu";
import SellerDashboardInfo from "../../modules/SellerDashboardInfo/SellerDashboardInfo";
import Showcase from "../../../../assets/Showcase.svg";
import Optimize from "../../../../assets/Optimization.svg";
import Active from "../../../../assets/Active.svg";
import ShowmImage1 from "../../../../assets/ShowImage1.svg";
import ShowmImage2 from "../../../../assets/ShowImage2.svg";
import ShowmImage3 from "../../../../assets/ShowImage3.svg";
import ShowmImage4 from "../../../../assets/ShowImage4.svg";
import ShowmImage5 from "../../../../assets/ShowImage5.svg";
import ShowmImage6 from "../../../../assets/ShowImage6.svg";
const DashBoard = () => {
  const showImage = [
    ShowmImage1,
    ShowmImage2,
    ShowmImage3,
    ShowmImage4,
    ShowmImage5,
    ShowmImage6,
  ];
  const information = [
    {
      image: Showcase,
      title: "Showcase Your Best Work",
      description: `Now that your profile is set up, let's showcase your expertise! Upload details of your best previous gig or project. Highlight key achievements, challenges overcome, and the impact of your work.`,
      button: "Add Gig/Project info",
    },
    {
      image: Optimize,
      title: "Optimize Your Gig Information",
      description:
        "Fine-tune the details of your gig or project to make it irresistible to potential clients. Include a compelling title, clear description, and specify the services offered.",
      button: "Update your profile",
    },
    {
      image: Active,
      title: "Activate Your Availability",
      description:
        "Ready to take on clients? Activate your availability settings to let potential clients know when you are open for business.",
      button: "Activate Availability",
    },
  ];
  return (
    <div className="p-32 bg-[#F7F7F7]">
      <div className="flex gap-12">
        <div className="space-y-5">
          <div className=" overflow-hidden px-5 py-3 bg-white  gap-8 rounded-[25.636px] items-center space-y-2">
            <div className="  bg-white flex gap-4 rounded-[25.636px] items-center">
              <Image
                src={Profile}
                className="flex cursor-pointer object-cover 3xl:w-[8.17rem] 2xl:w-[6rem] xl:w-[3rem] lg:w-[3rem] aspect-square justify-center items-center shrink-0 rounded-full"
                alt=""
              />

              <div className="space-y-2">
                <p className="text-black  whitespace-pre-wrap break-words 3xl:text-[20px] 2xl:text-xl xl:text-base lg:text-medium not-italic font-bold leading-[normal] capitalize">
                  Ritik Bhushan
                </p>

                <p className="text-[#696969] 3xl:text-xl 2xl:text-base xl:text-base not-italic font-normal leading-[36.814px]">
                  FrontEnd Developer
                </p>
              </div>
            </div>

            <div className=" px-2 space-y-9 flex flex-col gap-y-6">
              <div className="self-stretch relative space-y-5 text-[#696969]  not-italic  leading-[27px] p-3 ">
                <div className="flex gap-2 items-center  ">
                  <LuCalendarCheck2 />
                  <p className="self-stretch font-semibold text-[#696969] text-lg not-italic  leading-[27px] ">
                    Unavailable
                  </p>
                </div>
                <div className=" bg-gray-400 p-[1px] w-full"></div>
                <div className=" flex gap-2 items-center ">
                  <IoSettingsOutline />
                  <p className="self-stretch font-semibold text-[#696969] text-lg not-italic  leading-[27px] ">
                    Settings
                  </p>
                </div>
                <div className="flex gap-2 items-center  ">
                  <FiPhone className="" />

                  <p className="self-stretch font-semibold  text-[#696969] text-lg not-italic  leading-[27px]">
                    Contact and FAQs
                  </p>
                </div>
                <button className="flex gap-2 items-center justify-center w-full bg-blue-500 text-white rounded-2xl p-1  ">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <button className=" flex justify-start   overflow-hidden px-5  gap-1 rounded-[12.636px] items-center">
            <CgLogOut className="w-6 h-6 text-red-500" />
            <p className="text-red-500 text-lg">Log Out</p>
          </button>
        </div>

        <div className="flex-1 space-y-5">
          <div className="text-3xl font-black text-gray-600">
            Welcome Username
          </div>
          <div className="flex justify-between items-center w-full bg-white p-5 rounded-2xl">
            <p>Active order - 0</p>
            <select className="p-2 bg-transparent outline-none shrink-0 border-blue-600 text-blue-600  px-[20px]  rounded-[15px] border-[1.5px] border-solid">
              <option value="Action order">Action order</option>
            </select>
          </div>
          <div className="flex items-center w-full">
            <div className=" w-1/4">
              <p className="text-sm text-gray-600 font-semibold">
                Uploaded Gig/Project
              </p>
            </div>
            <div className=" bg-gray-400 p-[0.8px]  w-full"></div>
          </div>
          <div className="flex space-y-10 w-full bg-white p-5 gap-5 rounded-2xl">
            <div className="space-y-8 w-5/6 pt-8">
              <div>
                <p className="shrink-0 text-[color:var(--Davys-Grey,#4D4D4D)] text-[15.413px] not-italic font-normal leading-[160%]">
                  Design a futuristic 3D skeleton model with a dynamic RGB
                  lighting system set against a captivating space-themed
                  background. Craft the skeleton to have a sleek, futuristic
                  aesthetic, incorporating intricate details and streamlined
                  features. Implement an RGB lighting scheme that pulsates or
                  transitions smoothly across the skeleton, creating an engaging
                  visual effect. Ensure compatibility with real-time rendering
                  engines to maximize interactivity. The space-themed background
                  should complement the futuristic theme, with stars, nebulae,
                  or cosmic elements. Prioritize a balance between creativity
                  and functionality, delivering a visually stunning 3D model
                  ready for use in various digital or multimedia applications.
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
            </div>
            <div className="grid grid-cols-2  w-full  gap-2">
              {showImage.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    loading="lazy"
                    key={index}
                    className=" cursor-pointer"
                    src={image}
                    alt=""
                    // onClick={() => openModal(s3Url + image)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center w-full">
            <div className=" w-1/4">
              <p className="text-sm text-gray-600 font-semibold">
                How to start selling
              </p>
            </div>
            <div className=" bg-gray-400 p-[0.8px]  w-full"></div>
          </div>
          <div className="flex items-center w-full bg-white p-5 rounded-2xl gap-4">
            {information.map((data, index) => (
              <SellerDashboardInfo
                key={index}
                img={data.image}
                title={data.title}
                desc={data.description}
                btn={data.button}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
