"use client";

import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import Toast from "@/components/Modules/Toast/Toast";

const Accounts = ({ userData }) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;
  const [deleteMessage, setDeleteMessage] = useState({
    message: "",
  });
  const [showModal, setShowModal] = useState({});
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setNewUserData({
      name: userData?.name,
      email: userData?.email,
    });
  }, [userData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("bfm-client-token");
      const res = await instance.put("/main/user", newUserData, {
        headers: {
          token: token,
        },
      });
      if (res.status === 200) {
        setShowModal({
          type: "success",
          message: "Profile Updated Successfully",
        });
        setTimeout(() => {
          setShowModal({});
        }, 6000);
      }
    } catch (error) {
      console.error(error);
      setShowModal({ type: "error", message: "Something went wrong" });
      setTimeout(() => {
        setShowModal({});
      }, 6000);
    }
  }

  const handleAccountDelete = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("bfm-client-token");
      const response = await instance.delete("/main/user", {
        data: { message: deleteMessage.message }, // Request body
        headers: {
          token: token, // Custom headers
        },
      });

      setShowModal({
        type: "success",
        message: "Profile Deleted Successfully",
      });
      setTimeout(() => {
        setShowModal({});
        router.push("/");
      }, 6000);
    } catch (error) {
      console.error(error?.response?.data?.message);
      setShowModal({ type: "error", message: "Something went wrong" });
      setTimeout(() => {
        setShowModal({});
      }, 6000);
    }
  };

  return (
    <div className="w-5/6 h-full mx-auto">
      {showModal?.type === "success" && <Toast {...showModal} />}
      {showModal?.type === "error" && <Toast {...showModal} />}

      <div className="w-full space-y-12">
        <div className="flex flex-col lg:w-3/4 w-full items- gap-[1.5rem]">
          <div className="flex flex-col self-stretch text-black lg:whitespace-nowrap">
            <div className="w-full text-4xl font-bold max-md:max-w-full">
              Account
            </div>
            {!userData?.isSeller && (
              <div className="self-start mt-4 text-lg leading-7">
                Please provide your professional information below.{" "}
              </div>
            )}
          </div>
        </div>
        {!userData?.isSeller && (
          <form
            action=""
            method="post"
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-7 w-full justify-between items-center"
          >
            <div className="flex justify-between items-center w-full gap-10">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="text-gray-700 lg:w-full lg:flex-1 mb-2 2xl:text-xl xl:text-md lg:text-lg text-base  leading-[normal]"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full flex flex-col justify-center items-start gap-1.5  [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
                  value={newUserData.name}
                  onChange={handleFormChange}
                  placeholder="Ritik Bhushan"
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-10">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="text-gray-700 lg:w-full lg:flex-1 mb-1/2 2xl:text-xl xl:text-md lg:text-lg text-base  leading-[normal]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full flex flex-col justify-center items-start gap-1.5  [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
                  value={newUserData.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex justify-end col-span-2 items-center w-full gap-10">
              <div className="flex flex-col">
                <button className="justify-center px-8 py-4 text-xl tracking-tighter leading-5 text-white whitespace-nowrap bg-indigo-500 rounded font-[450]">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
        <div className="flex flex-col px-5 text-sm leading-4 text-black max-w-[422px]">
          <div className="w-full text-3xl text-neutral-900">
            Account Deactivation
          </div>
          <div className="mt-6 w-full text-lg leading-7 font-[450]">
            What happens when you deactivate your account?
          </div>
          <div className="w-full">
            <br />
            Your profile and won&apos;t be shown on BFM anymore.
          </div>
          <div className="w-full tracking-tighter">
            <br />
            Active orders will be cancelled.
          </div>
          <div className="w-full tracking-tighter">
            <br />
            You won&apos;t be able to re-activate your Gigs.
          </div>
        </div>
        <form
          onSubmit={handleAccountDelete}
          action=""
          className="w-full space-y-10"
        >
          <div className="w-full spacey-y-2  px-5 text-sm lg:flex-row justify-between items-start gap-5">
            <label
              htmlFor="reason"
              className="text-lg tracking-tighter leading-5 capitalize max-w-[172px] text-zinc-800"
            >
              I&apos;m leaving because...
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={deleteMessage.message}
              onChange={(e) =>
                setDeleteMessage({ ...deleteMessage, message: e.target.value })
              }
              className=" w-full flex flex-col justify-center items-start gap-1.5  [background:var(--White,#FFF)] focus:outline-none p-2.5 rounded-lg border-solid"
              placeholder="Describe the reason of leaving."
            />
          </div>
          <div className="flex justify-end items-end w-full">
            <button
              type="submit"
              className="justify-center px-8 py-4 text-xl tracking-tighter leading-5 text-white whitespace-nowrap rounded bg-neutral-900 font-[450]"
            >
              Deactivate Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Accounts;
