import React from "react";
import SearchCard from "@/components/Modules/SearchedCard/SearchCard";
import DemoImg1 from "@/assets/demo1.png";
import DemoImg2 from "@/assets/demo2.png";
import DemoImg3 from "@/assets/demo3.png";
import DemoImg4 from "@/assets/demo4.png";
import DemoImg5 from "@/assets/demo5.png";
import DemoImg6 from "@/assets/demo6.png";
import DemoImg7 from "@/assets/demo7.png";
import DemoImg8 from "@/assets/demo8.png";
const relatedInformation = [
  {
    name: "Wedding Photography",
    color: "#9CE300",
  },
  {
    name: "Landscape Photography",
    color: "#F8B7B7",
  },
  {
    name: "Fashion Photography",
    color: "#FF5D67",
  },
  {
    name: "Baby Photography",
    color: "#BA592C",
  },
  {
    name: "Food Photography",
    color: "#F8B7B7",
  },
  {
    name: "Street Photography",
    color: "#529C09",
  },
];
const searchInformation = [
  {
    name: "Ra**",
    img:  DemoImg1 ,
  },
  {
    name: "Na**",
    img:  DemoImg2 ,
  },
  {
    name: "Ca**",
    img: DemoImg3 ,
  },
  {
    name: "Ri**",
    img:  DemoImg4 ,
  },
  {
    name: "ZY**",
    img:  DemoImg5 ,
  },
  {
    name: "XX**",
    img:  DemoImg6 ,
  },
  {
    name: "Ab**",
    img:  DemoImg7 ,
  },
  {
    name: "Aw**",
    img:  DemoImg8 ,
  },
];
const SearchLayout = ({ title }) => {
  return (
    <div>
      <div className="text-neutral-700 flex justify-center text-2xl not-italic font-bold leading-[normal] pt-[32px]">
        {title}
      </div>
      <div className="text-neutral-700 text-2xl not-italic font-bold leading-[normal] pt-[32px]">
        Related
      </div>
      <div className="flex gap-x-5 my-6">
        {relatedInformation.map((info) => (
          <button
            className={`flex justify-center items-center gap-2.5 bg-[${info.color}] border px-[21px] py-1.5 rounded-[5px] border-solid border-[rgba(255,255,255,0.60)]`}
          >
            {info.name}
          </button>
        ))}
      </div>
      <div className=" grid grid-cols-4 gap-10">
      {searchInformation.map((info) => (
          <SearchCard img={info.img} name={info.name} />
          ))}
          </div>
    </div>
  );
};

export default SearchLayout;
