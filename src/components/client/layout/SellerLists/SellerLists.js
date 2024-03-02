"use client";

import React, { useEffect, useState } from "react";
import SearchForm from "../../modules/FormLayout/SearchForm";
import ServicesCard from "../../modules/ServicesCard/ServicesCard";
import NoResultsFound from "@/components/layouts/Errors/NoResults";
import instance from "@/utils/axios";

const SellerLists = ({ params }) => {
  const [searchInput, setSearchInput] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [recomendations, setRecommendations] = useState([]);

  async function fetchNearbyData() {
    try {
      const response = await instance.get(
        `search/recommendation?longitude=${searchInput?.longitude}&latitude=${searchInput?.latitude}&page=1`
      );

      setRecommendations(response?.data?.data);
      console.log(response?.data?.message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchNearbyData();
  }, [searchInput?.latitude]);

  function handleSearchAgain() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="w-full">
      {/* Search section */}
      <section className=" min-h-[343px] flex justify-center items-center shrink-0 relative">
        <div className="absolute inset-0 -z-10 size-full flex justify-center items-center overflow-hidden">
          <img
            loading="eager"
            src="https://4kwallpapers.com/images/walls/thumbs_3t/6789.jpg"
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="flex max-w-[1920px] flex-wrap w-11/12 h-32 mx-auto items-center">
          <SearchForm
            searchInputData={setSearchInput}
            handleSubmit={(e) => e.preventDefault()}
            data={setSearchResult}
          />
        </div>
      </section>
      {/* Recent Section */}
      {searchResult === null || searchResult === undefined ? (
        <section className="space-y-5 w-11/12 mx-auto my-12 flex flex-col gap-5 items-center">
          <div className="flex items-end justify-between w-full">
            <div>
              <span className="text-neutral-900 text-[32.46px] font-bold">
                {params?.profession === "more"
                  ? "Professionals"
                  : decodeURIComponent(params?.profession)}{" "}
              </span>
              <span className="text-neutral-900 text-xl">Near You</span>
            </div>
            <div className="text-neutral-900 text-xl capitalize">
              {recomendations?.length}{" "}
              {recomendations?.length <= 1 ? "result" : "results"}
            </div>
          </div>
          {recomendations?.length === 0 ? (
            <div>No Result</div>
          ) : (
            <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start gap-5 w-full">
              {recomendations?.map((data, index) => (
                <ServicesCard key={index} {...data} />
              ))}
            </div>
          )}
          {recomendations?.length > 20 && (
            <button
              type="button"
              className="w-1/3 h-9 py-2.5 bg-neutral-900 rounded justify-center items-center inline-flex mx-auto"
            >
              <div className="text-center text-white text-[11px] font-bold font-['Neue Helvetica'] uppercase leading-none tracking-wide">
                View More
              </div>
            </button>
          )}
        </section>
      ) : (
        <section className="space-y-5 w-5/6 mx-auto my-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-neutral-900 text-[32.46px] font-bold">
                {searchInput?.profession !== ""
                  ? searchInput?.profession + " "
                  : params?.profession === "more" ||
                    params?.profession === "search"
                  ? "Professionals "
                  : decodeURIComponent(params?.profession) + " "}
              </span>
              <span className="text-neutral-900 text-xl">Near You</span>
            </div>
            <div className="text-neutral-900 text-xl capitalize">
              {searchResult?.length}{" "}
              {searchResult?.length <= 1 ? "result" : "results"}
            </div>
          </div>
          {searchResult?.length !== 0 ? (
            <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start gap-5 w-full">
              {searchResult?.map((data, index) => (
                <ServicesCard key={index} {...data} />
              ))}
            </div>
          ) : (
            <NoResultsFound onClick={handleSearchAgain} />
          )}
          {searchResult?.length > 20 && (
            <button
              type="button"
              className="w-1/3 h-9 py-2.5 bg-neutral-900 rounded justify-center items-center inline-flex mx-auto"
            >
              <div className="text-center text-white text-[11px] font-bold font-['Neue Helvetica'] uppercase leading-none tracking-wide">
                View More
              </div>
            </button>
          )}
        </section>
      )}
    </main>
  );
};

export default SellerLists;
