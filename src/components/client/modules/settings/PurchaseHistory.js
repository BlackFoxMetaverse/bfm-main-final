"use client";

import Toast from "@/components/Modules/Toast/Toast";
import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import Moment from "react-moment";

const PurchaseHistory = () => {
  const [Purchase_History, setPurchaseHistory] = useState([]);
  const [error, setError] = useState({});

  async function fetchTransactions() {
    try {
      const token = localStorage.getItem("bfm-client-token");
      const response = await instance.get("/main/transations", {
        headers: {
          token: token,
        },
      });

      setPurchaseHistory(response?.data?.data);
    } catch (error) {
      console.error(error?.response?.data);
      setError({
        type: "error",
        message: "Login again to get purchase history",
      });
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  console.log(Purchase_History);

  return (
    <div>
      {error?.type === "error" && <Toast {...error} />}
      <div className="w-5/6 mx-auto space-y-7 min-h-svh">
        <h1 className="text-black 3xl:text-3xl 2xl:text-2xl xl:text-xl lg:text-lg not-italic font-bold leading-[normal]">
          PURCHASE HISTORY
        </h1>
        <p className="text-black 3xl:text-2xl pb-7 2xl:text-xl xl:text-lg lg:text-base not-italic font-normal leading-[36.09px]">
          All your previous purchases will shown here
        </p>
        <table className="table-auto mt-[2.4rem] w-full divide-y overflow-x-auto shrink-0 divide-black border-collapse">
          <thead className="">
            <tr className="w-full">
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 whitespace-nowrap 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Section
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 whitespace-nowrap 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Reason
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 whitespace-nowrap 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Seller name
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 whitespace-nowrap 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Date of Purchase
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 whitespace-nowrap 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Token Before
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 whitespace-nowrap 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                Token After
              </th>
              <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pb-4 whitespace-nowrap 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]"></th>
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
                <tr key={index} className="w-full h-10">
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    {index + 1}
                  </td>
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] capitalize text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    {history?.cause?.toLowerCase()}
                  </td>
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    {history?.uid?.slice(0, 10) + "..."}
                  </td>
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    <Moment format="DD MMM YYYY">{history?.date_time}</Moment>
                  </td>
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    {history?.token_before}
                  </td>
                  <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-center 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    {history?.token_after}
                  </td>
                  <td className="flex items-center justify-center">
                    {/* history */}
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
