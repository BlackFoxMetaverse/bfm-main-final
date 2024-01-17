"use client";
import React, { useState } from "react";
import Suggestions from "../Suggestions/Suggestions";
import Categories from "../Categories/Categories";
import { RxCross1 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import SearchLayout from "../SearchLayout/SearchLayout";
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
    <div className="flex flex-col bg-gray-500 px-[79px] pb-[81px]">
      <div className="flex items-center justify-center flex-col mt-[100px]">
        <div className="flex  my-4 md:my-5 relative items-center justify-center">
          <form className="text-[10px] justify-between border cursor-text bg-[#282828] text-white px-[21px] rounded-2xl border-solid border-[#C7C7C7] items-center  flex sm:text-xs lg:text-sm  relative">
            <div>
              {searchInput && <FiSearch className="w-7 h-7 cursor-pointer" />}
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
                {searchInput ? (
                  <RxCross1
                    onClick={handleCloseClick}
                    className="w-5 h-5 cursor-pointer"
                  />
                ) : (
                  <FiSearch className="w-7 h-7 cursor-pointer" />
                )}
              </div>
            </button>
          </form>
          <div className="w-full absolute top-[70px] bg-gray-50 rounded shadow-xl z-50 ">
            {searchInput && suggestions.length > 0 && (
              <ul className="suggestions-list text-lg font-semibold flex flex-col gap-y-5 px-10 py-5">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full hover:bg-gray-400 p-2  cursor-pointer rounded-xl"
                  >
                    {item.title} - {item.category}
                  </li>
                ))}
              </ul>
            )}
            {showOptions && (
              <div className="w-full flex gap-y-10 flex-col justify-center  items-center pt-10 pb-20">
                <div className="flex gap-x-5">
                  <button
                    onClick={handleRangeOptionClick}
                    className={`flex justify-center items-center ${
                      showLocationOptions
                        ? " text-black"
                        : "bg-[#4461F2] text-white"
                    }  gap-2.5 px-[21px] py-2 rounded-lg border-2 border-solid  text-xl not-italic font-semibold leading-[normal]`}
                  >
                    Range
                  </button>
                  <button
                    onClick={handleLocationOptionClick}
                    className={`flex justify-center items-center ${
                      showLocationOptions ? "bg-[#4461F2] text-white" : ""
                    } hover:bg-[#282828] hover:text-white gap-2.5 px-[21px] py-2 rounded-lg border-2 border-solid border-[rgba(40,40,40,0.40)] text-[#282828] text-xl not-italic font-semibold leading-[normal]  `}
                  >
                    Location
                  </button>
                </div>

                {showRangeOptions ? (
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={seekbarValue}
                      onChange={handleSeekbarChange}
                      className="seekbar w-[374px] h-1 bg-white"
                    />
                    <div className="text-lg font-bold">{seekbarValue} Km</div>
                  </div>
                ) : (
                  <div className="w-[791px] flex flex-col">
                    <form className="w-full flex justify-center text-sm relative">
                      <input
                        type="text"
                        id="default-search"
                        className="w-[791px] text-[10px] sm:text-xs lg:text-sm p-3 md:p-4 z-10 pl-4 lg:pl-10 text-gray-900 border border-[#000000]/40 rounded-full bg-gray-50 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="Search Location"
                        value={searchLocationInput}
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute w-8 lg:w-10 h-8 right-2 z-50 lg:h-10 lg:top-1.5 top-2.5"
                      >
                        <svg
                          viewBox="0 0 28 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.9974 25.7747C7.55407 25.7747 2.33073 20.5514 2.33073 14.1081C2.33073 7.66475 7.55407 2.44141 13.9974 2.44141C20.4407 2.44141 25.6641 7.66475 25.6641 14.1081C25.6641 20.5514 20.4407 25.7747 13.9974 25.7747Z"
                            fill="#0368FF"
                            stroke="#0368FF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.91406 14.1094H16.9141"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.5859 10.6094L18.0859 14.1094L14.5859 17.6094"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </form>
                    <div className="w-full px-14 pt-5">
                      <ul className="grid grid-cols-4 ">
                        {locationList.map((location) => (
                          <li
                            className="p-2 cursor-pointer"
                            key={location}
                            onClick={() => handleListItemClick(location)}
                          >
                            {location}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-x-5 mb-5 ">
          <button
            onClick={handleRangeOptionClick}
            className="flex justify-center items-center hover:bg-[#282828] hover:text-white gap-2.5 px-[21px] py-2 rounded-lg border-2 border-solid border-[rgba(40,40,40,0.40)] text-[#282828] text-xl not-italic font-semibold leading-[normal]"
          >
            Range
          </button>
          <button
            onClick={handleLocationOptionClick}
            className="flex justify-center items-center hover:bg-[#282828] hover:text-white gap-2.5 px-[21px] py-2 rounded-lg border-2 border-solid border-[rgba(40,40,40,0.40)] text-[#282828] text-xl not-italic font-semibold leading-[normal]"
          >
            Location
          </button>
        </div>
      </div>

      {searchedItem ? (
        <SearchLayout title={selectedSearch} />
      ) : (
        <div>
          <Suggestions />
          <Categories />
        </div>
      )}
    </div>
  );
};

export default Hero;
