"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ServicesCard from "@/components/client/modules/ServicesCard/ServicesCard";
import Image from "next/image";
import { HiMiniSignal } from "react-icons/hi2";
import {
  FaAngleRight,
  FaCheck,
  FaChevronDown,
  FaRegCompass,
} from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import Location from "@/components/DeviceLocation/location";
import { BsCheck2, BsSearch } from "react-icons/bs";
import { AiFillRightSquare } from "react-icons/ai";
import SearchForm from "../../modules/FormLayout/SearchForm";
import instance from "@/utils/axios";
import SearchCard from "@/components/Modules/SearchedCard/SearchCard";
import Toast from "@/components/Modules/Toast/Toast";

const services = [
  {
    src: require("../../../../../public/clients_images/services/graphics-design.svg"),
    name: "Graphics & Design",
  },
  {
    src: require("../../../../../public/clients_images/services/online-marketing.svg"),
    name: "Digital Marketing",
  },
  {
    src: require("../../../../../public/clients_images/services/writing-translation.svg"),
    name: "Writing & Translation",
  },
  {
    src: require("../../../../../public/clients_images/services/video-animation.svg"),
    name: "Video & Animation",
  },
  {
    src: require("../../../../../public/clients_images/services/music-audio.svg"),
    name: "Music & Audio",
  },
  {
    src: require("../../../../../public/clients_images/services/programming.svg"),
    name: "Programming & Tech",
  },
  {
    src: require("../../../../../public/clients_images/services/business.svg"),
    name: "Business",
  },
  {
    src: require("../../../../../public/clients_images/services/lifestyle.svg"),
    name: "Lifestyle",
  },
  {
    src: require("../../../../../public/clients_images/services/data.svg"),
    name: "Data",
  },
  {
    src: require("../../../../../public/clients_images/services/photography.svg"),
    name: "Photography",
  },
];

// const Plans = [
//   {
//     type: "Basic plan ",
//     isPopular: false,
//     tokens: 10,
//     benifits: "You can view details of 10 profile.",
//     price: 100,
//   },
//   {
//     type: "Pro Plan",
//     isPopular: false,
//     tokens: 20,
//     benifits: "You can view details of 20 profile.",
//     price: 200,
//   },
//   {
//     type: "Executive Plan",
//     isPopular: true,
//     tokens: 30,
//     benifits: "You can view details of 30 profile.",
//     offer: "14%",
//     price: 260,
//   },
// ];

