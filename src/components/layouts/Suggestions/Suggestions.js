'use client'
import SuggestionCard from "@/components/Modules/SuggestionCard/SuggestionCard";
import React, { useEffect, useRef, useState } from "react";
import SuggestionImage1 from "@/assets/suggestionImage1.png";
import SuggestionImage2 from "@/assets/suggestionImage2.png";
import SuggestionImage3 from "@/assets/suggestionImage3.png";
import SuggestionImage4 from "@/assets/suggestionImage4.png";
import Avart from "@/assets/avatar.svg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const cardWidth = 300; // Adjust this based on your card width
const cardsPerPage = 4;
const information = [
  {
    id: 1,
    userName: "r.",
    avater: Avart,
    mainImage: SuggestionImage1,
    description: "Fine 9 ",
    sideImage1: SuggestionImage2,
    sideImage2: SuggestionImage3,
    sideImage3: SuggestionImage4,
  },
  {
    id: 2,
    userName: "r.",
    avater: Avart,
    mainImage: SuggestionImage1,
    description: "Fine 9 ",
    sideImage1: SuggestionImage2,
    sideImage2: SuggestionImage3,
    sideImage3: SuggestionImage4,
  },
  {
    id: 3,
    userName: "r.",
    avater: Avart,
    mainImage: SuggestionImage1,
    description: "Fine 9 ",
    sideImage1: SuggestionImage2,
    sideImage2: SuggestionImage3,
    sideImage3: SuggestionImage4,
  },
  {
    id: 4,
    userName: "r.",
    avater: Avart,
    mainImage: SuggestionImage1,
    description: "Fine 9 ",
    sideImage1: SuggestionImage2,
    sideImage2: SuggestionImage3,
    sideImage3: SuggestionImage4,
  },
  {
    id: 5,
    userName: "r.",
    avater: Avart,
    mainImage: SuggestionImage1,
    description: "Fine 9 ",
    sideImage1: SuggestionImage2,
    sideImage2: SuggestionImage3,
    sideImage3: SuggestionImage4,
  },
  {
    id: 6,
    userName: "r.",
    avater: Avart,
    mainImage: SuggestionImage1,
    description: "Fine 9 ",
    sideImage1: SuggestionImage2,
    sideImage2: SuggestionImage3,
    sideImage3: SuggestionImage4,
  },
  {
    id: 7,
    userName: "r.",
    avater: Avart,
    mainImage: SuggestionImage1,
    description: "Fine 9 ",
    sideImage1: SuggestionImage2,
    sideImage2: SuggestionImage3,
    sideImage3: SuggestionImage4,
  },
];

const Suggestions = () => {
    const scrollRef = useRef(null);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsAtBeginning(scrollRef.current.scrollLeft === 0);
        setIsAtEnd(
          scrollRef.current.scrollLeft + scrollRef.current.offsetWidth ===
            scrollRef.current.scrollWidth
        );
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const scrollRight = () => {
    if (scrollRef.current && !isAtEnd) {
      const scrollPosition =
        scrollRef.current.scrollLeft + cardWidth * cardsPerPage;
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current && !isAtBeginning) {
      const scrollPosition =
        scrollRef.current.scrollLeft - cardWidth * cardsPerPage;
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  
  return (
    <div className="overflow-x-hidden">
    <div className="flex justify-center items-center gap-[977px]">
        <div className="text-black text-[26px] not-italic font-medium leading-[22.012px]">
          Suggestions
        </div>
        <div className="flex gap-x-[22px]">
          <button
            className="flex w-[51px] h-[51px]  text-white justify-center items-center p-[12.75px] bg-[#4461F2] rounded-[38.25px]"
            onClick={scrollLeft}
          >
            <FaArrowLeft />
          </button>
          <button
            className="flex w-[51px] h-[51px] text-white justify-center items-center p-[12.75px] bg-[#4461F2] rounded-[38.25px]"
            onClick={scrollRight}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto my-10" ref={scrollRef}>
        {information.map((info) => (
          <div key={info.id} className="cursor-pointer flex mx-5">
            <SuggestionCard
              id={info.id}
              avater={info.avater}
              mainImage={info.mainImage}
              userName={info.userName}
              description={info.description}
              sideImage1={info.sideImage1}
              sideImage2={info.sideImage2}
              sideImage3={info.sideImage3}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
