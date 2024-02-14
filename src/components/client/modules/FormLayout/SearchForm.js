"use client";

import Location from "@/components/DeviceLocation/location";
import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaChevronDown, FaRegCompass } from "react-icons/fa6";
import { HiMiniSignal } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";

const dummyData = ["Photography", "Marketing", "Gaming", "Developer"];

const SearchForm = ({ searchInputData, tags, width, data }) => {
  const [rangeSection, setRangeSection] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);
  const [isLocation, setIsLocation] = useState(false);
  const [searchData, setSearchData] = useState({
    distance: 0,
    latitude: 0,
    longitude: 0,
    term: "",
    limitUser: 50,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  // console.log(parseInt(searchData.distance));

  const [searchResult, setSearchResult] = useState(null);

  console.log(searchData?.term);

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("bfm-client-token");
      console.log(token);
      const res = await instance.get(
        `search/nearby?longitude=${searchData?.longitude}&latitude=${searchData?.latitude}&distance=${searchData?.distance}&limitUser=${searchData?.limitUser}&profession=${searchData?.term}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data?.data);
        setSearchResult(res.data?.data);
      } else if (res.data.message === "User token has expired") {
        
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // searchInputData(searchData);
    data(searchResult);
  }, [searchResult]);

  return (
    <div
      style={{ width: width }}
      className="w-full max-w-[1920px] flex justify-center items-center"
    >
      <form
        action=""
        onSubmit={handleSearch}
        className="w-full  inline-flex flex-col items-center gap-2.5 rounded-[10px] relative"
      >
        <div className="flex justify-center items-center gap-10 h-full w-full bg-white border-[color:var(--Foundation-Grey-grey-50,#E9E9E9)] relative shadow-[0px_1px_4px_0px_rgba(0,0,0,0.10)] lg:px-[25px] lg:py-3 px-4 py-1.5 rounded-[10px] border-2 border-solid">
          <div className="flex items-center gap-5 lg:static absolute top-full lg:translate-y-0 translate-y-1/2 right-0 py-1.5 px-3 lg:px-0 lg:py-0 rounded-lg bg-white justify-end">
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
                      name="distance"
                      id="distance"
                      value={searchData.distance}
                      onChange={handleChange}
                      min="0"
                      max="1000000"
                      className="appearance-none w-full h-2 bg-gray-300 overflow-hidden rounded-full focus:outline-none"
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: `${searchData.distance / 10000}%`,
                        translate: "12",
                      }}
                      className="w-12 h-12 transition-all duration-700 ease-in-out rounded-full overflow-hidden bg-white cursor-e-resize"
                    >
                      <FaRegCompass className="w-full h-full" />
                    </div>
                  </div>
                  <div>{searchData.distance / 1000} Kms</div>
                </div>
              )}
              <label
                htmlFor="location"
                className="w-9 h-[26px] shrink-0 text-[#737579]"
              >
                <IoLocationOutline className="w-full h-full" />
              </label>
              {isLocation && (
                <Location onLocationChange={handleLocationChange} />
              )}
              <button
                onClick={() => setIsLocation(!isLocation)}
                type="button"
                className="group cursor-pointer gap-5 flex items-center text-[#737579] text-base not-italic font-normal leading-[normal]"
              >
                <p>location</p>
                <FaChevronDown
                  className={`${
                    isLocation ? "rotate-180" : "rotate-0"
                  }transition-all duration-500 ease-in-out`}
                />
              </button>
            </div>
          </div>
          <div className="h-10 w-px lg:static hidden shrink-0 bg-black/50"></div>
          <div className="flex items-center gap-4 flex-grow">
            <label htmlFor="search">
              <BsSearch />
            </label>
            <input
              type="text"
              name="term"
              id="term"
              value={searchData.term}
              onChange={handleChange}
              className="lg:min-w-[294px] w-full h-full text-base font-[450] leading-[150.687%] focus:outline-none"
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
        {/* {isShown && (
          <div
            className={`lg:flex hidden items-center justify-end w-full gap-2.5`}
          >
            <p className="text-white text-lg font-normal leading-[27px]">
              Popular tags :{" "}
            </p>
            {dummyData?.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChange(item)}
                className="flex bg-[#BED7BF] justify-center items-center gap-[5px] border [background:#EAF2EB] px-2 py-1 rounded-xl border-solid border-[#BED7BF]"
              >
                {item}
              </button>
            ))}
          </div>
        )} */}
      </form>
    </div>
  );
};

export default SearchForm;
