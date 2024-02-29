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
  const [searchData, setSearchData] = useState({
    distance: 0,
    latitude: 0,
    longitude: 0,
    profession: "",
    limitUser: 50,
  });
  const [isCitySelected, setCitySelected] = useState(null);

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
  };

  const [searchResult, setSearchResult] = useState(null);

  const fetchData = async () => {
    try {
      if (pathname.startsWith("/client/search")) {
        const response = await instance.get(
          `search/nearby?${queryParams?.toString()}`
        );
        setSearchResult(response?.data?.data);
      }
    } catch (error) {
      console.error(error?.response?.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.get(
        `search/nearby?${queryParams.toString()}`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(queryParams.toString());
      if (res.status === 200) {
        if (pathname === "/") {
          router.push(`/client/search?${queryParams.toString()}`);
        } else {
          setSearchResult(res.data?.data);
          console.log(res.data?.data);
        }
      } else if (res.data.message === "User token has expired") {
        router.push("/client/auth/login");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    searchInputData(searchData);
    data(searchResult);
  }, [searchResult, searchData]);

  console.log(searchData);

  return (
    <div
      style={{ width: width }}
      className="xl:w-3/4 w-11/12 max-w-[1920px] flex justify-center items-center"
    >
      <form
        action=""
        onSubmit={handleSearch}
        className="w-full  inline-flex flex-col items-center gap-2.5 rounded-[10px] relative"
      >
        <Location onLocationChange={handleLocationChange} />
        <div className="flex justify-center items-center gap-10 h-full w-full bg-white border-[color:var(--Foundation-Grey-grey-50,#E9E9E9)] relative shadow-[0px_1px_4px_0px_rgba(0,0,0,0.10)] lg:px-[25px] lg:py-3 px-4 py-1.5 rounded-[10px] border-2 border-solid">
          <div className="flex items-center gap-4 flex-grow">
            <label htmlFor="search">
              <BsSearch />
            </label>
            <input
              type="text"
              name="profession"
              id="profession"
              value={searchData.profession}
              onChange={handleChange}
              className="lg:min-w-[294px] w-full h-full text-base font-[450] leading-[150.687%] focus:outline-none"
              placeholder="Search by profession..."
            />
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
                onClick={() => setRangeSection(!rangeSection)}
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
                  onBlur={() => setRangeSection(false)}
                  className={`2xl:w-[165%] w-full h-32 space-y-5 bg-white rounded-lg absolute inset-x-0 top-full translate-y-2 lg:translate-y-7 px-10 py-16`}
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
                    {/* <div
                      style={{
                        position: "absolute",
                        left: `${searchData.distance / 10000}%`,
                      }}
                      className="w-12 h-12 z-0 transition-all duration-700 ease-in-out -translate-x-1/2 rounded-full overflow-hidden bg-white cursor-e-resize"
                    >
                      <FaRegCompass className="w-full h-full" />
                    </div> */}
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
                    {/* {parseInt(searchData.distance / 1000)} Kms */}
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
                onClick={() => setIsLocation(!isLocation)}
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
                <div
                  // onBlur={() => setIsLocation(false)}
                  className="min-h-[17rem] 2xl:w-[163%] w-full translate-y-2 lg:translate-y-7 px-[22px] py-10 absolute inset-x-0 top-full rounded bg-white flex-col items-start gap-[46px] flex"
                >
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
                      className="w-full bg-transparent focus:outline-none"
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
                onClick={() => setSearchData({ ...searchData, term: item })}
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
