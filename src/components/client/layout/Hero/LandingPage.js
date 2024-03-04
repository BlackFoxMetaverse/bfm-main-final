"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ServicesCard from "@/components/client/modules/ServicesCard/ServicesCard";
import Image from "next/image";
import { FaAngleRight, FaCheck } from "react-icons/fa6";
import SearchForm from "../../modules/FormLayout/SearchForm";
import instance from "@/utils/axios";
import Link from "next/link";
import AuthModal from "@/components/layouts/Header/auth/AuthModal";
import { getUserPreciseLocation } from "@/utils/location";

const services = [
  {
    color: "bg-slate-600",
    title: "Programming",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e3a21e3d1fbdfa462abae318200cc62fe65c1bbcb997305d8e7abb3c51071985?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
    imageAlt: "Programming project example",
  },
  {
    color: "bg-red-400",
    title: "Photographer",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/633a8cc4437c07f977ecce80b217a766f63ff7f526abc98c9a4411a1319a2081?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
    imageAlt: "Photography work example",
  },
  {
    color: "bg-blue-500",
    title: "Videography",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a94aee83b96b83d80b49f4475eaf7be49b3c3e1868f1ece3a5590de190e8e5f6?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
    imageAlt: "Videography work example",
  },
  {
    color: "bg-emerald-500",
    title: "Graphic Designer",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/efa76496881950efcbf187ae699b1cf332d4e14e6d15bdefdcd559f0453b88dd?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
    imageAlt: "Graphic Design work example",
  },
  {
    color: "bg-teal-600",
    title: "Digital Marketing",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8304afa04f19879d2bc1f7802b7d72c170ab627a1b9f5fed504b6325bc2a1ebe?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
    imageAlt: "Digital Marketing campaign example",
  },
  {
    color: "bg-violet-800",
    title: "Music Production",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ed3fabf47449b183d47c766ef765cabc1910f017ebe4a4c2848070336f38611d?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
    imageAlt: "Music Production setup example",
  },
  {
    color: "bg-rose-700",
    title: "Graphic Designer",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/578c5f787fc086b4d87109cd0f96f7d1e68c5096adfda8b1d32ef9bdbf47dec3?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
    imageAlt: "Another Graphic Design work example",
  },
  {
    color: "bg-orange-300",
    title: "UI/UX Designer",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6e4f18858edcdb7fbfcec670deec83925fb413d7fcf5b1613f5a5e41f823e1?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
    imageAlt: "UI/UX Designer work example",
  },
];

