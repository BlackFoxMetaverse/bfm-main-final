"use client";

import React from "react";
import { BsCheck } from "react-icons/bs";

const ProposalModal = ({ inputData, handleSubmit, setInputData, sent }) => {
  return (
    <div className="w-full h-screen fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <form
        action=""
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col p-6 bg-white rounded-xl border border-gray-300 w-1/2 mx-auto"
      >
        <header className="">
          <h1 className="text-3xl font-semibold leading-9 text-gray-800">
            Request for Contact Information
          </h1>
          <p className="text-xs leading-5 mt-2">
            Please specify the reason to get the contact information
          </p>
        </header>
        <div className="mt-9">
          <label htmlFor="subject" className="text-gray-500 block">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={inputData?.subject}
            onChange={(e) =>
              setInputData({ ...inputData, subject: e.target.value })
            }
            required
            placeholder="Write your purpose of contact"
            className="px-3.5 py-3 mt-1 block w-full capitalize rounded-lg border border-solid border-gray-300 focus:outline-none"
          />
        </div>
        <div className="mt-9">
          <label htmlFor="feedback" className="text-gray-500 block">
            Additional feedback
          </label>
          <textarea
            type="text"
            name="feedback"
            id="feedback"
            placeholder="Please describe your purpose in brief"
            value={inputData?.feedback}
            onChange={(e) =>
              setInputData({ ...inputData, feedback: e.target.value })
            }
            rows={4}
            className="px-3.5 py-3 mt-1 block w-full capitalize rounded-lg border border-solid border-gray-300 focus:outline-none resize-none"
          />
        </div>
        <button
          type="submit"
          className={`justify-center items-center flex px-10 py-2 mt-6 text-xl rounded ${sent ? "bg-green-400" : "bg-black"} text-white font-semibold leading-6 shadow-sm`}
          tabIndex="0"
        >
          {sent ? (
            <div className="flex gap-2 w-full capitalize justify-center items-center">
              <BsCheck className="text-2xl" />
              sent
            </div>
          ) : (
            "Send Proposal"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProposalModal;
