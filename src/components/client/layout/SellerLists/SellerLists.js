"use client";

import React, { useEffect, useState } from "react";
import SearchForm from "../../modules/FormLayout/SearchForm";
import ServicesCard from "../../modules/ServicesCard/ServicesCard";

const RecommendedData = [1, 2, 3, 4, 5, 6, 7, 8];
const RecentData = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const SellerLists = ({ params }) => {
  const [searchResult, setSearchResult] = useState([]);

  console.log(searchResult);

  return (
    <main className="w-full">
      {/* Search section */}
      <section className=" min-h-[343px] flex justify-center items-center shrink-0 relative">
        <div className="absolute inset-0 -z-10 w-full h-full flex justify-center items-center overflow-hidden">
          <img
            loading="eager"
            src="https://4kwallpapers.com/images/walls/thumbs_3t/6789.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex max-w-[1920px] flex-wrap w-11/12 h-32 mx-auto items-center">
          <SearchForm
            handleSubmit={(e) => e.preventDefault()}
            data={setSearchResult}
          />
        </div>
      </section>

      {/* Recent Section */}
      {searchResult?.length !== 0 ? (
        searchResult === null ? (
          <section className="space-y-5 w-11/12 mx-auto my-12 flex flex-col gap-5 items-center">
            <div className="flex items-end justify-between w-full">
              <div>
                <span className="text-neutral-900 text-[32.46px] font-bold">
                  Professionals{" "}
                </span>
                <span className="text-neutral-900 text-xl">Near You</span>
              </div>
              <div className="text-neutral-900 text-xl">20 results</div>
            </div>
            <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start gap-5 w-full">
              {RecentData?.map((_, index) => (
                <ServicesCard
                  key={index}
                  id={_?.uid}
                  username={_?.userName}
                  distance={_?.distance}
                  profession={_?.profession}
                />
              ))}
            </div>
            <button
              type="button"
              className="w-1/3 h-9 py-2.5 bg-neutral-900 rounded justify-center items-center inline-flex mx-auto"
            >
              <div className="text-center text-white text-[11px] font-bold font-['Neue Helvetica'] uppercase leading-none tracking-wide">
                View More
              </div>
            </button>
          </section>
        ) : (
          <section className="space-y-5 w-5/6 mx-auto my-12">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-neutral-900 text-[32.46px] font-bold">
                  Photographer{" "}
                </span>
                <span className="text-neutral-900 text-xl">Near You</span>
              </div>
              <div className="text-neutral-900 text-xl">50 results</div>
            </div>
            <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start gap-5 w-full">
              {searchResult?.map((data, index) => (
                <ServicesCard
                  key={index}
                  id={data?.uid}
                  username={data?.userName}
                  distance={data?.distance}
                  profession={data?.profession}
                />
              ))}
            </div>
            <button
              type="button"
              className="w-1/3 h-9 py-2.5 bg-neutral-900 rounded justify-center items-center inline-flex mx-auto"
            >
              <div className="text-center text-white text-[11px] font-bold font-['Neue Helvetica'] uppercase leading-none tracking-wide">
                View More
              </div>
            </button>
          </section>
        )
      ) : (
        <div className="h-40 w-full flex justify-center items-center">
          <p>No Result found</p>
        </div>
      )}
    </main>
  );
};

export default SellerLists;
