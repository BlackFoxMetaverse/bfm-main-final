"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { checkUserDataByToken } from "../../../../utils/userData";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/layouts/Header/auth/AuthModal";

const FeatureCard = ({ title, description, bg, imgUrl, altText }) => (
  <div className="justify-center self-stretch items-center px-8 py-10 rounded-3xl border-solid flex flex-col shadow-xl bg-white border border-[#E5F4F2] w-1/3 max-lg:w-full">
    <div
      className={`flex justify-center items-center self-center px-5 rounded-3xl bg-opacity-20 size-[84px]`}
      style={{
        backgroundColor: bg,
        backgroundBlendMode: "color-dodge",
      }}
    >
      <img
        loading="eager"
        src={imgUrl}
        alt={altText}
        className="w-full aspect-square"
      />
    </div>
    <h3 className="mt-8 text-2xl flex-grow font-bold tracking-tight text-center text-zinc-800">
      {title}
    </h3>
    <p className="mt-4 text-base text-center text-neutral-500">{description}</p>
  </div>
);

const FeatureSection = () => {
  const features = [
    {
      title: "Nearby Connection Made Easy",
      description:
        "Find Neighbors Easily: Our app helps you connect with people nearby. Set your distance preference, and discover local services for a more personalized experience.",
      imgUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e6b7999abd821a0dad4269bb260f850f6c0cbd9dd01bbe72a9b39b2256b95bfc?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
      altText: "Illustration of nearby connection",
    },
    {
      title: "Affordable Innovation, Indian Sensibilities",
      description:
        "Pocket-Friendly Pricing: Our platform is affordable and designed to suit Indian preferences. Enjoy services without breaking the bank.",
      imgUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bbb2265b627d9da064ad601151a4ff819582089ab3fb7bbc2fddce34d10d0cb0?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
      altText: "Illustration of affordable innovation",
    },
    {
      title: "Metaverse Integration, Futuristic Opportunities",
      description:
        "Virtual Experiences Await: Join us as we integrate with the Metaverse, offering a realistic and immersive experience. Explore new opportunities in a virtual world.",
      imgUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/23287d9f91a4893fe6a726eab5e025925a43ec1c76d2353fc6706fb10c6327be?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
      altText: "Illustration of Metaverse integration",
    },
  ];

  return (
    <section className="flex flex-col justify-center px-10 py-12 bg-white">
      <h2 className="self-center mt-5 text-3xl font-bold text-center text-black">
        Why Choose Us?
      </h2>
      <p className="mt-5 text-lg text-center text-zinc-800">
        These are just a few features you’ll get using as a BFM Seller
      </p>
      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-[1170px]">
          <div className="flex justify-around gap-5 max-md:flex-col">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                bg={
                  index === 0
                    ? "lightpink"
                    : index === 1
                    ? "lightgreen"
                    : index === 2
                    ? "lightgoldenrodyellow"
                    : ""
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function StepItem({ stepNumber, title, description, imageUrl, altText }) {
  return (
    <div className="flex flex-col w-[33%] max-md:w-full p-10 rounded-md">
      <div className="flex flex-col items-center text-center text-white max-md:mt-10">
        <img src={imageUrl} alt={altText} className="w-20 aspect-square" />
        <h3 className="mt-9 text-3xl font-bold">
          {stepNumber}. {title}
        </h3>
        <p className="self-stretch mt-5 text-xl leading-8">{description}</p>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      stepNumber: 1,
      title: "Create your profile",
      description:
        "Sign up for free, set up your Gig, and offer your work to our global audience.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/32bfbcf4f23f8df24058ec1341538b74caad0fdc95a93dacb87fb97d2f15871f?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
      altText: "Illustration for creating your profile",
    },
    {
      stepNumber: 2,
      title: "Deliver great work",
      description:
        "Get notified when you get an order and use our system to discuss details with customers.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5f49d553fe89e13bafb572da3a2f1e31f516d5a8b5fa5aba8d0b630c392f8fc4?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
      altText: "Illustration for delivering work",
    },
    {
      stepNumber: 3,
      title: "Get paid",
      description:
        "Get paid on time, every time. Payment is available for withdrawal as soon as it clears.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/28b5cf53de5ad13d9d3b93a57bccbe2131e4a97f4fef4f684596afe21a1c57ea?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
      altText: "Illustration for getting paid",
    },
  ];

  return (
    <section className="flex justify-center items-center px-16 py-12 bg-[#6981F5] max-md:px-5">
      <div className="flex flex-col mt-8 w-full max-w-[1528px]">
        <h2 className="self-center text-5xl font-bold text-white whitespace-nowrap max-md:text-4xl">
          How it works
        </h2>
        <div className="mt-20 max-md:mt-10">
          <div className="flex justify-around gap-5 max-md:flex-col">
            {steps.map((step, index) => (
              <StepItem key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Hero = () => {
  const router = useRouter();
  const [uid, setUid] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [isregistering, setIsRegistering] = useState(false);

  const handleClick = () => {
    const token = localStorage.getItem("bfm-client-token");
    checkUserDataByToken(token)
      .then((data) => {
        if (data?.isUser || data?.isSeller) {
          router.replace(
            `/seller/dashboard/${data?.data?.seller?.name}/${data?.data?.seller?.uid}`
          );
        } else {
          setShowAuth(!showAuth);
        }
      })
      .catch((err) => {
        console.error(err);
        setShowAuth(!showAuth);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-screen flex justify-center items-center bg-black/35">
        <section className="flex flex-col items-center text-white max-w-[976px] mx-auto p-4">
          <header className="text-6xl font-bold text-center mb-7 max-md:text-4xl">
            Unleash Your Potential, <br /> Elevate Your Craft.
          </header>
          <p className="text-2xl text-center mb-10">
            Join Black Fox Metaverse and connect with clients worldwide,
            showcasing your skills like never before.
          </p>
          <button
            onClick={handleClick}
            type="button"
            className="justify-center px-9 py-4 text-xl tracking-tighter leading-5 text-white whitespace-nowrap rounded-lg bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 max-md:px-5"
          >
            Become a Seller
          </button>
        </section>
        <Image
          loading="eager"
          src={require("../../../../../public/seller/theme_bg.svg")}
          className="size-full absolute inset-0 object-cover -z-10"
          alt=""
        />
      </div>
      <FeatureSection />
      <HowItWorks />
      <AuthModal
        onClose={() => setShowAuth(!showAuth)}
        animation={showAuth ? "translate-x-0" : "translate-x-full"}
        register={() => setIsRegistering(!isregistering)}
        isRegister={isregistering}
      />
    </div>
  );
};

export default Hero;
