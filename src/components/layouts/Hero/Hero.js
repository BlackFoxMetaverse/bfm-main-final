"use client";
import React, { useState } from "react";
import Suggestions from "../Suggestions/Suggestions";
import Categories from "../Categories/Categories";
import { RxCross1 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import SearchLayout from "../SearchLayout/SearchLayout";
import ServicesCard from "@/components/Modules/ServicesCard/ServicesCard";
import Image from "next/image";
import { HiMiniSignal } from "react-icons/hi2";
import { FaChevronDown, FaRegCompass } from "react-icons/fa6";
const dummyData = [
  { id: 1, title: "Photography", category: "Art" },
  { id: 2, title: "Marketing", category: "Business" },
  { id: 3, title: "Gaming", category: "Entertainment" },
  { id: 4, title: "Developer", category: "Technology" },
  // Add more dummy data as needed
];
const Hero = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");

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
      <section className="relative flex min-h-[874px] w-full h-full flex-col justify-center items-start gap-2.5">
        <div className="absolute inset-0 -z-10 w-full h-full flex justify-center items-center overflow-hidden">
          <Image
            src={require("../../../../public/hero_bg.svg")}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-5/6 max-w-[1920px] h-full m-auto flex justify-start items-start">
          <div className="SearchForProfessionals w-96 text-white text-8xl font-bold">
            Search <br />
            for Professionals
          </div>
        </div>
        <div className="absolute w-2/3 left-2/3 max-w-[1920px] -translate-x-2/3 flex justify-center items-center">
          <form
            action=""
            onSubmit={(e) => e.preventDefault()}
            className="w-full h-16 bg-white inline-flex flex-col relative items-start gap-2.5 border-[color:var(--Foundation-Grey-grey-50,#E9E9E9)] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.10)] px-[25px] py-3 rounded-[10px] border-2 border-solid"
          >
            <div className="flex justify-between items-center gap-10 h-full w-full">
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
                  {rangeSection && (
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
                  )}
                </div>
              </div>
              <button className="flex w-36 justify-center items-center gap-2 h-full rounded-[9.287px] bg-[#4461F2] text-white text-base not-italic font-normal leading-[normal]">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Services */}
      <section className="w-full aspect-video">
        <div className="flex flex-col items-start gap-10 w-5/6 m-auto">
          <h5 className="text-[color:var(--Foundation-Blue-blue-500,var(--Primary-1,#4461F2))] text-[32px] not-italic font-bold leading-[normal]">
            Services Near You
          </h5>
          <div className="flex items-start gap-[46px] w-full">
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
