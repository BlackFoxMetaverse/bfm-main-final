"use client";

import React, { useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { GrDocumentDownload } from "react-icons/gr";
//import { downloadData } from "@/components/api/download/downloadData";

const ActivityHistory = [];
const PurchaseHistory = [
  {
    name: "Harsh Singh",
    date: "2024, 07 14",
    contacted: true,
  },
  {
    name: "Tanishq Nigam",
    date: "2024, 07 14",
    contacted: true,
  },
  {
    name: "Raunak Pandey",
    date: "2024, 07 14",
    contacted: false,
  },
  {
    name: "Ritik Bhushan",
    date: "2024, 07 14",
    contacted: true,
  },
];

const AdminClientData = ({ name, id }) => {
  const [isDeleting, setDeleting] = useState(false);

  return (
    <main className={`${name}'s_detail h-full pb-10`}>
      <div className="space-y-10 h-full">
        <div className="min-h-[3.2rem] flex items-center shrink-0 bg-[#7F63F4]/10">
          <p className="max-w-[849px] text-[#7F63F4] 3xl:text-[22px] 2xl:text-xl xl:text-lg lg:text-base not-italic font-semibold leading-[54px] mx-8">
            User Management / user profile
          </p>
        </div>
        <div className="w-11/12 space-y-6 mx-auto max-w-[96rem]">
          <p className="text-black 3xl:text-[40px] 2xl:text-3xl xl:text-xl lg:text-lg not-italic font-medium leading-[100%]">
            Client’s Profile
          </p>
          <div className="flex items-center justify-between gap-8 h-[13rem]">
            <div className="max-w-[63.4rem] w-2/3 py-7 bg-white h-full shrink-0 rounded-[1.5rem]">
              <div className="w-5/6 mx-auto h-full">
                <p className="text-black 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]">
                  User Login/Activity History
                </p>
                {ActivityHistory.length !== 0 ? (
                  <div className="w-full h-full flex justify-center gap-2 items-center">
                    <BsExclamationCircleFill className="text-red-600" />
                    <span>No Data</span>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center justify-between w-full h-full">
                    <div className="flex flex-col gap-6">
                      <h3 className="text-black 3xl:text-xl 2xl:text-lg text-base not-italic whitespace-nowrap font-medium leading-[normal]">
                        Account Created
                      </h3>
                      <p className="text-[color:var(--Foundation-Grey-grey-300,#6A6A6A)] text-base not-italic font-medium leading-[normal]">
                        20 Jan, 2023
                      </p>
                    </div>
                    <div className="w-px h-[var(--numberLength,76px)] bg-[#6A6A6A]"></div>
                    <div className="flex flex-col gap-6">
                      <h3 className="text-black 3xl:text-xl 2xl:text-lg text-base not-italic whitespace-nowrap font-medium leading-[normal]">
                        Last Active
                      </h3>
                      <p className="text-[color:var(--Foundation-Grey-grey-300,#6A6A6A)] whitespace-nowrap text-base not-italic font-medium leading-[normal] flex items-center gap-3">
                        <span>10:30 pm</span>
                        <span>22 Jan, 2023</span>
                      </p>
                    </div>
                    <div className="w-px h-[var(--numberLength,76px)] bg-[#6A6A6A]"></div>
                    <div className="flex flex-col gap-6">
                      <h3 className="text-black 3xl:text-xl 2xl:text-lg text-base not-italic whitespace-nowrap font-medium leading-[normal]">
                        Total Tokens Bought
                      </h3>
                      <p className="text-[color:var(--Foundation-Grey-grey-300,#6A6A6A)] text-base not-italic font-medium leading-[normal]">
                        55
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="max-w-[30.5rem] w-1/3 h-full py-5 bg-white shrink rounded-[25px]">
              <div className="w-11/12 mx-auto flex flex-col justify-between items-start h-full">
                <p className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]">
                  Actions
                </p>
                <div className="flex items-end flex-grow gap-2 justify-between w-full">
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed 3xl:px-5 3xl:py-3 2xl:px-4 2xl:py-2 xl:px-3.5 xl:py-2.5 px-2 py-1 rounded-md bg-blue-600 opacity-50 text-white 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed 3xl:px-5 3xl:py-3 2xl:px-4 2xl:py-2 xl:px-3.5 xl:py-2.5 px-2 py-1 rounded-md bg-red-600 opacity-50 text-white 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]"
                  >
                    Suspend{" "}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleting(!isDeleting)}
                    className="3xl:px-5 3xl:py-3 2xl:px-4 2xl:py-2 xl:px-3.5 xl:py-2.5 px-2 py-1 rounded-md bg-red-600 text-white 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[96rem] w-11/12 mx-auto bg-white 3xl:h-[18rem] 2xl:h-[16rem] xl:h-[14rem] lg:h-[9rem] shrink-0 rounded-[20px]">
          <div className="mx-16 h-full flex gap-8 items-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/e5f1/c231/96d9c17181e09c0c069fb92abf5dcd9b?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EfLaN0LvQo~zhvyUN5gwnYKdbHkC2Im~arkgrrCfs278r-s8e7nNMIiFrmFoHxKOWnh1HNq7ueeB3FeITRVyfUuofKinP3lKK~ax4YVUdLUw883imYFo89CAMVs2B-lFstgeMe1ZdTaV8~BC7WO8AIZoocrL2U9vWONLB8sLqDODDJZ75kjFAOe6HgY62HmpENbQSfQvw7f7sPe0c01a-IvsDcI2UYvq07-UJHXCDrE4CkXoH4MOa0RePa0S4NIiprXi-Eazl~2roS5xZyDf2bdQ3D5-Zq1A~uZsiAD3B3wKF-AbyE92czTnL9TVfpzv~OrDnIuG7qVvqMflOa~uhQ__"
              className="flex 3xl:w-[11.17rem] 2xl:w-[9rem] xl:w-[7rem] lg:w-[5rem] aspect-square justify-center items-center shrink-0 rounded-full"
              alt=""
            />
            <div className="space-y-1">
              <p className="text-black 3xl:text-[40px] 2xl:text-3xl xl:text-xl lg:text-lg not-italic font-bold leading-[normal] capitalize">
                {name}
              </p>
              <p className="text-[#696969] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.814px]">
                +91 1234567890
              </p>
              <p className="text-[#696969] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.814px]">
                randomeemail@gmail.com
              </p>
            </div>
            <div className="w-px min-h-[12rem] bg-black"></div>
            <div className="space-y-7">
              <p className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]">
                Location
              </p>
              <div className="inline-flex min-h-[3rem] text-[#784DC7] 3xl:text-3xl 2xl:text-2xl xl:text-xl lg:text-lg bg-[#ECEFFE] justify-center items-center gap-[4.25px] shrink-0 pl-[12.75px] pr-[17px] py-[8.5px] rounded-[25.5px]">
                <MdOutlineLocationOn className="" />
                <p className="2xl:text-xl xl:text-lg lg:text-base">
                  New Delhi, India
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[96rem] w-11/12 bg-white mx-auto min-h-[25.25rem] shrink-0 rounded-[20px]">
          <div className="w-full flex justify-end items-end p-6">
            <button
              // onClick={() =>
              //   downloadData(PurchaseHistory, `purchase-history-of-${name}`)
              // }
              className="flex 3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm justify-center items-center shrink-0 text-[#4461F2]"
            >
              <GrDocumentDownload />
            </button>
          </div>
          <div className="w-11/12 mx-auto pb-14">
            <h1 className="text-black 3xl:text-3xl 2xl:text-2xl xl:text-xl lg:text-lg not-italic font-bold leading-[normal]">
              PURCHASE HISTORY
            </h1>
            <p className="text-black 3xl:text-2xl 2xl:text-xl xl:text-lg lg:text-base not-italic font-normal leading-[36.09px]">
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
              <tbody className="">
                {PurchaseHistory.length === 0 ? (
                  <tr className="flex w-full justify-center items-center gap-2">
                    <BsExclamationCircleFill className="text-red-500 text-center" />
                    No Data
                  </tr>
                ) : (
                  PurchaseHistory?.map((history, index) => (
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
      </div>
      {isDeleting && (
        <div
          // onClick={() => setDeleting(!isDeleting)}
          className="fixed w-full inset-0 h-screen bg-black/50 flex justify-center items-center"
        >
          <div className="flex flex-col aspect-video w-1/2 max-w-[719px] max-h-[265px] gap-10 justify-between items-center pt-[31px] pb-8 px-[65px] rounded-[25.64px] bg-white">
            <h5 className="text-black text-[32px] not-italic font-bold leading-[normal]">
              Delete Account
            </h5>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                setDeleting(!isDeleting);
              }}
              className="flex-grow w-full flex flex-col justify-between items-end"
            >
              <div className="flex w-full items-center gap-2 justify-between">
                <label
                  htmlFor="reason"
                  className="text-black text-2xl not-italic font-bold leading-[normal]"
                >
                  Reason{" "}
                </label>
                <select
                  name="reason"
                  id="reason"
                  className="border border-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] px-1.5 py-0.5 rounded-[5px] border-solid focus:outline-none"
                >
                  <option
                    value=""
                    className="text-[color:var(--Foundation-Grey-grey-100,#BABABA)] text-sm not-italic font-normal leading-[100%]"
                  >
                    Select reason for Deleting the account
                  </option>
                  <option
                    value="fake"
                    className="text-black text-sm not-italic font-normal leading-[100%]"
                  >
                    Account is fake
                  </option>
                  <option
                    value="misbehave"
                    className="text-black text-sm not-italic font-normal leading-[100%]"
                  >
                    User have been recorded as misbehave.
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="rounded px-4 py-2 bg-[#E53935] text-[color:var(--White,#FFF)] text-sm not-italic font-normal leading-[100%] tracking-[-0.7px]"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminClientData;