const Hero = () => {
  const [searchInput, setSearchInputData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [recommendations, setRecommendation] = useState(null);
  const router = useRouter();

  async function fetchRecomendation() {
    try {
      const response = await instance.get(
        `search/recommendation?longitude=${searchInput?.longitude}&latitude=${searchInput?.latitude}&page=1`
      );

      setRecommendation(response?.data?.data);
      console.log(response?.data?.message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRecomendation();
  }, [searchInput?.latitude]);

  console.log(searchInput);

  return (
    <main className="flex w-full flex-col items-center gap-[120px]">
      {/* Hero */}
      <section className="relative flex w-full lg:py-40 py-32 min-h-screen flex-col justify-center items-center gap-2.5">
        <div className="absolute inset-0 -z-10 w-full h-full flex justify-center items-center overflow-hidden">
          <img
            loading="eager"
            src="https://4kwallpapers.com/images/walls/thumbs_3t/6789.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-11/12 max-w-[1920px] space-y-7 flex justify-center flex-col items-start">
          <div className="max-w-[769.44px]">
            <span className="text-white 2xl:text-[54.39px] italic xl:text-[48px] text-[35px] font-medium leading-[57.66px]">
              Automate
            </span>
            <span className="text-white 2xl:text-[54.39px] xl:text-[48px] text-[35px] font-semibold leading-[57.66px]">
              {" "}
              your business&apos;s back office with Freelancers
            </span>
          </div>
          <SearchForm
            // handleSubmit={handleSearch}
            data={setSearchResult}
            isShown
            searchInputData={setSearchInputData}
          />
        </div>
      </section>

      {/* Services */}
      <section className="w-full max-w-[1920px] mx-auto">
        {searchResult?.length === 0 || searchResult === null ? (
          <div className="flex flex-col items-start gap-10 w-11/12 m-auto">
            <div className="flex justify-between items-center w-full">
              <p>
                <span className="text-neutral-900 text-[32px] font-bold">
                  Professionals{" "}
                </span>
                <span className="text-neutral-900 text-xl">Near You</span>
              </p>
              <button
                type="button"
                onClick={() => router.push(`/client/more`)}
                className="w-[34.02px] h-[29.69px] px-[12.37px] py-[7.42px] bg-neutral-900 rounded border border-violet-50 justify-center items-center gap-[4.95px] inline-flex"
              >
                <FaAngleRight className="text-white" />
              </button>
            </div>
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 relative grid-cols-1 items-start gap-5 w-full">
              {recommendations?.length === 0 || !recommendations ? (
                <p className="w-full text-center absolute inset-x-0">
                  <span className="text-neutral-900 text-xl">No </span>
                  <span className="text-neutral-900 text-[32px] font-bold">
                    Professionals{" "}
                  </span>
                  <span className="text-neutral-900 text-xl">Near You</span>
                </p>
              ) : (
                recommendations?.map((data, index) => (
                  <ServicesCard key={index} {...data} />
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-10 w-11/12 m-auto">
            <div className="flex justify-between items-center w-full">
              <p className="flex-grow">
                <span className="text-neutral-900 text-[32px] font-bold capitalize">
                  {searchInput?.term
                    ? searchInput.term?.toUpperCase()
                    : "Professionals"}
                </span>
                <span className="text-neutral-900 text-xl">Near You</span>
              </p>
              {searchResult?.length > 4 && (
                <button
                  type="button"
                  onClick={() => router.push(`/client/more`)}
                  className="w-[34.02px] h-[29.69px] px-[12.37px] py-[7.42px] bg-neutral-900 rounded border border-violet-50 justify-center items-center gap-[4.95px] inline-flex"
                >
                  <FaAngleRight className="text-white" />
                </button>
              )}
            </div>
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 items-start gap-5 w-full">
              {searchResult?.map((data, index) => (
                <ServicesCard key={index} {...data} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* unknown section */}
      <section className="flex flex-col lg:flex-row w-full items-center lg:h-screen h-full overflow-hidden">
        <img
          className="flex-1 lg:w-1/2 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="w-full h-full flex-1 bg-red-950 py-10 lg:py-0 justify-center items-center flex">
          <div className="w-3/4 h-full mx-auto flex-col justify-center items-start gap-[51.84px] inline-flex">
            <div className="text-white 2xl:text-6xl xl:text-4xl lg:text-3xl text-3xl font-bold leading-[normal]">
              Paperwork is our passion. What&apos;s yours?
            </div>
            <div className="flex-col justify-end items-start gap-[35.38px] flex">
              <button
                type="button"
                className="pl-[24.55px] pr-[31.45px] pt-[13.50px] pb-4 bg-emerald-500 rounded-[4.91px] border border-emerald-500 justify-start items-start inline-flex"
              >
                <p className="text-white text-[22.09px] font-bold leading-[33.14px]">
                  Get Started for Free
                </p>
              </button>
              <div className="flex-col justify-start items-start gap-[18.41px] flex">
                <div className="justify-start items-center gap-3.5 flex">
                  <FaCheck className="text-white text-2xl" />
                  <div className="text-white/70 text-2xl font-normal leading-loose">
                    No credit card
                  </div>
                </div>
                <div className="justify-start items-center gap-3.5 flex">
                  <FaCheck className="text-white text-2xl" />
                  <div className="text-white/70 text-2xl font-normal leading-loose">
                    No spam
                  </div>
                </div>
                <div className="justify-start items-center gap-3.5 flex">
                  <FaCheck className="text-white text-2xl" />
                  <div className="text-white/70 text-2xl font-normal leading-loose">
                    No hassle
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Section */}
      <section className="flex flex-col items-start gap-10 w-5/6">
        <div>
          <span className="text-neutral-900 text-[32px] font-normal">
            What you Need?
          </span>
          <span className="text-neutral-900 text-[32px] font-extrabold">
            {" "}
            We Got it!
          </span>
        </div>
        <div className="grid lg:grid-cols-5 grid-cols-2 flex-wrap gap-10 justify-between w-full mt-16 items-center">
          {services?.map((service, index) => (
            <button
              type="button"
              onClick={() => router.push(`/client/${service.name}/`)}
              className="flex flex-col items-center justify-center gap-5"
              key={index}
            >
              <Image
                src={service.src}
                alt=""
                className="w-[57.749px] h-[57.749px] object-cover shrink-0"
              />
              <p className="text-[#222325] text-center text-[18.436px] font-normal leading-[27.653px]">
                {service.name}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Payement Section */}
      {/* <section className="w-full h-full relative overflow-hidden pt-5 pb-12 flex flex-col gap-6 items-center justify-between">
        <img
          src="https://c.wallhere.com/photos/8d/c0/1920x1080_px_black_background_digital_art_geometry_lines_Low_Poly_minimalism_monochrome-571899.jpg!d"
          alt=""
          className="w-full h-full absolute inset-0 -z-10 object-cover"
        />
        <h1 className="text-white text-[64px] font-bold leading-[normal]">
          Subscription plans
        </h1>
        <p className="text-white text-2xl font-normal leading-[normal]">
          You can buy Bunch of tokens together and view multiple profile details
          with paying every time.{" "}
        </p>
        <div className="flex-grow flex justify-between items-end flex-wrap gap-12 w-5/6">
          {Plans?.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col h-full gap-5 max-w-[360px] w-full aspect-square"
            >
              {plan.isPopular && (
                <p className="text-white text-2xl text-center font-medium leading-[normal]">
                  Most Popular plan
                </p>
              )}
              <div className="bg-white w-full h-full rounded-[26.966px] border-[0.674px] border-solid flex flex-col justify-evenly items-center">
                <h3 className="text-black text-[32.36px] font-bold leading-[normal]">
                  {plan.type}
                </h3>
                <div className="space-y-2">
                  <p className="text-black text-center text-[16.18px] font-bold leading-[normal]">
                    Get {plan.tokens} tokens
                  </p>
                  <p className="text-black text-center text-[13.483px] font-normal leading-[16.18px]">
                    {plan.benifits}
                  </p>
                </div>
                <div className="space-y-4 text-center">
                  {plan.offer && (
                    <p className="text-black text-base font-bold leading-[normal]">
                      ${plan.offer} off
                    </p>
                  )}
                  <p className="text-black text-[21.573px] font-bold leading-[normal]">
                    ₹{plan.price}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-[233.933px] h-[51.91px] shrink-0 [background:var(--Primary-1,#4461F2)] rounded-[13.483px] text-white text-[21.573px] font-bold leading-[normal]"
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* signup */}
      <div className="w-5/6 h-[293.71px] mb-20 relative bg-gradient-to-r from-black/40 to-black/5 overflow-hidden">
        <img
          src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*MVU81WeBRsliVq3U"
          alt=""
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="w-11/12 mx-auto py-[37.94px] flex-col justify-start items-start gap-[5.37px] flex">
          <div className="text-neutral-50 text-[39.16px] font-bold leading-[46.99px]">
            Build a strong online presence
          </div>
          <div className="text-neutral-50 text-[22.03px] font-normal leading-loose">
            Boost your business with this course on personal branding
            techniques.
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <button
            onClick={() => router.push("/seller")}
            type="button"
            className="px-8 py-4 bg-white rounded border-2 justify-center items-center gap-2 inline-flex"
          >
            <div className="text-indigo-500 text-xl leading-tight">
              Become a Seller
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
