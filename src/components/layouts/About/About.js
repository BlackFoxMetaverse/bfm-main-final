import React from 'react'
import logo from "../../../assets/light_logo.svg";
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowDownLong } from "react-icons/fa6";

const About = () => {
  return (
    <main className="w-5/6 mx-auto my-14">
      <div className="flex w-full h-full flex-col justify-center items-start gap-[76px] shrink-0">
        {/* About Header */}
        <div className="flex justify-between w-full items-center gap-5 backdrop-blur-[16.25px] px-[39px] py-[22px] rounded-[35px] bg-white/40">
          <div className="flex justify-center items-center">
            <Image src={logo} alt="" className="w-full h-full object-cover" />
          </div>
          <p className="text-[color:var(--Primary-blue,#FFF)] text-2xl not-italic font-bold leading-[normal]">
            Career Connect: Build Your Future with BFM
          </p>
          <Link
            target="_blank"
            href={"https://www.blackfoxmetaverse.in/about-4"}
            className="flex justify-center items-center gap-[5px] px-8 py-4 rounded-[52px] bg-[#212121] text-[color:var(--White,var(--Primary-blue,#FFF))] text-xl not-italic font-normal leading-[100%] tracking-[-1px]"
          >
            About Us
          </Link>
        </div>
        <div className="flex w-full flex-col items-end gap-[17px] backdrop-blur-[16.25px] px-16 py-10 rounded-[35px] bg-white/40">
          <div className="flex flex-col items-start gap-[18px]">
            <h2 className="text-[color:var(--Primary-blue,#FFF)] text-5xl not-italic font-bold leading-[normal]">
              What is this about?
            </h2>
            <p className="max-w-[1506px] text-[color:var(--Primary-blue,#FFF)] text-lg not-italic font-normal leading-[27px]">
              Welcome to Career Connect, your gateway to exciting opportunities!
              Whether you aspire to kickstart your freelancing journey or
              explore internship possibilities, BFM is here for you.
            </p>
            <p className="max-w-[1503px] text-[color:var(--Primary-blue,#FFF)] text-lg not-italic font-normal leading-[27px]">
              This isn't just a form – it's your canvas to create a
              comprehensive user profile that aligns with your ambitions. Tell
              us about your skills, aspirations, and preferences, and let's
              embark on this journey together.
            </p>
          </div>
          <Link href={"/auth/login"} className="flex justify-center items-center gap-[5px] px-8 py-4 rounded-[52px] text-black text-xl not-italic font-normal leading-[100%] tracking-[-1px] bg-white">
            Join The Community of future Leader and Innovators
          </Link>
        </div>
        <div className="flex w-full h-full items-start gap-[30px] shrink-0 self-stretch">
          <div className="flex w-1/3 aspect-[3/2] flex-col justify-center items-center gap-9 self-stretch backdrop-blur-[16.25px] rounded-[35px] overflow-hidden">
            <img
              src="https://s3-alpha-sig.figma.com/img/0e64/82ce/2157b7db5dfbceeafc76a63fb5b9178e?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QVARb6QQYyl8pJcCQC3RwBvk4tnmqJqxE-hQeQOwjMcpD59yP2YaUP02wPtWDCAdkklKuoQHhx2u5f8RRYFy9dhK2NaYVlCDyUTnEScdneaHgFIRvCieet9kD54L~VAjy3dRg2vZgHC3h0fPfMJtUeldFKAqLBO3c~A3e3xINokL6h5w7Di0VjDxvt07I1YumM6KjkNp1fmTSvHYiIFnwgrktbPyiQAAzjyT6AKXU7txOSXUeAXfTyhUK48xatHwBlHbdPXawYwZyIRpAZhdQ57FlJsAogA4Jm7buH9-lVZgBLomWG-5rnYVmviRiMXgIp1LDguh0jnNhkEG0bZ5zg__"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-9 flex-[1_0_0] self-stretch backdrop-blur-[16.25px] px-16 py-[50px] rounded-[35px]">
            <h2 className="max-w-[519px] text-[color:var(--Primary-blue,#FFF)] text-[62.389px] not-italic font-bold leading-[normal]">
              Start Your Journey with us now !
            </h2>
          </div>
          <Link href={"/auth/login"} className="flex h-[373px] flex-col justify-center items-center bg-white/25 gap-9 shrink-0 self-stretch backdrop-blur-[16.25px] px-16 py-[50px] rounded-[35px]">
            <FaArrowDownLong className="text-white w-[115px] h-[115px] shrink-0" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default About
