"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import instance from "@/utils/axios";
import { BsCheckCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import PreLoader from "@/components/Modules/Preloader/preLoader";

const Register = ({ close, uid }) => {
  const [document, setDocument] = useState(null);
  const [isUniqueEmail, setUniqueEmail] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setDocument(window.document);
  });

  const pathname = usePathname();
  const router = useRouter();

  function checkUniqueEmail(e) {
    const email = e.target.value;
    if (email === "") {
      return;
    }
    var checkTimeout;
    if (checkTimeout) {
      clearTimeout(checkTimeout);
    }
    setFormData({ ...formData, email: email });
    checkTimeout = setTimeout(() => {
      instance
        .get(`/check/email?uid=${uid}&email=${email}`)
        .then((res) => {
          setUniqueEmail(res.data);
        })
        .catch((err) => {
          console.error(err.message);
          setUniqueEmail(false);
        });
    }, 500);
  }

  const handleSubmit = (e) => {
    const token = localStorage.getItem("bfm-client-token");
    console.log(token);
    e.preventDefault();

    instance
      .post("/main/user", formData, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        console.log(response);
        close();
        if (pathname === "/seller") {
          router.push("/seller/form");
          router.refresh();
        } else {
          window.location.reload();
        }
      })
      .catch((err) => console.error(err.message))
      .finally(() => setSubmitting(true));
  };

  console.log(formData);

  return (
    <div className="flex flex-col py-12 w-full space-y-20">
      <div className="flex py-[35px] rounded-[40px] items-center justify-center gap-[69px] shrink-0 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[19px] shrink-0 self-stretch"
        >
          <div className="flex flex-col space-y-4 justify-center">
            <h1 className="text-white text-[32px] not-italic font-bold leading-[normal]">
              Almost Done!
            </h1>
            <p className=" text-white text-center not-italic font-normal leading-[27px]">
              Enter your Details for completion of your account
            </p>
          </div>
          <div className="flex flex-col w-full justify-center items-start gap-[5px]">
            <label
              htmlFor="Username"
              className="text-white text-base font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              Full Name
            </label>
            <input
              type="text"
              name="Username"
              id="Username"
              value={formData.name}
              placeholder="Enter User Name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="flex h-11 items-center gap-[5px] self-stretch bg-white rounded-lg p-3.5 border-solid text-sm font-normal leading-[100%] tracking-[-0.7px] focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-full justify-center items-start gap-[5px]">
            <label
              htmlFor="email"
              className="text-white text-base font-normal leading-[100%] tracking-[-0.8px] capitalize"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={checkUniqueEmail}
              placeholder="Enter Email Address"
              required
              className="flex h-11 items-center gap-[5px] self-stretch bg-white p-3.5 rounded-lg border-solid text-sm font-normal leading-[100%] tracking-[-0.7px] focus:outline-none"
            />
          </div>
          {document?.getElementById("email").value !== "" ? (
            isUniqueEmail ? (
              <div className="flex gap-1.5 items-center w-full text-green-600 xl:text-sm text-xs capitalize">
                <BsCheckCircleFill />
                this email is unique
              </div>
            ) : (
              <div className="flex gap-1.5 items-center w-full text-red-600 xl:text-sm text-xs capitalize">
                <RxCrossCircled />
                this email is already taken
              </div>
            )
          ) : null}
          <div className="flex items-start w-full gap-1">
            <div className="flex w-[16.701px] h-[16.701px] shrink-0">
              <input
                type="checkbox"
                name="legalization"
                id="legalization"
                required
                className="border border-white rounded-md appearance-none size-full object-cover checked:bg-white flex justify-center items-center checked:marker:bg-black checked:after:content-['✔'] checked:after:text-black checked:after:text-xs"
              />
            </div>
            <label
              htmlFor="legalization"
              className="text-white md:text-sm text-[11.628px] not-italic font-normal leading-[100%] tracking-[-0.7px]"
            >
              I’ve read and accept the{" "}
              <Link
                href={"/terms-and-conditions"}
                className="text-white font-bold tracking-wide underline underline-offset-2"
              >
                terms and conditions*
              </Link>
            </label>
          </div>
          <button
            disabled={submitting}
            type="submit"
            className={`${
              submitting ? "opacity-50 cursor-not-allowed" : "opacity-1"
            } gap-[5px] rounded bg-white py-4 w-2/3 flex items-center justify-center text-black text-xl font-normal leading-[100%] tracking-[-1px]`}
          >
            {submitting ? (
              <PreLoader color={"white"} size={20} />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
      <div className="absolute" id="recaptcha"></div>
    </div>
  );
};

export default Register;
