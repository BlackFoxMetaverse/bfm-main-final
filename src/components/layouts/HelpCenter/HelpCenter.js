"use client";

import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex gap-5 justify-between relative p-10 w-full text-2xl leading-10 bg-white rounded-3xl shadow font-[450] max-md:flex-wrap max-md:px-5 max-md:max-w-full"
    >
      <div
        className={`flex-auto cursor-pointer self-stretch relative text-left my-auto max-md:max-w-full flex-grow w-3/4`}
      >
        {question}
        <p
          className={`text-base ${
            isOpen ? "scale-y-100 h-full" : "scale-y-0 -translate-y-1/2 h-0"
          } transform leading-6 text-gray-600 transition-all duration-500 max-md:max-w-full`}
        >
          {answer}
        </p>
      </div>
      <button
        type="button"
        className={`relative p-2 size-10 rounded-lg bg-black flex justify-center items-center`}
      >
        <p
          className={`absolute ${
            isOpen ? "rotate-180" : "rotate-90"
          } transition all duration-500 h-0.5 w-2/3 bg-white`}
        ></p>
        <p className={`absolute h-0.5 w-2/3 bg-white`}></p>
      </button>
    </div>
  );
};

const HelpCenterComponent = () => {
  const [FAQ, setFAQ] = useState([
    {
      question: "Why is Webflow the best no-code tool?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus.  Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. ",
    },
    {
      question: "Why is Webflow the best no-code tool?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus.  Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. ",
    },
    {
      question: "Why is Webflow the best no-code tool?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus.  Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. ",
    },
    {
      question: "Why is Webflow the best no-code tool?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus.  Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. ",
    },
    {
      question: "Why is Webflow the best no-code tool?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus.  Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec pulvinar habitant id. Bibendum donec id cras neque dui sagittis fringilla risus. ",
    },
  ]);

  return (
    <div className="flex flex-col text-neutral-900 my-24 mx-auto w-2/3 gap-10">
      <div className="self-center text-4xl font-bold whitespace-nowrap">
        Help Center
      </div>
      <div className="self-center mt-5 text-base leading-6 text-center max-md:max-w-full">
        Lorem ipsum dolor sit amet consectetur. Viverra suspendisse enim purus
        metus porttitor. Suscipit diam metus neque ut id velit volutpat. Ut
        lectus rutrum molestie rhoncus tortor a tincidunt. Orci volutpat egestas
        commodo mauris in tempor. Malesuada tempus luctus feugiat scelerisque
        bibendum ac morbi lectus. Fringilla velit consectetur bibendum velit nec
        pulvinar habitant id. Bibendum donec id cras neque dui sagittis
        fringilla risus.
      </div>
      <div className="flex flex-col gap-8">
        {FAQ.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  );
};

export default HelpCenterComponent;
