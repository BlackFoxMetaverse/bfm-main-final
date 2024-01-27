import React from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";

const ActivityHistory = [];
const PurchaseHistory = ["", "", "", "", "", "", ""];

const AdminClientData = ({ name, id }) => {
  return (
    <main className={`${name}'s_detail h-full pb-10`}>
      <div className="space-y-10 h-full">
        <div className="max-w-[1603px] min-h-[3.2rem] flex items-center shrink-0 bg-[#7F63F4]/10">
          <p className="max-w-[849px] text-[#7F63F4] 3xl:text-[22px] 2xl:text-xl xl:text-lg lg:text-base not-italic font-semibold leading-[54px] mx-8">
            User Management / user profile
          </p>
        </div>
        <div className="w-11/12 space-y-6 mx-auto">
          <p className="text-black 3xl:text-[40px] 2xl:text-3xl xl:text-xl lg:text-lg not-italic font-medium leading-[100%]">
            Client’s Profile
          </p>
          <div className="flex items-center gap-8 h-[13rem]">
            <div className="max-w-[63.4rem] w-2/3 py-7 bg-white h-full shrink-0 rounded-[1.5rem]">
              <div className="w-5/6 mx-auto h-full">
                <p className="text-black 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]">
                  User Login/Activity History
                </p>
                {ActivityHistory.length === 0 ? (
                  <div className="w-full h-full flex justify-center gap-2 items-center">
                    <BsExclamationCircleFill className="text-red-600" />
                    <span>No Data</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="max-w-[30.5rem] w-1/3 h-full py-5 bg-white shrink rounded-[25px]">
              <div className="w-5/6 mx-auto flex flex-col justify-between items-start h-full">
                <p className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]">
                  Actions
                </p>
                <div className="flex items-end flex-grow justify-between w-full">
                  <button
                    type="button"
                    className="text-black 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-black 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]"
                  >
                    Suspend{" "}
                  </button>
                  <button
                    type="button"
                    className="text-black 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]"
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
          <div className="w-11/12 mx-auto py-14">
            <h1 className="text-black 3xl:text-3xl 2xl:text-2xl xl:text-xl lg:text-lg not-italic font-bold leading-[normal]">
              PURCHASE HISTORY
            </h1>
            <p className="text-black 3xl:text-2xl 2xl:text-xl xl:text-lg lg:text-base not-italic font-normal leading-[36.09px]">
              All your previous purchases will shown here
            </p>
            <table className="table-auto mt-[4.4rem] w-full">
              <thead>
                <tr className="flex items-center gap-4 justify-between pt-[0.75rem] px-[0.75rem]">
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Section
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Seller name
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Date of Purchese
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pr-10 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Contacted
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Export
                  </th>
                </tr>
              </thead>
              <hr className="w-full h-px bg-black my-4" />
              <tbody className="">
                {PurchaseHistory.length === 0 ? (
                  <tr className="flex w-full h-full justify-center items-center gap-2">
                    <BsExclamationCircleFill className="text-red-500" />
                    No Data
                  </tr>
                ) : (
                  PurchaseHistory?.map((history, index) => (
                    <tr key={index} className="flex w-full gap-4 justify-between items-center my-[1.5rem] pt-[0.75rem] px-[0.75rem]">
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        {index + 1}
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        Harsh Singh
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        23.11.23
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        Yes
                      </td>
                      <td className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                        <button
                          type="button"
                          className="flex justify-center items-center gap-[var(--numberLength,12.547px)] text-[color:var(--Foundation-Blue-blue-500,var(--Primary-1,#4461F2))] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]"
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
    </main>
  );
};

export default AdminClientData;
