"use client";
import React, { useState } from "react";
import Suggestions from "../../../layouts/Suggestions/Suggestions";
import Categories from "../../../layouts/Categories/Categories";
import { RxCross1 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import SearchLayout from "../../../layouts/SearchLayout/SearchLayout";
import ServicesCard from "@/components/Modules/ServicesCard/ServicesCard";
import Image from "next/image";
import { HiMiniSignal } from "react-icons/hi2";
import { FaChevronDown, FaRegCompass } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import Location from "@/components/DeviceLocation/location";
import { BsSearch } from "react-icons/bs";
import { AiFillRightSquare } from "react-icons/ai";
const dummyData = [
  { id: 1, title: "Photography", category: "Art" },
  { id: 2, title: "Marketing", category: "Business" },
  { id: 3, title: "Gaming", category: "Entertainment" },
  { id: 4, title: "Developer", category: "Technology" },
];
const Hero = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [isLocation, setIsLocation] = useState(false);

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  console.log(userLocation);

  const [suggestions, setSuggestions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showRangeOptions, setShowRangeOptions] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [seekbarValue, setSeekbarValue] = useState(50);
  const [searchLocationInput, setSearchLoactionInput] = useState("");
  const [searchedItem, setSearchedItem] = useState(false);
  const [rangeSection, setRangeSection] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);
  const [locationList] = useState([
    "New Delhi",
    "Dehradhun",
    "Mumbai",
    "Gurugram",
    "Ghazibad",
    "Pune",
    "faridabad",
    "Noida",
    "Goa",
    "Kerela",
    "Bihar",
  ]);

  const handleListItemClick = (value) => {
    setSearchLoactionInput(value);
  };
  const filterSuggestions = () => {
    const filteredSuggestions = dummyData.filter((item) =>
      item.title.toLowerCase().includes(searchInput?.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
  const handleSuggestionClick = (item) => {
    console.log(`Clicked: ${item.title}`);
    setSelectedSearch(item.title);
    console.log(`Clicked: ${item.id}`);
    setSearchedItem(true);
    setSearchInput("");
  };
  const handleSeekbarChange = (e) => {
    setSeekbarValue(parseInt(e.target.value, 10));
  };
  const handleCloseClick = () => {
    setSearchInput("");
    setSearchedItem(false);
  };
  const handleRangeOptionClick = () => {
    setShowOptions(true);
    setShowRangeOptions(true);
    setShowLocationOptions(false);
  };
  const handleLocationOptionClick = () => {
    setShowOptions(true);
    setShowRangeOptions(false);
    setShowLocationOptions(true);
  };

  return (
    <main className="inline-flex w-full flex-col items-center gap-[120px]">
      {/* Hero */}
      <section className="relative flex w-full h-screen flex-col justify-center items-center gap-2.5 bg-[#331d71]/50">
        <div className="absolute inset-0 -z-10 w-full h-full flex justify-center items-center overflow-hidden">
          <Image
            loading="eager"
            src={require("../../../../public/hero_bg.svg")}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="xl:w-3/4 w-5/6 max-w-[1920px]  flex justify-center flex-col items-start">
          <div className="flex flex-col justify-cente items-center gap-[37px] px-0 py-[15px]">
            <div className="SearchForProfessionals text-white text-8xl font-bold">
              Search <br />
              for Professionals
            </div>
          </div>
          <div className="w-full max-w-[1920px] flex justify-center items-center">
            <form
              action=""
              onSubmit={(e) => e.preventDefault()}
              className="w-full  inline-flex flex-col relative items-end gap-2.5 rounded-[10px]"
            >
              <div className="flex justify-center items-center gap-10 h-full w-full bg-white border-[color:var(--Foundation-Grey-grey-50,#E9E9E9)] relative shadow-[0px_1px_4px_0px_rgba(0,0,0,0.10)] px-[25px] py-3 rounded-[10px] border-2 border-solid">
                <div className="flex items-center gap-5">
                  <div className="flex justify-end items-center gap-[21px]">
                    <label
                      htmlFor="range"
                      className="w-9 h-[26px] shrink-0 text-[#737579]"
                    >
                      <HiMiniSignal className="w-full h-full" />
                    </label>
                    <div
                      onClick={() => setRangeSection(!rangeSection)}
                      className="group cursor-pointer gap-5 flex items-center text-[#737579] text-base not-italic font-normal leading-[normal]"
                    >
                      <p>Range</p>
                      <FaChevronDown
                        className={`${
                          rangeSection && "rotate-180"
                        } transition-all duration-500 ease-in-out`}
                      />
                    </div>
                    {/* {rangeSection && (
                      <div
                        className={`w-full h-56 space-y-5 bg-white absolute inset-x-0 top-full px-10 py-16`}
                      >
                        <div className="relative flex justify-center items-center">
                          <input
                            type="range"
                            value={rangeValue}
                            onChange={(e) => setRangeValue(e.target.value)}
                            min="0"
                            max="100"
                            className="appearance-none w-full h-2 bg-gray-300 overflow-hidden rounded-full focus:outline-none"
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: `${rangeValue}%`,
                            }}
                            className="w-12 h-12 rounded-full overflow-hidden bg-white cursor-e-resize"
                          >
                            <FaRegCompass className="w-full h-full" />
                          </div>
                        </div>
                        <div>{rangeValue} Kms</div>
                      </div>
                    )} */}
                    <label
                      htmlFor="location"
                      className="w-9 h-[26px] shrink-0 text-[#737579]"
                    >
                      <HiMiniSignal className="w-full h-full" />
                    </label>
                    {isLocation && (
                      <Location onLocationChange={handleLocationChange} />
                    )}
                    <div
                      // onClick={() => setlocationSection(!locationSection)}
                      onClick={() => setIsLocation(!isLocation)}
                      className="group cursor-pointer gap-5 flex items-center text-[#737579] text-base not-italic font-normal leading-[normal]"
                    >
                      <p>location</p>
                      <FaChevronDown
                        className={`${
                          // locationSection && "rotate-180"
                          ""
                        } transition-all duration-500 ease-in-out`}
                      />
                    </div>
                  </div>
                </div>
                <div className="h-10 w-px shrink-0 bg-black/50"></div>
                <div className="flex items-center gap-4 flex-grow">
                  <label htmlFor="search">
                    <BsSearch />
                  </label>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="min-w-[294px] w-full h-full text-base font-[450] leading-[150.687%] focus:outline-none"
                    placeholder="Search by profession..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-36 py-3 justify-center items-center gap-2 h-full rounded-[9.287px] bg-[#4461F2] text-white text-base not-italic font-normal leading-[normal]"
                >
                  Search
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                <p className="text-white text-lg font-normal leading-[27px]">
                  Popular tags :{" "}
                </p>
                {dummyData?.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSearchInput(item.title)}
                    className="flex bg-[#BED7BF] justify-center items-center gap-[5px] border [background:#EAF2EB] px-2 py-1 rounded-xl border-solid border-[#BED7BF]"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="w-full max-w0[1920px] aspect-video">
        <div className="flex flex-col items-center gap-10 w-5/6 m-auto">
          <h5 className="text-[color:var(--Foundation-Blue-blue-500,var(--Primary-1,#562FB9))] w-full text-left text-[32px] not-italic font-bold leading-[normal]">
            Services Near You
          </h5>
          <div className="flex items-start gap-[46px] w-full">
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
          </div>
          <button
            type="button"
            className="flex justify-center items-center gap-2 rounded pl-8 pr-6 py-4 text-[#562FB9] text-xl font-normal leading-[100%] tracking-[-1px]"
          >
            View More
            <AiFillRightSquare />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Hero;
