"use client";

import Location from "@/components/DeviceLocation/location";
import instance from "@/utils/axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown, FaRegCompass } from "react-icons/fa6";
import { HiMiniSignal } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import servicesData from "../../../../utils/professionData/services.json";

const dummyData = ["Photography", "Marketing", "Gaming", "Developer"];

const SearchForm = ({ searchInputData, isShown, tags, width, data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [rangeSection, setRangeSection] = useState(false);
  const [isLocation, setIsLocation] = useState(false);
  const [cities, setCities] = useState([
    "New Delhi",
    "Dehradhun",
    "Ghaziabad",
    "Chennai",
    "Noida",
    "Goa",
  ]);
  const [cityTerm, setCityTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchData, setSearchData] = useState({
    distance: 0,
    latitude: 0,
    longitude: 0,
    profession: "",
    limitUser: 50,
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isCitySelected, setCitySelected] = useState(null);

  const handleSearchDropdownToggle = () => {
    setShowSuggestions(!showSuggestions);
    setRangeSection(false);
    setIsLocation(false);
  };

  const handleRangeDropdownToggle = () => {
    setRangeSection(!rangeSection);
    setShowSuggestions(false);
    setIsLocation(false);
  };

  const handleLocationDropdownToggle = () => {
    setIsLocation(!isLocation);
    setRangeSection(false);
    setShowSuggestions(false);
  };

  function handleCitySearch(e) {
    setCityTerm(e.target.value);

    setFilteredCities(
      cities.filter((city) =>
        city.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  function handleCitySelect(index) {
    if (isCitySelected === index) {
      setCitySelected(null);
    } else {
      setCitySelected(index);
      setIsLocation(false);
      setCityTerm(cityTerm === "" ? cities[index] : filteredCities[index]);
    }
  }

  useEffect(() => {
    const professionSuggestions = Object.keys(servicesData)
      .map((category) =>
        Object.keys(servicesData[category].Services).map(
          (service) => `${service}`
        )
      )
      .flat();
    setSuggestions(professionSuggestions);
  }, []);

  const handleLocationChange = (location) => {
    setSearchData({
      ...searchData,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  if (tags) {
    dummyData.push(tags);
  }

  const queryParams = new URLSearchParams({ ...searchData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
    if (name === "profession") {
      setShowSuggestions(searchData?.profession.trim() !== "");
    }
    if (pathname !== "/") {
      const updatedParams = new URLSearchParams({
        ...searchData,
        [name]: value,
      });
      router.replace(`${pathname}?${updatedParams}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
      setRangeSection(false);
      setIsLocation(false);
    }
  };

  const handleProfessionSuggestionClick = (suggestion) => {
    setSearchData({ ...searchData, profession: suggestion });
  };

  const [searchResult, setSearchResult] = useState(null);

  const fetchData = async () => {
    try {
      if (pathname !== "/" && window.location.search !== "") {
        const response = await instance.get(
          `search/nearby${window.location.search}`
        );
        return Promise.resolve(response?.data?.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    fetchData()
      .then((data) => setSearchResult(data))
      .catch((err) => console.error(err));
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    setIsLocation(false);
    setShowSuggestions(false);
    setRangeSection(false);
    const searchPath = `/client/search?${queryParams.toString()}`;
    if (pathname === "/") {
      router.push(searchPath);
    } else {
      fetchData()
        .then((data) => setSearchResult(data))
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    searchInputData(searchData);
    if (pathname !== "/") {
      data(searchResult);
    }
  }, [searchResult, searchData]);

  return (
    <div
      style={{ width: width }}
      onKeyDown={handleKeyDown}
      className="xl:w-3/4 w-11/12 max-w-[1920px] flex justify-center items-center"
    >
      <form
        action=""
        onSubmit={handleSearch}
        className="w-full  inline-flex flex-col items-center gap-2.5 rounded-[10px] relative"
      >
        <Location onLocationChange={handleLocationChange} />
        <div className="flex justify-center items-center gap-10 h-full w-full bg-white border-[color:var(--Foundation-Grey-grey-50,#E9E9E9)] relative shadow-[0px_1px_4px_0px_rgba(0,0,0,0.10)] lg:px-[25px] lg:py-3 px-4 py-1.5 rounded-[10px] border-2 border-solid">
          <div className="flex items-center gap-4 flex-grow relative">
            <label htmlFor="search">
              <BsSearch />
            </label>
            <input
              type="text"
              name="profession"
              id="profession"
              value={searchData.profession}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onClick={handleSearchDropdownToggle}
              className="lg:min-w-[294px] w-full h-full text-base font-[450] leading-[150.687%] focus:outline-none"
              placeholder="Search by profession..."
            />
            {showSuggestions &&
              (suggestions.length > 0 ? (
                <div className="suggestion-dropdown absolute left-0 z-20 w-[200%] flex flex-col gap-2 top-full translate-y-10 bg-white rounded-md py-10 px-5 max-h-80 overflow-y-scroll">
                  {suggestions
                    .filter((suggestion) =>
                      suggestion
                        .toLowerCase()
                        .includes(searchData.profession.toLowerCase())
                    )
                    .map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item cursor-pointer hover:bg-neutral-200 rounded-full px-5 py-2.5"
                        onClick={() =>
                          handleProfessionSuggestionClick(suggestion)
                        }
                      >
                        {suggestion}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="absolute left-0 w-[200%] flex flex-col gap-2 top-full translate-y-10 bg-white rounded-md py-10 px-5 max-h-80a overflow-y-scroll">
                  No Related Professionals
                </div>
              ))}
          </div>
          <div className="flex items-center gap-5 lg:static absolute top-full lg:translate-y-0 translate-y-1/2 left-0 py-1.5 px-3 lg:px-0 lg:py-0 rounded-lg bg-white justify-end">
            <div className="h-10 w-px lg:static hidden shrink-0 bg-black/50"></div>
            <div className="flex justify-end items-center gap-[21px]">
              <label
                htmlFor="range"
                className="w-9 h-[26px] shrink-0 text-[#737579]"
              >
                <HiMiniSignal className="w-full h-full" />
              </label>
              <div
                onClick={handleRangeDropdownToggle}
                className="group cursor-pointer gap-5 flex items-center text-[#737579] text-base not-italic font-normal leading-[normal]"
              >
                <p>
                  {searchData?.distance === 0 || searchData?.distance === "0"
                    ? "Range"
                    : `${parseInt(searchData?.distance / 1000)} kms`}
                </p>
                <FaChevronDown
                  className={`${
                    rangeSection && "rotate-180"
                  } transition-all duration-500 ease-in-out`}
                />
              </div>
              {rangeSection && (
                <div
                  className={`lg:w-[165%] w-full h-32 space-y-5 bg-white rounded-lg absolute inset-x-0 top-full translate-y-2 lg:translate-y-7 px-10 py-16`}
                >
                  <div className="relative flex justify-center items-center">
                    <input
                      type="range"
                      name="distance"
                      id="distance"
                      required
                      value={searchData.distance}
                      onChange={handleChange}
                      min="0"
                      max="1000000"
                      className="accent-black w-full h-1 bg-gray-300 rounded-full focus:outline-none border-none"
                    />
                  </div>
                  <div className="w-full flex justify-end items-center">
                    <p>
                      <span className="text-zinc-500 text-[13px] font-bold font-['DM Sans']">
                        within
                      </span>
                      <span className="text-zinc-500 text-base font-bold font-['DM Sans']">
                        {" "}
                      </span>
                      <span className="text-neutral-900 text-base font-bold font-['DM Sans']">
                        {parseInt(searchData.distance / 1000)} Kms
                      </span>
                    </p>
                  </div>
                </div>
              )}
              <label
                htmlFor="location"
                className="w-9 h-[26px] shrink-0 text-[#737579]"
              >
                <IoLocationOutline className="w-full h-full" />
              </label>
              <button
                onClick={handleLocationDropdownToggle}
                type="button"
                className="group cursor-pointer gap-5 flex items-center text-[#737579] text-base capitalize not-italic font-normal leading-[normal]"
              >
                <p>{cityTerm === "" ? "location" : cityTerm}</p>
                <FaChevronDown
                  className={`${
                    isLocation ? "rotate-180" : "rotate-0"
                  } transition-all duration-500 ease-in-out`}
                />
              </button>
              {isLocation && (
                <div className="lg:w-[165%] w-full h-80 space-y-5 z-50 bg-white rounded-lg absolute inset-x-0 top-full translate-y-2 lg:translate-y-7 px-10 py-16">
                  <label
                    htmlFor="search-city"
                    className="w-full p-3 bg-zinc-100 rounded-[37.96px] justify-center items-center gap-[7.59px] inline-flex text-black text-xs font-normal "
                  >
                    <FaSearch className="text-neutral-500" />
                    <input
                      type="search"
                      name="search-city"
                      id="search-city"
                      value={cityTerm}
                      onChange={handleCitySearch}
                      className="w-full bg-transparent text-xl focus:outline-none"
                      placeholder="search"
                    />
                  </label>
                  <div className="justify-between w-full items-start gap-x-4 gap-y-1.5 grid grid-cols-2">
                    {cityTerm === "" ? (
                      cities.map((city, index) => (
                        <button
                          key={index}
                          type="button"
                          // disabled={isCitySelected === null ? false : true}
                          onClick={() => handleCitySelect(index)}
                          className={`text-xl font-normal px-4 py-1.5 whitespace-nowrap capitalize rounded-full border-2 ${
                            isCitySelected === index
                              ? "border-black text-black"
                              : "border-transparent text-neutral-500"
                          }`}
                        >
                          {city}
                        </button>
                      ))
                    ) : filteredCities.length === 0 ? (
                      <div className="w-full col-span-2 text-center">
                        Your city is not available here
                      </div>
                    ) : (
                      filteredCities.map((city, index) => (
                        <button
                          key={index}
                          type="button"
                          // disabled={isCitySelected === null ? false : true}
                          onClick={() => handleCitySelect(index)}
                          className={`text-xl font-normal px-4 py-1.5 rounded-full border-2 whitespace-nowrap capitalize ${
                            isCitySelected === index
                              ? "border-black text-black"
                              : "border-transparent text-neutral-500"
                          }`}
                        >
                          {city}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex w-36 py-3 justify-center items-center gap-2 h-full rounded-[9.287px] bg-black text-white text-base not-italic font-normal leading-[normal]"
          >
            Search
          </button>
        </div>
        {isShown && (
          <div className={`lg:flex hidden items-center justify w-full gap-2.5`}>
            <p className="text-white text-lg font-normal leading-[27px]">
              Popular tags :{" "}
            </p>
            {dummyData?.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  setSearchData({ ...searchData, profession: item })
                }
                className="min-w-[65.59px] min-h-[39.27px] pl-[15.55px] pr-4 pt-[4.79px] pb-[5.48px] rounded-3xl border border-white justify-center items-center inline-flex text-white text-base font-normal leading-7"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
