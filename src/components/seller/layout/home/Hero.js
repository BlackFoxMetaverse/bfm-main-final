import Link from "next/link";
import React from "react";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { LuClipboardCheck } from "react-icons/lu";

const Hero = () => {
  return (
    <main className="w-full space-y-28">
      <section className="w-full h-screen [background:linear-gradient(90deg,#8E98A8_28.02%,rgba(142,152,168,0.00)_81.33%),rgba(0,0,0,0.73)] flex justify-center items-center">
        <div className="inline-flex flex-col max-w-[1920px] mx-auto items-center gap-10 md:w-2/3 w-5/6">
          <div className="flex flex-col items-center gap-[26.667px] w-full">
            <h1 className="text-white text-center 3xl:text-[85.333px] 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-bold leading-[normal]">
              Unleash Your Potential, Elevate Your Craft.
            </h1>
            <p className="text-white md:w-2/3 w-full text-center 3xl:text-[32px] 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm font-normal leading-[normal]">
              Join Black Fox Metaverse and connect with clients worldwide,
              showcasing your skills like never before
            </p>
          </div>
          <Link
            href={"/seller/form"}
            type="button"
            className="flex justify-center items-center gap-[10.667px] [background:var(--Foundation-Green-green-300,#73A876)] px-[34.133px] py-[17.067px] rounded-[8.533px] text-[color:var(--White,#FFF)] 3xl:text-[29.867px] 2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-normal leading-[100%] tracking-[-1.493px]"
          >
            Become a Seller
          </Link>
        </div>
      </section>
      <section className="inline-flex flex-col justify-center w-full items-center gap-[120px]">
        <h5 className="text-[color:var(--Foundation-Blue-blue-500,var(--Primary-1,#4461F2))] text-[32px] font-bold leading-[normal]">
          Why Choose Us?
        </h5>
        <div className="w-2/3 flex flex-col justify-center items-start gap-[85px]">
          <div className="flex flex-col justify-center items-center gap-[33px]">
            <img
              loading="eager"
              src="https://s3-alpha-sig.figma.com/img/d728/f40a/658ab6d17092acdbc6b8f15434ace921?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pb0HmDPJ9oMjmZ4OQpFvZ9OWeA3juCrVfv32yinkkzPAyduQKBy89L-ccggYc7x7e14APZeMSJhGSSxqfQtCVQysTnna8zBgy0nnLvHifsWfFgRrHKKCyHk4WkjFvRRZWkzcppD6GhVaiEgaZKBEGCbdHq6A~KmMRJxnfvj7J8txA6UBGTI6FuDun-3aKjDI1MxYOkZFL-mJiSFQKbP4R8VRhosRl2C6kwr8EVg78VqmoZ~--Gr5VVa8AbCgegZAQLLrXk1Gg3xBzn1AKvejlwfklZ4GYIJuib18FaXdedtru2aqP8PkRRByrusrLjGMk5i2L0kJR2QlozkrchqQoQ__"
              alt=""
              className="max-w-[118px] aspect-square"
            />
            <h4 className="text-[color:var(--Foundation-Grey-grey-600,#1E1E1E)] text-center  3xl:text-[29.867px] 2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-bold leading-[normal]">
              Nearby Connections Made Easy
            </h4>
            <p className="text-[color:var(--Foundation-Grey-grey-300,#6A6A6A)] text-center 3xl:text-[19.925px] 2xl:text-lg lg:text-base mtext-smfont-normal leading-[29.887px]">
              Find Neighbors Easily: Our app helps you connect with people
              nearby. Set your distance preference, and discover local services
              for a more personalized experience.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-[33px]">
            <img
              loading="eager"
              src="https://s3-alpha-sig.figma.com/img/4828/f864/13894b7953a2b1de2757134592ec9497?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fX85LF3blhL72iNp4aF4SeU8BfNRdMOOKKVsfShby7WEyDUSF7~qoz71CLJesagyIo5fbbCOkOkzDhY1f-oPdnpuPjEyrlm9WLgXaeInSUhZh6LlwFbYfyQPIs932MbtHRJfK9pN4boT3UL9b8Fd5zv7iAR6CU06TsjyCMOf9xB5XKAxMr2CQJ84tIj6msNDqFIHuIQauWMmeszGgY89pes0pFaaN5EqNyhJgM3LmLAJ2nQXWopuDNJw9LbY5f7CeN6n0-yPNoEDTAy9tX34zL0phsvL7IjUEdKSrUc8eWpEVZi4-uWIrLfVf85USOYCGzG4FlBcmVnVR3SOFdqQ3w__"
              alt=""
              className="max-w-[118px] aspect-square"
            />
            <h4 className="text-[color:var(--Foundation-Grey-grey-600,#1E1E1E)] text-center  3xl:text-[29.867px] 2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-bold leading-[normal]">
              Affordable Innovation, Indian Sensibilities
            </h4>
            <p className="text-[color:var(--Foundation-Grey-grey-300,#6A6A6A)] text-center 3xl:text-[19.925px] 2xl:text-lg lg:text-base md:tetext-sm-normal leading-[29.887px]">
              Pocket-Friendly Pricing: Our platform is affordable and designed
              to suit Indian preferences. Enjoy services without breaking the
              bank.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-[33px]">
            <img
              loading="eager"
              src="https://s3-alpha-sig.figma.com/img/80e2/d4aa/d414845082b272dbbe20c999fcf7c188?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hzSnK2zJGBCHQaWMk2FhkXqaSyJffPDtSC5AumAWEbZrnrQNnLTsiFd0L0c2Kec-ab2L9JOpXYK~KWLT4CfuGNGONDOvVi4ITgIjGSjhsmEKaEp2nsoWMepdduxpka7hbE7XGRr-6QH-t92Yfnojv-3WGmkvYUVOrVfRxtTct6xUQ0Bn74HoPiqSXRV83oB6KnaDCR91AG0Dq-oS~Odyp9VOWYC8-X~ulxeiQicqklMts1EAl9riKG1Ob97lvnmNKw18K56g-xaSXIK4MFZxiCX~vrB~rSekRnXHqoKWtocdnBvTEYNoPa33jpfdayGKsVuT-Y8FqiXY719s8avhAg__"
              alt=""
              className="max-w-[118px] aspect-square"
            />
            <h4 className="text-[color:var(--Foundation-Grey-grey-600,#1E1E1E)] text-center  3xl:text-[29.867px] 2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-bold leading-[normal]">
              Metaverse Integration, Futuristic Opportunities
            </h4>
            <p className="text-[color:var(--Foundation-Grey-grey-300,#6A6A6A)] text-center 3xl:text-[19.925px] 2xl:text-lg lg:text-base text-sm font-normal leading-[29.887px]">
              Virtual Experiences Await: Join us as we integrate with the
              Metaverse, offering a realistic and immersive experience. Explore
              new opportunities in a virtual world.
            </p>
          </div>
        </div>
      </section>

      <section className="flex text-white w-full flex-col items-center gap-[75.699px] [background:var(--Foundation-Blue-blue-200,#A9B6F9)] pl-[186.666px] pr-[186.667px] pt-[68px] pb-[126.872px]">
        <h1 className="text-[53.333px] font-bold leading-[normal]">
          How it works
        </h1>
        <div className="w-11/12 mx-auto flex gap-10 justify-between items-center">
          <div className="flex flex-col justify-center items-center gap-[33px]">
            <ImProfile className="w-[48.567px] h-[61.02px] shrink-0" />
            <h4 className="text-center 3xl:text-[29.867px] 2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-bold leading-[normal]">
              1. Create your profile
            </h4>
            <p className="text-center 3xl:text-[19.925px] 2xl:text-lg lg:text-base text-sm font-normal leading-[29.887px]">
              Sign up for free, set up your Gig, and offer your work to our
              global audience.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-[33px]">
            <AiOutlineDeliveredProcedure className="w-[48.567px] h-[61.02px] shrink-0" />
            <h4 className="text-center 3xl:text-[29.867px] 2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-bold leading-[normal]">
              2. Deliver great work
            </h4>
            <p className="text-center 3xl:text-[19.925px] 2xl:text-lg lg:text-base text-sm font-normal leading-[29.887px]">
              Get notified when you get an order and use our system to discuss
              details with customers.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-[33px]">
            <LuClipboardCheck className="w-[48.567px] h-[61.02px] shrink-0" />
            <h4 className="text-center 3xl:text-[29.867px] 2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm font-bold leading-[normal]">
              3. Get paid
            </h4>
            <p className="text-center 3xl:text-[19.925px] 2xl:text-lg lg:text-base text-sm font-normal leading-[29.887px]">
              Get paid on time, every time. Payment is available for withdrawal
              as soon as it clears.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
