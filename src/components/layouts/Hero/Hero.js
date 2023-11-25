"use client";
import React, { useState } from "react";
import Suggestions from "../Suggestions/Suggestions";
import Categories from "../Categories/Categories";
import { RxCross1 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
const dummyData = [
  { id: 1, title: "Photography", category: "Art" },
  { id: 2, title: "Marketing", category: "Business" },
  { id: 3, title: "Gaming", category: "Entertainment" },
  { id: 4, title: "Developer", category: "Technology" },
  // Add more dummy data as needed
];
const Hero = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  const filterSuggestions = () => {
    const filteredSuggestions = dummyData.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
  const handleSuggestionClick = (item) => {
    console.log(`Clicked: ${item.title}`);
    // Add logic to navigate to the other page dynamically
  };
  return (
    <div className="flex flex-col px-[79px] pb-[81px]">
      <div className="flex items-center justify-center flex-col mt-[100px]">
        <div className="flex my-4 md:my-5 items-center justify-center">
          <form className="text-[10px] justify-between border cursor-text bg-[#282828] text-white px-[21px] rounded-2xl border-solid border-[#C7C7C7] items-center  flex sm:text-xs lg:text-sm  relative">
            <div>
              <FiSearch className="w-7 h-7 cursor-pointer" />
            </div>
            <input
              type="text"
              id="default-search"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                filterSuggestions();
              }}
              className="flex w-[900px] items-center gap-2.5 outline-none cursor-text bg-[#282828]  text-white px-[21px] py-4 rounded-2xl "
              placeholder="Search"
            />
            <button
              type="button"
              className="text-white flex cursor-text justify-between px-4 items-center"
            >
              <div>
                <RxCross1 className="w-5 h-5 cursor-pointer" />
              </div>
            </button>
          </form>
        </div>
        <div className="w-full">
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((item) => (
                <li key={item.id} onClick={() => handleSuggestionClick(item)}>
                  {item.title} - {item.category}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center items-center gap-x-5 mb-5 ">
          <button className="flex justify-center items-center hover:bg-[#282828] hover:text-white gap-2.5 px-[21px] py-2 rounded-lg border-2 border-solid border-[rgba(40,40,40,0.40)] text-[#282828] text-xl not-italic font-semibold leading-[normal]">
            Range
          </button>
          <button className="flex justify-center items-center hover:bg-[#282828] hover:text-white gap-2.5 px-[21px] py-2 rounded-lg border-2 border-solid border-[rgba(40,40,40,0.40)] text-[#282828] text-xl not-italic font-semibold leading-[normal]">
            Location
          </button>
        </div>
      </div>

      <Suggestions />
      <Categories />
    </div>
  );
};

export default Hero;
