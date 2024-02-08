"use client";

import Link from "next/link";
import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import FooterColumn from "../../Modules/FooterColumn/FooterColumn";
import { BsReddit, BsDiscord } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../../assets/dark_logo.svg";

const Footer = () => {
  const pathname = usePathname();

  return (
    <div
      className={` border-t-2 pt-5 ${
        pathname.startsWith("/auth") || pathname.startsWith("/about")
          ? "hidden"
          : "block"
      }`}
    >
      <div className="mx-auto 2xl:w-[1440px] w-full lg:w-full">
        <div className="h-1/2  grid grid-cols-7 p-4 lg:px-20">
          <div className="p-5 col-span-7 lg:col-span-3 ">
            {/*  */}
            <Image src={Logo} alt="" className="w-[200px] h-[80px]" />
            <p className="text-[#777E90] text-sm my-4">
              The goal of Black Fox Metaverse, the company we formed, is to
              completely transform the NFT e-commerce sector. We are a rapidly
              expanding platform with a vibrant vision for our artists,
              constantly exploring fresh approaches to push the limits of what
              is practical in the NFT e-commerce sector.
            </p>

            <ul>
              <div className="flex gap-6 pb-5">
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://www.instagram.com/blackfoxmetaverse/"
                >
                  <FaInstagram className="text-2xl   cursor-pointer hover:text-pink-500" />
                </a>
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://twitter.com/fox_metaverse/"
                >
                  <FaTwitter className="text-2xl   cursor-pointer hover:text-blue-400" />
                </a>

                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://www.linkedin.com/showcase/black-fox-metaverse/?viewAsMember=true"
                >
                  <FaLinkedin className="text-2xl   cursor-pointer hover:text-blue-500" />
                </a>

                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href="https://www.youtube.com/@BlackFoxMetaverse/featured"
                >
                  <FaYoutube className="text-2xl   cursor-pointer hover:text-red-600" />
                </a>

                <BsReddit className="text-2xl  cursor-pointer hover:text-red-600" />

                <BsDiscord className="text-2xl   cursor-pointer hover:text-blue-500" />
              </div>
            </ul>
            <div className="flex  items-center gap-4">
              <p className="text-[#777E90] text-md ">Terms</p>
              <p className="text-[#777E90] text-md ">Privacy Policy</p>
            </div>
          </div>
          <div className="grid grid-cols-2  w-full col-span-7 lg:col-span-4 md:grid-cols-4">
            <FooterColumn
              heading={"BFM"}
              content={["Explore", "All NFTs", "About"]}
            ></FooterColumn>
            <FooterColumn
              heading={"Personal"}
              content={[
                "Profile",
                "Favourites",
                "Watchlist",
                "My collections",
                "Settings",
              ]}
            ></FooterColumn>
            <FooterColumn
              heading={"Resources"}
              content={["Platform status", "Partners", "Taxes", "Newsletter"]}
            ></FooterColumn>
            <FooterColumn
              heading={"Community"}
              content={[
                "Help Center",
                "BFM Token",
                "suggest Feature",
                "Subscribe",
              ]}
            ></FooterColumn>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#65676B]/50"></div>
        <div className="flex md:flex-row flex-col px-20 justify-center  py-6 gap-4">
          <p className="text-center ">
            © BlackFoxMetaverse, Inc @ All Rights Reserved
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
