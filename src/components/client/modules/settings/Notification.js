"use client";

import React, { useState } from "react";

const Notification = () => {
  const [inboxMobile, setInboxMobile] = useState(false);
  const [inboxEmail, setInboxEmail] = useState(false);

  const [interestMobile, setInterestMobile] = useState(false);
  const [interestEmail, setInterestEmail] = useState(false);

  const [ratingMobile, setRatingMobile] = useState(false);
  const [ratingEmail, setRatingEmail] = useState(false);

  const [accountMobile, setAccountMobile] = useState(false);
  const [accountEmail, setAccountEmail] = useState(false);

  const formData = {
    inbox: { mobile: inboxMobile, email: inboxEmail },
    interest: { mobile: interestMobile, email: interestEmail },
    rating: { mobile: ratingMobile, email: ratingEmail },
    account: { mobile: accountMobile, email: accountEmail },
  };

  console.log(formData);

  return (
    <div className="w-5/6 mx-auto space-y-12">
      <h1 className="text-black text-ellipsis 2xl:text-2xl xl:text-xl lg:text-lg text-base font-bold leading-[normal]">
        NOTIFICATIONS
      </h1>
      <table className="table-auto w-full border-separate border-spacing-y-5">
        <thead className="w-full">
          <tr className="">
            <th className="text-black text-left 2xl:text-lg md:text-base text-sm w-1/3 font-bold leading-[27px]">
              Type
            </th>
            <th className="text-black text-left 2xl:text-lg md:text-base text-sm w-1/6 font-bold leading-[27px]">
              Mobile
            </th>
            <th className="text-black text-left 2xl:text-lg md:text-base text-sm font-bold leading-[27px]">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="text-black 2xl:text-lg md:text-base text-sm leading-[27px] w-1/3">
              Inbox Messages
            </td>
            <td className="px-5">
              <input
                type="checkbox"
                name="inboxMobile"
                id="inboxMobile"
                value={inboxMobile}
                onChange={(e) => setInboxMobile(e.target.checked)}
                required
                className="border border-[#925ff0] rounded appearance-none w-4 aspect-square object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
              />
            </td>
            <td className="px-5">
              <input
                type="checkbox"
                name="inboxEmail"
                id="inboxEmail"
                value={inboxEmail}
                onChange={(e) => setInboxEmail(e.target.checked)}
                required
                className="border border-[#925ff0] rounded appearance-none w-4 aspect-square object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
              />
            </td>
          </tr>
          <tr className="">
            <td className="text-black 2xl:text-lg md:text-base text-sm leading-[27px] w-1/3">
              Interest Updates
            </td>
            <td className="px-5">
              <input
                type="checkbox"
                name="inboxMobile"
                id="inboxMobile"
                value={interestMobile}
                onChange={(e) => setInterestMobile(e.target.checked)}
                required
                className="border border-[#925ff0] rounded appearance-none w-4 aspect-square object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
              />
            </td>
            <td className="px-5">
              <input
                type="checkbox"
                name="inboxEmail"
                id="inboxEmail"
                value={interestEmail}
                onChange={(e) => setInterestEmail(e.target.checked)}
                required
                className="border border-[#925ff0] rounded appearance-none w-4 aspect-square object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
              />
            </td>
          </tr>
          <tr className="">
            <td className="text-black 2xl:text-lg md:text-base text-sm leading-[27px] w-1/3">
              Rating Reminders
            </td>
            <td className="px-5">
              <input
                type="checkbox"
                name="inboxMobile"
                id="inboxMobile"
                value={ratingMobile}
                onChange={(e) => setRatingMobile(e.target.checked)}
                required
                className="border border-[#925ff0] rounded appearance-none w-4 aspect-square object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
              />
            </td>
            <td className="px-5">
              <input
                type="checkbox"
                name="inboxEmail"
                id="inboxEmail"
                value={ratingEmail}
                onChange={(e) => setRatingEmail(e.target.checked)}
                required
                className="border border-[#925ff0] rounded appearance-none w-4 aspect-square object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
              />
            </td>
          </tr>
          <tr className="">
            <td className="text-black 2xl:text-lg md:text-base text-sm leading-[27px] w-1/3">
              My Account
            </td>
            <td className="px-5">
              <input
                type="checkbox"
                name="inboxMobile"
                id="inboxMobile"
                value={accountMobile}
                onChange={(e) => setAccountMobile(e.target.checked)}
                required
                className="border border-[#925ff0] rounded appearance-none w-4 aspect-square object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
              />
            </td>
            <td className="px-5">
              <input
                type="checkbox"
                name="inboxEmail"
                id="inboxEmail"
                value={accountEmail}
                onChange={(e) => setAccountEmail(e.target.checked)}
                required
                className="border border-[#925ff0] rounded appearance-none w-4 aspect-square object-cover checked:bg-[#925ff0] flex justify-center items-center checked:marker:bg-white checked:after:content-['✔'] checked:after:text-white checked:after:text-xs"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="submit"
        className="inline-flex justify-center items-center gap-[5px] rounded [background:var(--Foundation-Green-green-300,#73A876)] px-4 py-2 text-[color:var(--White,#FFF)] text-sm font-normal leading-[100%] tracking-[-0.7px]"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Notification;
