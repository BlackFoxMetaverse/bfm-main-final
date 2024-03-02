"use client";

import Link from "next/link";
import React from "react";

const SectionTitle = ({ title }) => (
  <div className="text-base font-bold leading-7">{title}</div>
);

const ItemList = ({ title, items }) => (
  <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
    <div className="flex flex-col text-base font-medium text-indigo-200 whitespace-nowrap max-md:mt-10">
      <SectionTitle title={title} />
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`mt-${index === 0 ? "4" : "2.5"}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </div>
);

const FooterLink = ({ src, altText }) => (
  <img
    loading="eager"
    src={src}
    alt={altText}
    className="size-12 object-contain"
  />
);

const Footer = () => {
  const date = new Date();
  return (
    <footer className="flex gap-5 justify-between items-center mx-auto mt-10 max-md:flex-wrap w-5/6">
      <FooterLink
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc48f3c8b133eedbccaa1fa9bae188116982f1f52ab42bc8683499d5cbaaf537?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
        altText=""
      />
      <div className="flex gap-5 justify-between self-stretch my-auto text-sm font-bold leading-7 text-indigo-200">
        All right reserved Black Fox Metaverse © {date.getFullYear()}. Made with
        ❤️ in Bharat.
      </div>
      <div className="flex gap-4 self-stretch my-auto">
        <FooterLink
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3aff4d5fa96d9063f30eb16f0d4d8b8ca8e40954f28672aa1c08d1a317c183d?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
          altText=""
        />
        <FooterLink
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7048516f2117dfdeb4d47b8285f1fea8908b53cd8481256b336a630617aab02?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
          altText=""
        />
        <FooterLink
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e8c3b7f77a32898f873f9cd1b9c9e9391edcf3ea116a38d56d058ffd4f999c7?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
          altText=""
        />
      </div>
    </footer>
  );
};

const WebsiteFooter = () => {
  const sectionData = [
    {
      title: "Product",
      items: [
        { name: "Explore", href: "/" },
        {
          name: "Feedback",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSfbK6zX3heRTgI5TReq5lVqJSIRC3ZFUk3fN0fXTL_e1B7HZw/viewform?usp=sf_link",
        },
        {
          name: "Bug",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSeD8gvnQdmUvIBdwaQT4OrlMzp92ubGKPcLLuDnrRC8hiaOyQ/viewform?usp=sf_link",
        },
        {
          name: "Suggest Feature",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSfm1N1DUFdQ4rttJmhfjSQJsjGepuf86vk4oYoULIeV0n4-rA/viewform?usp=sf_link",
        },
      ],
    },
    {
      title: "Socials",
      items: [
        {
          name: "Instgram",
          href: "https://www.instagram.com/blackfoxmetaverse?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
        },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/company/blackfoxmetaverse/",
        },
        {
          name: "Twitter",
          href: "https://twitter.com/Bfmofficial_",
        },
        {
          name: "Youtube",
          href: "https://www.youtube.com/channel/UC1JOEC2zUaG5vN-RnLktNSw",
        },
      ],
    },
    {
      title: "Community",
      items: [
        { name: "Blog", href: "/blog" },
        { name: "Help Center", href: "#" },
      ],
    },
    {
      title: "Legal",
      items: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Refund Policy", href: "#" },
        { name: "Terms and Conditions", href: "/terms-and-conditions" },
        { name: "Contact Us", href: "#" },
      ],
    },
  ];

  return (
    <div className="flex flex-col justify-center py-12 bg-stone-950 max-md:px-5">
      <div className="flex flex-col xl:flex-row py-9 w-5/6 mx-auto justify-between gap-10 text-sm text-indigo-200 max-md:max-w-full">
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-between mt-14 max-w-full w-full">
          {sectionData.map((section, idx) => (
            <ItemList key={idx} title={section.title} items={section.items} />
          ))}
        </nav>
        <div className="flex flex-col py-9 text-sm text-indigo-200 max-md:max-w-full">
          <SectionTitle title="Subscribe" />
          <form
            action=""
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-5 justify-between pl-4 mt-4 rounded-md border-gray-900 border-solid bg-zinc-800 border-[1.5px]"
          >
            <label htmlFor="emailInput" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="emailInput"
              placeholder="Email address"
              aria-label="Email address"
              className="my-auto bg-transparent w-full focus:outline-none"
            />
            <button
              type="submit"
              className="aspect-square w-[50px] bg-transparent border-none"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ca6a6ab99227b6e4d5993f041b946924fc9ac4b660999a8ef447a255e424fc2?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
                alt="Subscribe"
                className="aspect-square w-[50px]"
              />
            </button>
          </form>
          <div className="mt-10">
            Hello, we are BFM. trying to make an effort to put the right people
            for you to get the best results. Just insight.
          </div>
        </div>
      </div>
      <div className="self-center mt-10 max-w-full h-px bg-indigo-200 border border-indigo-200 border-solid w-5/6 mx-auto" />
      <Footer />
    </div>
  );
};

export default WebsiteFooter;
