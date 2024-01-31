"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { CiFacebook, CiHeart, CiLocationOn } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaAngleRight, FaHeart, FaYoutube } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import dummySeller from "../../../../assets/dummySeller.png";
const ActivityHistory = [];
const PurchaseHistory = ["", "", "", "", "", "", ""];

const SellerData = ({ name, id }) => {
  console.log("id", id);
  const [userData, setUserData] = useState(null);
  const route = useRouter();
  console.log(userInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://form.blackfoxmetaverse.io/api/admin/getUserProfile?uid=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              admintoken:
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NjI5NzU5NmJiNWQ4N2NjOTc2Y2E2YmY0Mzc3NGE3YWE5OTMxMjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmZtLWxvY2F0aW9uIiwiYXVkIjoiYmZtLWxvY2F0aW9uIiwiYXV0aF90aW1lIjoxNzA2NzAwODE4LCJ1c2VyX2lkIjoiSzN0NWhKTUNZR1Y3dEhuODFYQUo3bzJxaWVCMiIsInN1YiI6IkszdDVoSk1DWUdWN3RIbjgxWEFKN28ycWllQjIiLCJpYXQiOjE3MDY3MDA4MTgsImV4cCI6MTcwNjcwNDQxOCwicGhvbmVfbnVtYmVyIjoiKzkxODcwOTM2MDU0MyIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxODcwOTM2MDU0MyJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.CQtCBcFR_BU_JAzXeCSTI8ZcvWYmAo3OQt1eic-agEFLW0Z6gvGPdoMg61_1PTgXi4hwOItKWbV6JPKdwS0xdvVqRVZ_OR10gsfqnJoc-lcX7XZVhMsdM6p5lSG5JrSdf1i0W1Bzdn_-JsavS_ftYMcEK5DwLM9zlbZ9kQpJUASKHlut801hnEWw7RddJ7LhRRpFjKETSotqRYtnWF06c9uWsFHMpdvCZoKiVNaHFkJJtEz90YJh-Wr-qvbv5Veq-88S6HdGLD4Pgy3YsjxWmnLAGiKnDNR3P-w955ocVkFbIug99Psf31cJut4if_aPvpriIiYngKgRiEKGUue0ng",
            },
          }
        );
        const data = await response.json();
        console.log(data.userProfile);
        setUserData(data.userProfile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

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
            Seller Profile
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
                    className="text-white px-4 py-2 rounded bg-[#8295F6] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-white px-4 py-2 rounded bg-[#EE7A78]  3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]"
                  >
                    Suspend{" "}
                  </button>
                  <button
                    type="button"
                    className="text-white px-4 py-2 rounded 3xl:text-2xl bg-[#E53935] 2xl:text-xl xl:text-base not-italic font-bold leading-[normal]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-11/12 gap-5 mx-auto shrink-0 rounded-[20px]">
          <div className="w-1/3 space-y-5 ">
            <div className="w-full overflow-hidden px-5 p-4 bg-white gap-8 rounded-[25.636px] items-center">
              <div className=" p-4 bg-white flex gap-8 rounded-[25.636px] items-center">
                <img
                  src="https://s3-alpha-sig.figma.com/img/e5f1/c231/96d9c17181e09c0c069fb92abf5dcd9b?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EfLaN0LvQo~zhvyUN5gwnYKdbHkC2Im~arkgrrCfs278r-s8e7nNMIiFrmFoHxKOWnh1HNq7ueeB3FeITRVyfUuofKinP3lKK~ax4YVUdLUw883imYFo89CAMVs2B-lFstgeMe1ZdTaV8~BC7WO8AIZoocrL2U9vWONLB8sLqDODDJZ75kjFAOe6HgY62HmpENbQSfQvw7f7sPe0c01a-IvsDcI2UYvq07-UJHXCDrE4CkXoH4MOa0RePa0S4NIiprXi-Eazl~2roS5xZyDf2bdQ3D5-Zq1A~uZsiAD3B3wKF-AbyE92czTnL9TVfpzv~OrDnIuG7qVvqMflOa~uhQ__"
                  className="flex 3xl:w-[9.17rem] 2xl:w-[7rem] xl:w-[5rem] lg:w-[3rem] aspect-square justify-center items-center shrink-0 rounded-full"
                  alt=""
                />
                <div className="space-y-1">
                  <p className="text-black  whitespace-pre-wrap break-words 3xl:text-[20px] 2xl:text-xl xl:text-base lg:text-medium not-italic font-bold leading-[normal] capitalize">
                    {name}
                  </p>

                  {/* <p className="flex text bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]">
                    Available
                  </p> */}
                </div>
              </div>
              <div className="">
                {userData?.tags?.map((tag, index) => (
                  <p
                    key={index}
                    className="text-[#696969] 3xl:text-xl 2xl:text-base xl:text-base not-italic font-normal leading-[36.814px]"
                  >
                    {tag}
                  </p>
                ))}
              </div>

              <div className=" px-5 space-y-9">
                <div className=" flex justify-center text-gray-600 items-center  bg-gray-200 gap-[4.866px] pl-[12.164px] pr-[9.732px] py-[6.082px] rounded-full">
                  Faridabad, Haryana <CiLocationOn />
                </div>
                <div className="space-y-2">
                  <p className="self-stretch  text-[#696969] text-xl not-italic font-bold leading-[27px]">
                    Phone Number
                  </p>
                  <p className="self-stretch text-[#696969] text-lg not-italic font-normal leading-[27px]">
                    +91 98238739471
                  </p>
                </div>
                <div className="self-stretch space-y-4 text-[#696969] text-xl not-italic font-bold leading-[27px]">
                  <p className="self-stretch  text-[#696969] text-xl not-italic font-bold leading-[27px]">
                    Email Address
                  </p>
                  <p className="self-stretch text-[#696969] text-lg not-italic font-normal leading-[27px]">
                    ritikbhushanmain@gmail.com
                  </p>
                </div>
                <div className="self-stretch space-y-4 text-[#696969] text-xl not-italic font-bold leading-[27px]">
                  <p>Social Media</p>
                  <div className="flex gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <FaInstagram />
                    </div>
                    <div className="bg-gray-100 p-2 rounded-full">
                      <CiFacebook />
                    </div>
                    <div className="bg-gray-100 p-2 rounded-full">
                      <FaYoutube />
                    </div>
                  </div>
                </div>
                <div className="self-stretch space-y-4 text-[#696969] text-xl not-italic font-bold leading-[27px]">
                  <p className="self-stretch  text-[#696969] text-xl not-italic font-bold leading-[27px]">
                    Rating
                  </p>
                  <div className="flex gap-4">
                    <FaHeart className="text-red-500" />
                    <FaHeart className="text-red-500" />
                    <FaHeart className="text-red-500" />
                    <FaHeart className="text-red-100" />
                    <FaHeart className="text-red-100" />
                    <p className=" text-gray-500">3022</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-5 space-y-5 overflow-hidden p-4 bg-white gap-8 rounded-[25.636px] items-center">
              <div className="flex justify-center items-center w-full">
                <select className="p-2 bg-transparent outline-none shrink-0 border-blue-600 text-blue-600  px-[20px]  rounded-[15px] border-[1.5px] border-solid">
                  <option value="Action order">Action order</option>
                </select>
              </div>
              <p className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] text-xl not-italic font-bold leading-[normal]">
                Active Order : 0
              </p>
            </div>
          </div>
          <div className="flex w-2/3 space-x-10 bg-white p-5 rounded-[20px]">
            <div className="w-[70%]  space-y-8">
              {/* <div>
                <div className=" shrink-0 text-[color:var(--Black,#000)] text-[40.35px] not-italic font-semibold leading-[140%] tracking-[-0.807px]">
                  Galactic skull Luminescence
                </div>
              </div> */}
              <div>
                <p className="shrink-0 text-[color:var(--Davys-Grey,#4D4D4D)] text-[15.413px] not-italic font-normal leading-[160%]">
                  Design a futuristic 3D skeleton model with a dynamic RGB
                  lighting system set against a captivating space-themed
                  background. Craft the skeleton to have a sleek, futuristic
                  aesthetic, incorporating intricate details and streamlined
                  features. Implement an RGB lighting scheme that pulsates or
                  transitions smoothly across the skeleton, creating an engaging
                  visual effect. Ensure compatibility with real-time rendering
                  engines to maximize interactivity. The space-themed background
                  should complement the futuristic theme, with stars, nebulae,
                  or cosmic elements. Prioritize a balance between creativity
                  and functionality, delivering a visually stunning 3D model
                  ready for use in various digital or multimedia applications.
                </p>
              </div>
              <div className="border w-full"></div>
              <div className="flex gap-3">
                <p className="flex text-green-600 bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]">
                  Available
                </p>
                <p className="flex text-green-600 bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]">
                  Available
                </p>
                <p className="flex text-green-600 bg-gray-200 text-xs bg- justify-center items-center pl-[7.452px] pr-[6.548px] pt-[3.726px] pb-[4.274px] rounded-[8.943px]">
                  Available
                </p>
              </div>
              <div className="flex gap-8">
                <div className="flex gap-1 justify-center items-center ">
                  <CiHeart />
                  <p>3,245</p>
                </div>
                <div>
                  <p className="text-[color:var(--Davys-Grey,#4D4D4D)] text-[13.211px] not-italic font-bold leading-[160%]">
                    Sep 12, 2021
                  </p>
                </div>
              </div>
            </div>
            <div className=" grid grid-cols-2 w-full gap-2 ">
              {/* <Image className="w-12 h-12" src={dummySeller} alt="" /> */}
              <Image className="w-[100%] h-[100%]" src={dummySeller} alt="" />
              <Image className="w-[100%] h-[100%]" src={dummySeller} alt="" />
              <Image className="w-[100%] h-[100%]" src={dummySeller} alt="" />
              <Image className="w-[100%] h-[100%]" src={dummySeller} alt="" />
              <Image className="w-[100%] h-[100%]" src={dummySeller} alt="" />
              <Image className="w-[100%] h-[100%]" src={dummySeller} alt="" />
            </div>
          </div>
        </div>
        <div className="max-w-[96rem] w-11/12 bg-white mx-auto min-h-[25.25rem] shrink-0 rounded-[20px]">
          <div className="w-11/12 mx-auto py-14">
            <div className="flex-col text-center justify-center items-center">
              <h1 className="text-black 3xl:text-3xl 2xl:text-2xl xl:text-xl lg:text-lg not-italic font-bold leading-[normal]">
                Priority Orders
              </h1>
              {/* <table className="table-auto  w-full">
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
              </table> */}
            </div>
            <table className="table-auto mt-9 w-full">
              <thead>
                <tr className="flex items-center gap-4 justify-between pt-[0.75rem] px-[0.75rem]">
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Section
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Buyer
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Gig
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] pr-10 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Due On
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Total
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Note
                  </th>
                  <th className="text-[color:var(--Foundation-Grey-grey-400,#4D4D4D)] 3xl:text-2xl 2xl:text-xl xl:text-base not-italic font-normal leading-[36.09px]">
                    Status
                  </th>
                </tr>
              </thead>
              <hr className="w-full h-px bg-black my-4" />
              <tbody className=" flex-col justify-center items-center">
                {PurchaseHistory.length === 0 ? (
                  <tr className="flex w-full h-full justify-center items-center gap-2">
                    <BsExclamationCircleFill className="text-red-500" />
                    No Data
                  </tr>
                ) : (
                  PurchaseHistory?.map((history, index) => (
                    <tr
                      key={index}
                      className="flex w-full gap-4 justify-between items-center my-[1.5rem] pt-[0.75rem] px-[0.75rem]"
                    >
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
                        Yes
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

export default SellerData;
