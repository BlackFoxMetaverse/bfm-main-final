"use client";

import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import { HiMiniSignal } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";

const dummyData = ["Photography", "Marketing", "Gaming", "Developer"];

const SearchForm = ({ value, onChange, handleSubmit, tags, isShown, width }) => {
  const [rangeSection, setRangeSection] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocation, setIsLocation] = useState(false);

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  console.log(userLocation);

  if (tags) {
    dummyData.push(tags);
  }

  return (
    <div style={{width: width}} className="w-full max-w-[1920px] flex justify-center items-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full  inline-flex flex-col relative items-center gap-2.5 rounded-[10px]"
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
                <IoLocationOutline className="w-full h-full" />
              </label>
              {isLocation && (
                <Location onLocationChange={handleLocationChange} />
              )}
              <button
                // onClick={() => setIsLocation(!isLocation)}
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
          <div className="h-10 w-px shrink-0 bg-black/50"></div>
          <div className="flex items-center gap-4 flex-grow">
            <label htmlFor="search">
              <BsSearch />
            </label>
            <input
              type="text"
              name="search"
              id="search"
              value={value}
              onChange={(e) => onChange(e.target.value)}
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
        {isShown && (
          <div className={`flex items-center justify-end w-full gap-2.5`}>
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
        )}
      </form>
    </div>
  );
};

export default SearchForm;
