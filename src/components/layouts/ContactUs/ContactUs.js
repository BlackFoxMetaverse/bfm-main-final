"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { MdEmail, MdWifiCalling1 } from "react-icons/md";

function ContactUs() {
  const subject = ["General Enquiry", "Feedback", "Support"];
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio" && checked && name === "subject") {
      setContactInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setContactInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactInfo);
    // Here you would typically send the contactInfo to your backend.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-24 pr-16 pl-3.5 bg-white rounded-xl shadow-2xl max-md:pr-5"
    >
      <div className="flex gap-5 justify-between max-md:flex-col max-md:gap-0">
        <div className="flex flex-col max-md:ml-0 max-md:w-full">
          {/* Left Side Content */}
          <div className="flex flex-col grow w-full px-7 py-16 bg-blue-600 text-white min-h-screen rounded-xl max-md:mt-10 max-md:max-w-full relative">
            <div className="absolute inset-0 size-full overflow-hidden flex justify-center items-center">
              <Image
                src={require("../../../../public/clients_images/fox.svg")}
                alt=""
                className="z-10 size-full object-cover"
              />
            </div>
            <h1 className="text-5xl">Contact Information</h1>
            <p className="text-2xl mt-4">
              Say something to connect with the BFM team!
            </p>
            <div className="flex-grow flex flex-col items-start justify-center gap-10">
              <p className="flex gap-5">
                <MdWifiCalling1 className="text-4xl " />
                +91 86018 73156
              </p>
              <p className="flex gap-5">
                <MdEmail className="text-4xl " />
                blackfoxmetaverse@gmail.com
              </p>
              {/* <p className="flex gap-5">
                <IoLocation className="text-4xl " />
                132 Dartmouth Street Boston, Massachusetts 02156 United States
              </p> */}
            </div>
            <div className="flex gap-5 items-center">
              <Link
                href={"#"}
                type="button"
                className="size-10 rounded-full flex justify-center items-center bg-black/50 text-white text-xl"
              >
                <FaXTwitter />
              </Link>
              <Link
                href={"#"}
                type="button"
                className="size-10 rounded-full flex justify-center items-center bg-black/50 text-white text-xl"
              >
                <FaInstagram />
              </Link>
              <Link
                href={"#"}
                type="button"
                className="size-10 rounded-full flex justify-center items-center bg-black/50 text-white text-xl"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-5 py-16 w-2/3 h-fit max-md:ml-0 max-md:w-full">
          {/* Right Side Form */}
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-base font-medium mt-5 text-neutral-400"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={contactInfo.firstName}
              onChange={handleInputChange}
              className="mt-3.5 rounded shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-base font-medium text-neutral-400 mt-5"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={contactInfo.lastName}
              onChange={handleInputChange}
              className="mt-3.5 rounded shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-base font-medium text-neutral-400 mt-5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactInfo.email}
              onChange={handleInputChange}
              className="mt-3.5 rounded shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="text-base font-medium text-neutral-400 mt-5"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={contactInfo.phoneNumber}
              onChange={handleInputChange}
              className="mt-3.5 rounded shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label
              htmlFor="subject"
              className="text-base font-medium text-neutral-400 mt-5"
            >
              Select Subject?
            </label>
            <div className="flex items-center gap-5">
              {subject?.map((sub, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="radio"
                    name={`subject`}
                    id={`subject${index}`}
                    key={index}
                    className="appearance-none before:content-[''] checked:after:content-['\2713'] size-5 flex justify-center items-center checked:after:text-white checked:after:text-xs checked:after:flex checked:after:justify-center checked:after:items-center checked:after:size-full checked:after:rounded-full checked:after:bg-black rounded-full border border-black"
                    value={sub}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`subject${index}`}>{sub}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col col-span-2">
            <label
              htmlFor="message"
              className="text-base font-medium text-neutral-400 mt-5"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={contactInfo.message}
              onChange={handleInputChange}
              rows="4"
              className="mt-3.5 rounded shadow-sm focus:outline-none p-5 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="justify-center items-start self-end px-16 py-6 mt-14 max-w-full text-xl text-center text-white whitespace-nowrap bg-indigo-500 rounded-md shadow-sm font-[450] w-[277px] max-md:pr-5 max-md:pl-6 max-md:mt-10"
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
}

export default ContactUs;
