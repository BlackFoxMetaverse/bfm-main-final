"use client";

import React, { useState } from "react";
import loginplaceholder from "../../../../public/login.svg";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import s3ImageUplaod from "@/utils/imageUploader";

const Register = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  async function handleRegister() {
    try {
      const userDetails = sessionStorage.getItem("userDetails");
      const token = localStorage.getItem("bfm-user-token");
      const res = await axios.post(
        "/auth/register",
        {
          uid: userDetails.uid,
          image: s3ImageUplaod(imageFile),
          name: name,
          userName: username,
          email: email,
          phone_number: userDetails.phone_number,
          profession: profession,
        },
        {
          headers: {
            idtoken: token,
          },
        }
      );
      return res;
    } catch (error) {
      console.log("register-axios-error: ", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister()
      .then((res) => {
        console.log("register-res: ", res);
        router.push("/profile/editProfile");
      })
      .catch((e) => console.log("error: ", e));
  };

  return (
    <main className="flex max-w-[1512px] max-h-[982px] h-screen justify-center items-center lg:px-[268px] lg:py-[107px] overflow-hidden">
      <div className="flex max-w-[976px] max-h-[768px] items-center justify-between gap-[148px] shrink-0">
        <div className="flex-[1_0_0] self-stretch lg:flex hidden justify-center items-center overflow-hidden w-full aspect-[9/16] shrink-0">
          <Image
            src={loginplaceholder}
            alt=""
            className="w-full h-full object-cover shrink-0"
          />
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-start gap-[23px] px-5 self-stretch"
        >
          <div className="flex items-center gap-5">
            <div className="flex justify-center items-center gap-[13.451px] rounded-[13.451px]">
              {image ? (
                <label htmlFor="imageInput" className="w-full h-full">
                  <img
                    src={image}
                    alt=""
                    className="flex w-[94px] aspect-square items-start rounded-[102px] border-4 border-black/50"
                  />
                  <input
                    type="file"
                    id="imageInput"
                    name="imageInput"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <label htmlFor="imageInput" className="w-full h-full">
                  <FaUserAlt className="text-8xl flex aspect-square items-start rounded-[102px] border-4 border-black/50" />
                  <input
                    type="file"
                    id="imageInput"
                    name="imageInput"
                    className="hidden"
                    required={false}
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            <button className="flex justify-center bg-[#4461F2] items-center gap-2.5 px-[21px] py-2.5 rounded-lg text-white text-xl not-italic font-semibold leading-[normal]">
              Upload Profile
            </button>
          </div>
          <div className="flex flex-col items-start gap-2 self-stretch">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name"
              className="flex w-[344px] items-center gap-1 px-5 py-4 focus:outline-none rounded-xl bg-black/20 text-[color:var(--mono-90,#18181B)] text-base not-italic font-medium leading-6"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              className="flex w-[344px] items-center gap-1 px-5 py-4 focus:outline-none rounded-xl bg-black/20 text-[color:var(--mono-90,#18181B)] text-base not-italic font-medium leading-6"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
              className="flex w-[344px] items-center gap-1 px-5 py-4 focus:outline-none rounded-xl bg-black/20 text-[color:var(--mono-90,#18181B)] text-base not-italic font-medium leading-6"
            />
            <select
              name=""
              id=""
              required
              className="flex w-[344px] items-center gap-1 px-5 py-4 focus:outline-none rounded-xl bg-black/20 text-[color:var(--mono-90,#18181B)] text-base not-italic font-medium leading-6"
              onChange={(e) => setProfession(e.target.value)}
            >
              <option className="bg-black/20 px-5 py-4" value="Profession">
                Profession
              </option>
              <option
                className="bg-black/20 px-5 py-4"
                value="Frontend Developer"
              >
                Frontend Developer
              </option>
              <option
                className="bg-black/20 px-5 py-4"
                value="Backend Developer"
              >
                Backend Developer
              </option>
              <option className="bg-black/20 px-5 py-4" value="Human Resources">
                Human Resources
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="flex bg-[#0858F7] justify-center items-center gap-2 self-stretch px-5 py-4 rounded-xl text-[color:var(--mono-0,#FFF)] text-center text-base not-italic font-bold leading-6"
          >
            View Profile
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