const LandingPage = () => {
  const [searchInput, setSearchInputData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [recommendations, setRecommendation] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isregistering, setIsRegistering] = useState(false);
  const router = useRouter();

  async function fetchRecomendation() {
    try {
      const location = await getUserPreciseLocation();
      const response = await instance.get(
        `search/recommendation?longitude=${location?.longitude}&latitude=${location?.latitude}&page=1`
      );

      setRecommendation(response?.data?.data);
      console.log(response?.data?.message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRecomendation();
  }, []);

  return (
    <main className="flex w-full flex-col items-center gap-[120px]">
      {/* LandingPage */}
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
          <Suspense>
            <SearchForm isShown searchInputData={setSearchInputData} />
          </Suspense>
        </div>
      </section>

      {/* Services */}
      <section className="w-full max-w-[1920px] mx-auto">
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
      </section>

      {/* unknown section */}
      <section className="flex flex-col lg:flex-row w-full items-center lg:h-screen h-full overflow-hidden">
        <Image
          className="flex-1 lg:w-1/2 w-full h-full object-cover"
          alt=""
          src={require("../../../../../public/clients_images/mission.svg")}
        />
        <div className="w-full h-full flex-1 bg-red-950 py-10 lg:py-0 justify-center items-center flex">
          <div className="w-3/4 h-full mx-auto flex-col justify-center items-start gap-[51.84px] inline-flex">
            <div>
              <div>
                <span className="text-white text-[32px] font-normal">
                  Your Dream,
                </span>
                <span className="text-white text-[32px] font-extrabold">
                  {" "}
                  Our Vision
                </span>
              </div>
              <div>
                <span className="text-white text-[32px] font-normal">
                  Your Passion,
                </span>
                <span className="text-white text-[32px] font-extrabold">
                  {" "}
                  Our Mission
                </span>
              </div>
            </div>
            <div className="flex-col justify-end items-start gap-[35.38px] flex">
              <div className="flex-col justify-start items-start gap-3 flex">
                <div className="justify-start items-center gap-3.5 flex">
                  <FaCheck className="text-blue-800 text-2xl" />
                  <div className="text-white/70 text-2xl font-normal leading-loose">
                    Passion To Portfolio
                  </div>
                </div>
                <div className="justify-start items-center gap-3.5 flex">
                  <FaCheck className="text-blue-800 text-2xl" />
                  <div className="text-white/70 text-2xl font-normal leading-loose">
                    Location Based Opportunities
                  </div>
                </div>
                <div className="justify-start items-center gap-3.5 flex">
                  <FaCheck className="text-blue-800 text-2xl" />
                  <div className="text-white/70 text-2xl font-normal leading-loose">
                    Find Your Worth and Get Paid
                  </div>
                </div>
              </div>
              <Link
                href={"/seller"}
                type="button"
                className="pl-[24.55px] pr-[31.45px] pt-[13.50px] pb-4 bg-emerald-500 rounded-[4.91px] border border-emerald-500 justify-start items-start inline-flex"
              >
                <p className="text-white text-[22.09px] font-bold tracking-wider leading-[33.14px]">
                  Create Profile Now
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Section */}
      <section className="flex flex-col items-start gap-10 w-5/6">
        <div>
          <span className="text-neutral-900 text-[32px] font-normal">
            We Have Got,
          </span>
          <span className="text-neutral-900 text-[32px] font-extrabold">
            {" "}
            Everything you need
          </span>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 flex-wrap gap-10 justify-between w-full mt-16 items-center">
          {services?.map((service, index) => (
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/client/${encodeURIComponent(
                    service.title
                  )}?distance=100000&profession=${service.title}&latitude=${
                    searchInput.latitude
                  }&longitude=${searchInput.longitude}&limitUser=50`
                )
              }
              className={`flex items-center ${service.color} justify-center w-full gap-1 rounded overflow-hidden`}
              key={index}
            >
              <p className="text-white flex-1 text-center text-[18.436px] font-normal whitespace-nowrap leading-[27.653px]">
                {service.title}
              </p>
              <img
                loading="lazy"
                src={service.imageSrc}
                alt={service.imageAlt}
                className="w-1/3 aspect-square object-cover shrink-0"
              />
            </button>
          ))}
        </div>
      </section>
      <div className="w-5/6 h-[293.71px] mb-20 relative bg-gradient-to-r from-black/40 to-black/5 overflow-hidden">
        <img
          src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*MVU81WeBRsliVq3U"
          alt=""
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="w-11/12 mx-auto py-[37.94px] flex-col justify-start items-start gap-[5.37px] flex">
          <div className="text-neutral-50 xl:text-[39.16px] text-3xl font-bold leading-normal">
            Build a strong online presence
          </div>
          <div className="text-neutral-50 xl:text-[22.03px] text-lg font-normal leading-normal">
            Boost your business with this course on personal branding
            techniques.
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <button
            onClick={() => setShowAuth(!showAuth)}
            type="button"
            className="px-8 py-4 bg-white rounded border-2 justify-center items-center gap-2 inline-flex"
          >
            <div className="text-indigo-500 text-xl leading-tight">
              Join BFM
            </div>
          </button>
        </div>
      </div>
      <AuthModal
        onClose={() => setShowAuth(!showAuth)}
        animation={showAuth ? "translate-x-0" : "translate-x-full"}
        register={() => setIsRegistering(!isregistering)}
        isRegister={isregistering}
      />
    </main>
  );
};

export default LandingPage;
