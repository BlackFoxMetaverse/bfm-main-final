"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ServicesCard from "@/components/client/modules/ServicesCard/ServicesCard";
import Image from "next/image";
import { HiMiniSignal } from "react-icons/hi2";
import { FaChevronDown, FaRegCompass } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import Location from "@/components/DeviceLocation/location";
import { BsSearch } from "react-icons/bs";
import { AiFillRightSquare } from "react-icons/ai";
import SearchForm from "../../modules/FormLayout/SearchForm";

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

const Plans = [
  {
    type: "Basic plan ",
    isPopular: false,
    tokens: 10,
    benifits: "You can view details of 10 profile.",
    price: 100,
  },
  {
    type: "Pro Plan",
    isPopular: false,
    tokens: 20,
    benifits: "You can view details of 20 profile.",
    price: 200,
  },
  {
    type: "Executive Plan",
    isPopular: true,
    tokens: 30,
    benifits: "You can view details of 30 profile.",
    offer: "14%",
    price: 260,
  },
];

const Hero = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="inline-flex w-full flex-col items-center gap-[120px]">
      {/* Hero */}
      <section className="relative flex w-full lg:h-screen py-32 flex-col justify-center items-center gap-2.5 bg-[#331d71]/50">
        <div className="absolute inset-0 -z-10 w-full h-full flex justify-center items-center overflow-hidden">
          <Image
            loading="eager"
            src={require("../../../../../public/hero_bg.svg")}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="xl:w-3/4 w-5/6 max-w-[1920px]  flex justify-center flex-col items-start">
          <div className="flex flex-col justify-cente items-center gap-[37px] px-0 py-[15px]">
            <div className="SearchForProfessionals text-white lg:text-8xl text-4xl font-bold">
              Search <br />
              for Professionals
            </div>
          </div>
          <SearchForm
            handleSubmit={(e) => {
              e.preventDefault();
              console.log("serched");
            }}
            value={searchTerm}
            onChange={setSearchTerm}
            position={"justify-end"}
            isShown
          />
        </div>
      </section>

      {/* Services */}
      <section className="w-full max-w-[1920px]">
        <div className="flex flex-col items-center gap-10 w-5/6 m-auto">
          <h5 className="text-[color:var(--Foundation-Blue-blue-500,var(--Primary-1,#562FB9))] w-full text-left text-[32px] not-italic font-bold leading-[normal]">
            Services Near You
          </h5>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start gap-[46px] w-full">
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
          </div>
          <button
            type="button"
            onClick={() => router.push(`/client/more`)}
            className="flex justify-center items-center gap-2 rounded pl-8 pr-6 py-4 text-[#562FB9] text-xl font-normal leading-[100%] tracking-[-1px]"
          >
            View More
            <AiFillRightSquare />
          </button>
        </div>
      </section>

      {/* Selection Section */}
      <section className="flex flex-col items-start gap-10 w-5/6">
        <h1 className="text-[#562FB9] text-[32px] font-bold leading-[normal]">
          You need it, we&apos;ve got it
        </h1>
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
                className="w-[57.749px] h-[57.749px] shrink-0"
              />
              <p className="text-[#222325] text-center text-[18.436px] font-normal leading-[27.653px]">
                {service.name}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Payement Section */}
      <section className="w-full h-full relative overflow-hidden pt-5 pb-12 flex flex-col gap-6 items-center justify-between">
        <img
          src="https://s3-alpha-sig.figma.com/img/4a02/2805/627ca7cb3bae6e8eaadc8c650b3fcc91?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f~jcw~rp9U9I8FedubA6LEkuCsgY97Xo7v0FCKhmUwRzsnIk3aX7M7rucyMgrttQnGB6qwqCDFijawQC15RDS9VlBb3DR8pJu3Cv2m7LOMYoUDo2P-ku74TBsqO0pYPt6JtsXYTfe8d6sVE9WjkFjEyT-4aYIO9Ic9s9-3o2n8nzM4tTsVWsSblORrp5w5AOPBU1b4gSh4lA5d4IigjuYtFv85MGY3NFx29ZkQVjPzYOa-ntg9wFu20rAV603TYSB50Tg6TVi~5jcwzqkOqTJ57lK8PDRpWxp6Wftuo0eo4bpqC6KCp17Zu0NNcM~KC2bLVD2VHHeLgjbV2G9e5Qxg__"
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
      </section>

      {/* signup */}
      <section className="lg:w-5/6 w-11/12 bg-gradient-to-r from-black from-45% to-black/5 h-[390px] flex items-center relative mb-10">
        <div className="w-full flex flex-col justify-center items-start xl:px-24 lg:px-12 px-6 gap-11">
          <div className="flex lg:flex-row flex-col justify-center text-white text-5xl font-bold leading-[56px] gap-4">
            <p className="whitespace-nowrap">Join our</p>
            <p className="text-white text-5xl font-normal leading-[56px]">
              Metaverse
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/client/auth/login")}
            className="inline-flex w-fit justify-center items-center rounded [background:var(--Primary-1,#4461F2)] px-[22px] py-[9px] text-white text-center text-base font-normal leading-6"
          >
            Get Started Now
          </button>
        </div>
        <Image
          loading="eager"
          src={require("../../../../../public/clients_images/div.signup.png")}
          alt=""
          className="w-full -z-10 h-full object-cover xl:static absolute inset-0"
        />
      </section>
    </main>
  );
};

export default Hero;
