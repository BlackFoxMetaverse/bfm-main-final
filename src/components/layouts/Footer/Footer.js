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
        <Link href={item.href} key={index} className={`mt-${index === 0 ? "4" : "2.5"}`}>
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

const Footer = () => (
  <footer className="flex gap-5 justify-between items-center mx-auto mt-10 max-md:flex-wrap w-5/6">
    <FooterLink
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc48f3c8b133eedbccaa1fa9bae188116982f1f52ab42bc8683499d5cbaaf537?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
      altText=""
    />
    <div className="flex gap-5 justify-between self-stretch my-auto text-sm font-bold leading-7 text-indigo-200">
      <div>Terms</div>
      <div className="flex-auto">Data Privacy Statement</div>
      <div>Cookies</div>
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

const WebsiteFooter = () => {
  const sectionData = [
    {
      title: "BFM",
      items: [
        { name: "Explore", href: "#" },
        { name: "All NFTs", href: "#" },
        { name: "Blog", href: "#" },
        { name: "About", href: "#" },
        { name: "SideMap", href: "#" },
      ],
    },
    {
      title: "My Account",
      items: [
        { name: "Profile", href: "#" },
        { name: "Favourite", href: "#" },
        { name: "Watchlist", href: "#" },
        { name: "My Collection", href: "#" },
        { name: "Settings", href: "#" },
      ],
    },
    {
      title: "Resources",
      items: [
        { name: "Platform Status", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Taxes", href: "#" },
        { name: "News Letter", href: "#" },
      ],
    },
    {
      title: "Community",
      items: [
        { name: "Help Center", href: "#" },
        { name: "BFM Token", href: "#" },
        { name: "Suggest Feature", href: "#" },
        { name: "Subscribe", href: "#" },
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
          <form action="" onSubmit={(e) => e.preventDefault()} className="flex gap-5 justify-between pl-4 mt-4 rounded-md border-gray-900 border-solid bg-zinc-800 border-[1.5px]">
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
