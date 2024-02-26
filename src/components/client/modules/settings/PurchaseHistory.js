"use client";

import React, { useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";

const PurchaseHistory = () => {
  const [Purchase_History, setPurchaseHistory] = useState([]);

  return (
    <div>
      <div className="w-5/6 mx-auto space-y-7 min-h-svh">
        <h1 className="text-black 3xl:text-3xl 2xl:text-2xl xl:text-xl lg:text-lg not-italic font-bold leading-[normal]">
          PURCHASE HISTORY
        </h1>
        <p className="text-black 3xl:text-2xl pb-7 2xl:text-xl xl:text-lg lg:text-base not-italic font-normal leading-[36.09px]">
          All your previous purchases will shown here
        </p>
        <table className="table-auto mt-[2.4rem] w-full divide-y divide-black border-collapse">
          <thead className="">
            <tr className="w-full">
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Section
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Seller name
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Date of Purchese
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Contacted
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Export
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {Purchase_History.length === 0 ? (
              <tr className="flex w-full justify-center absolute inset-x-0 inset-y-10 items-center gap-2">
                <BsExclamationCircleFill className="text-red-500 text-center" />
                No Purchases Yet
              </tr>
            ) : (
              Purchase_History?.map((history, index) => (
                <tr key={index} className="w-full">
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    {index + 1}
                  </td>
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    {history.name}
                  </td>
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    {history.date}
                  </td>
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    {history.contacted.toString()}
                  </td>
                  <td className="flex items-center justify-center">
                    <button
                      type="button"
                      className="flex items-center justify-center my-6 w-full gap-[var(--numberLength,12.547px)] text-[color:var(--Foundation-Blue-blue-500,var(--Primary-1,#4461F2))] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]"
                    >
                      Action <FaAngleRight />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistory;
