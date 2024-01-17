"use client";
import React, { useState } from "react";
import Suggestions from "../Suggestions/Suggestions";
import Categories from "../Categories/Categories";
import { RxCross1 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import SearchLayout from "../SearchLayout/SearchLayout";
import ServicesCard from "@/components/Modules/ServicesCard/ServicesCard";
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
    setSelectedSearch(item.title)
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
      <section
        style={{
          background:
            "linear-gradient(90deg, #4461F2 36.1%, rgba(68, 97, 242, 0.00) 70.03%)",
        }}
        className="relative flex max-w-[1920px] min-h-[874px] flex-col justify-center items-start gap-2.5"
      >
        <div className=""></div>
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
