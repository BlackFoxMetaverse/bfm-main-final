"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PhotographyImage from '@/assets/photography.png'
import ArtistImage from '@/assets/3dArtist.png'
import FashionImage from '@/assets/fashionArtist.png'
import GraphicImage from '@/assets/graphicDesigner.png'
import UIUXImage from '@/assets/uiDesigner.png'
import MusicImage from '@/assets/musicProducer.png'
import EventImage from '@/assets/eventManager.png'
import DancerImage from '@/assets/dancer.png'
import CategoriesCard from "@/components/Modules/CategoriesCard/CategoriesCard";
const cardWidth = 300; 
const cardsPerPage = 4;
const information = [
  {
    id: 1,
    name: "Photography",
    
    mainImage: PhotographyImage,
   
  },
  {
    id: 2,
    name: "3D Artist ",
    
    mainImage: ArtistImage,
  },
  {
    id: 3,
    name: "Fashion Artist",
    
    mainImage: FashionImage,
  },
  {
    id: 4,
    name: "Graphic Designer",
    
    mainImage: GraphicImage,
  },
  {
    id: 5,
    name: "UI/UX Designer",
    
    mainImage: UIUXImage,
  },
  {
    id: 6,
    name: "Music Producer",
    
    mainImage: MusicImage,
  },
  {
    id: 7,
    name: "Event Manager",
    
    mainImage: EventImage,
  },
  {
    id: 8,
    name: "Dancer",
    
    mainImage: DancerImage,
  }
];
const Categories = () => {
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
    <div className="flex justify-between items-center">
        <div className="text-black text-[26px] not-italic font-medium leading-[22.012px]">
        Categories
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
            <CategoriesCard
              id={info.id}
              mainImage={info.mainImage}
              name={info.name}
            />
          </div>
        ))}
      </div>
    </div>

  );
};

export default Categories;
