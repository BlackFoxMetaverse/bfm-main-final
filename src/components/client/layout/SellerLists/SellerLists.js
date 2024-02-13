"use client";

import React, { useState } from "react";
import SearchForm from "../../modules/FormLayout/SearchForm";
import ServicesCard from "../../modules/ServicesCard/ServicesCard";

const RecommendedData = [1, 2, 3, 4, 5, 6, 7, 8];
const RecentData = [1, 2, 3, 4, 5, 6, 7, 8];

const SellerLists = ({ params }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="w-full">
      {/* Search section */}
      <section className=" min-h-[343px] flex justify-center items-center shrink-0 [background:#320E8F]">
        <div className="flex max-w-[1920px] flex-wrap w-5/6 h-32 justify-center mx-auto items-center">
          <SearchForm
            handleSubmit={(e) => e.preventDefault()}
            onChange={setSearchTerm}
            value={searchTerm}
          />
          <div className="lg:flex hidden items-start gap-[13.806px] w-full">
            <button
              type="button"
              className="flex justify-center items-center gap-[6.139px] [background:var(--Foundation-Blue-blue-50,#ECEFFE)] px-[12.278px] py-[6.139px] rounded-[14.734px] text-[color:var(--Primary-1,#4461F2)] text-[17.189px] font-normal leading-[100%] tracking-[-0.859px]"
            >
              Top Profiles
            </button>
            <button
              type="button"
              className="flex justify-center items-center gap-[6.139px] [background:var(--Foundation-Blue-blue-50,#ECEFFE)] px-[12.278px] py-[6.139px] rounded-[14.734px] text-[color:var(--Primary-1,#4461F2)] text-[17.189px] font-normal leading-[100%] tracking-[-0.859px]"
            >
              Nearest
            </button>
            <button
              type="button"
              className="flex justify-center items-center gap-[6.139px] [background:var(--Foundation-Blue-blue-50,#ECEFFE)] px-[12.278px] py-[6.139px] rounded-[14.734px] text-[color:var(--Primary-1,#4461F2)] text-[17.189px] font-normal leading-[100%] tracking-[-0.859px]"
            >
              Most Active
            </button>
            <button
              type="button"
              className="flex justify-center items-center gap-[6.139px] [background:var(--Foundation-Blue-blue-50,#ECEFFE)] px-[12.278px] py-[6.139px] rounded-[14.734px] text-[color:var(--Primary-1,#4461F2)] text-[17.189px] font-normal leading-[100%] tracking-[-0.859px]"
            >
              Most Rated
            </button>
          </div>
        </div>
      </section>

      {/* Recent Section */}
      <section className="space-y-5 w-5/6 mx-auto my-12">
        <h2 className="text-[#562FB9] text-[32px] font-bold leading-[normal]">
          Recents
        </h2>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between gap-10 w-full">
          {RecentData?.map((_, index) => (
            <ServicesCard key={index} />
          ))}
        </div>
      </section>

      {/* Recommended Section */}
      <section className="space-y-5 w-5/6 mx-auto my-12">
        <h2 className="text-[#562FB9] text-[32px] font-bold leading-[normal]">
          Recommended
        </h2>
        <div className="grid grid-cols-4 justify-between gap-10 w-full">
          {RecommendedData?.map((_, index) => (
            <ServicesCard key={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default SellerLists;
