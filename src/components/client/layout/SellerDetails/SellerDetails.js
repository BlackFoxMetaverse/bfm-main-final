"use client";
import React, { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaBehance,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import Modal from "@/components/Modules/Modal/Modal";
import ImageModal from "@/components/admin/Modules/ImageModal/ImageModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import FeedBackCard from "../../modules/FeedBackSection/FeedBackCard";

const ImageComponent = ({ src, alt, className, onClick }) => (
  <img
    loading="eager"
    src={src}
    alt={alt}
    onClick={onClick}
    className={className}
  />
);

const FeedBackModal = ({ feedbackData, close }) => {
  const stars = [1, 2, 3, 4, 5];
  const [feedback, setFeedback] = useState({
    rating: 0,
    feedbackTerm: "",
  });

  const handleSubmit = () => {
    feedbackData(feedback);
    close();
  };

  // useEffect(() => {
  //   feedbackData(feedback);
  // },[feedback])

  console.log(feedback);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black/50 fixed inset-0 z-50">
      <div className="bg-white flex flex-col max-w-[1920px] aspect-video 2xl:w-1/2 xl:w-2/3 lg:w-5/6 w-full rounded-2xl p-10">
        <h2 className="3xl:text-5xl 2xl:text-3xl text-2xl font-bold">
          Give a Feedback
        </h2>
        <p className="text-black/70 mt-3 3xl:text-lg">
          Please rate your experience below
        </p>
        <div className="flex gap-10 items-center mt-7">
          <div className="flex items-center gap-5">
            {stars?.map((_, index) => (
              <BsStarFill
                onClick={() => {
                  setFeedback({ ...feedback, rating: index + 1 });
                }}
                className={`${
                  index + 1 <= feedback.rating
                    ? "text-yellow-400"
                    : "text-stone-300"
                } text-5xl cursor-pointer`}
                key={index}
              />
            ))}
          </div>
          <p className="3xl:text-3xl 2xl:text-2xl text-xl text-stone-600">
            {feedback.rating}/5
          </p>
        </div>
        <h5 className="mt-5 px-5 3xl:text-xl 2xl:text-lg">
          Additional Feedback
        </h5>
        <textarea
          name="feedback"
          id="feedback"
          placeholder="My Feedback!!"
          value={feedback.feedbackTerm}
          onChange={(e) =>
            setFeedback({ ...feedback, feedbackTerm: e.target.value })
          }
          cols="30"
          rows=""
          className="flex-grow border 3xl:text-xl 2xl:text-lg border-stone-500 focus:outline-none rounded-xl mt-4 p-5"
        ></textarea>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 items-center mt-6 rounded-lg justify-center flex bg-black text-white 3xl:text-xl 2xl:text-lg"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

const SellerDetails = ({ params }) => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [addFeedBack, setAddFeedback] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const services = [
    "SEO",
    "Freelancing",
    "User Research",
    "UI Research",
    "Prototyping",
    "Wireframing",
  ];
  const feedbacksData = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ec9057b567c10586011945dc82f27532d518f41f637d48ef6ef795e6a9034a88?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
      authorName: "Jane Doe",
      feedback:
        "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
      ratingText: "3",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ec9057b567c10586011945dc82f27532d518f41f637d48ef6ef795e6a9034a88?apiKey=91ddce01d5c046adbb0d93d1184c8d50&",
      authorName: "Jane Doe",
      feedback:
        "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
      ratingText: "1",
    },
  ];
  const image = [
    "https://s3-alpha-sig.figma.com/img/088d/f14d/a208675f602fab1876f249bacd792579?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kvks0aVQm6JuAEkVZSA11e7lEy4NReDZbC1mhMfCleDvwiiH~-wmw48Bzd7ZL867hevFWK9Ni5iGk96lyLzvyS9PMFkfFAkyiH3bXuDDJIBv9xUMqaXqpLjiLj2DsxYqS647eV~SGPsWXxDoVNS3dHP0wWapBhYTxbxBiQ3QpxxcsxtDbfytR38j1T-JmYGmxaBQP5wxMGaN1lG1FO7pdc18wsHi1-iIi5n1zqfKD3EdHgdHe6yTOQS9U9JWjFW2gyh51pcNkJNUSbh9q1DKdABohwyowYDtF9Ydf5Uul9sMrE~V15T3S4Ee9lJKNH1-Hr5XLeGBlamh7jAkGdA1tA__",
    "https://s3-alpha-sig.figma.com/img/c331/a812/7750c29f8d0cf3730aad79f209110593?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LjIUjVWXz7nIJO9NU1GlR8PI3zH9Dd~zEBkPM3qqRJcBKoezBM~ATk0uNvMwbzTS9Q3nxjE-FNhrITho0Ey5CK3vDCW33mNz3ysR4oPiAcaQOIenF1~kicDh8yTiw6vIb1MzoHXQBiflJZTA1VOZAuKf4J8iic7eQtBvKqP5SLoBU3C4aJV1I~sflddqb0m6rFh-vBQjJo7gPGMV8qp~sy9CKsJQw7ThaVdgteimqWmoH9LjqlTrF4a1gCJzuxIfQ1vipUYy3CJa4SeUzzdOIkv06BzLfwZpLgGFCS721wy7ZtMKJ1CL9zU1Lm8PF1YZCaDabq4hVw~~quaCj9kX3g__",
    "https://s3-alpha-sig.figma.com/img/c331/a812/7750c29f8d0cf3730aad79f209110593?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LjIUjVWXz7nIJO9NU1GlR8PI3zH9Dd~zEBkPM3qqRJcBKoezBM~ATk0uNvMwbzTS9Q3nxjE-FNhrITho0Ey5CK3vDCW33mNz3ysR4oPiAcaQOIenF1~kicDh8yTiw6vIb1MzoHXQBiflJZTA1VOZAuKf4J8iic7eQtBvKqP5SLoBU3C4aJV1I~sflddqb0m6rFh-vBQjJo7gPGMV8qp~sy9CKsJQw7ThaVdgteimqWmoH9LjqlTrF4a1gCJzuxIfQ1vipUYy3CJa4SeUzzdOIkv06BzLfwZpLgGFCS721wy7ZtMKJ1CL9zU1Lm8PF1YZCaDabq4hVw~~quaCj9kX3g__",
    "https://s3-alpha-sig.figma.com/img/c331/a812/7750c29f8d0cf3730aad79f209110593?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LjIUjVWXz7nIJO9NU1GlR8PI3zH9Dd~zEBkPM3qqRJcBKoezBM~ATk0uNvMwbzTS9Q3nxjE-FNhrITho0Ey5CK3vDCW33mNz3ysR4oPiAcaQOIenF1~kicDh8yTiw6vIb1MzoHXQBiflJZTA1VOZAuKf4J8iic7eQtBvKqP5SLoBU3C4aJV1I~sflddqb0m6rFh-vBQjJo7gPGMV8qp~sy9CKsJQw7ThaVdgteimqWmoH9LjqlTrF4a1gCJzuxIfQ1vipUYy3CJa4SeUzzdOIkv06BzLfwZpLgGFCS721wy7ZtMKJ1CL9zU1Lm8PF1YZCaDabq4hVw~~quaCj9kX3g__",
    "https://s3-alpha-sig.figma.com/img/c331/a812/7750c29f8d0cf3730aad79f209110593?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LjIUjVWXz7nIJO9NU1GlR8PI3zH9Dd~zEBkPM3qqRJcBKoezBM~ATk0uNvMwbzTS9Q3nxjE-FNhrITho0Ey5CK3vDCW33mNz3ysR4oPiAcaQOIenF1~kicDh8yTiw6vIb1MzoHXQBiflJZTA1VOZAuKf4J8iic7eQtBvKqP5SLoBU3C4aJV1I~sflddqb0m6rFh-vBQjJo7gPGMV8qp~sy9CKsJQw7ThaVdgteimqWmoH9LjqlTrF4a1gCJzuxIfQ1vipUYy3CJa4SeUzzdOIkv06BzLfwZpLgGFCS721wy7ZtMKJ1CL9zU1Lm8PF1YZCaDabq4hVw~~quaCj9kX3g__",
  ];
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeImageModal = () => {
    setModalImageUrl(null);
  };

  return (
    <div className="py-32">
      <div className="flex lg:flex-row flex-col lg:w-11/12 justify-between max-w-[1920px] gap-14 mx-auto rounded-[20px] relative">
        <div className="flex gap-7 xl:w-[40%] w-full items-start xl:sticky inset-y-0">
          {/* <button
            type="button"
            onClick={() => router.back()}
            className="px-[17.57px] py-[10.54px] bg-neutral-900 rounded-md border-2 border-violet-50 justify-center items-center gap-[7.03px] hidden lg:inline-flex"
          >
            <FaAngleLeft className="text-white" />
          </button> */}
          <div className="space-y-5 w-full">
            <div className="w-full flex flex-col overflow-hidden gap-8 rounded-lg justify-center bg-white p-7 items-center">
              <div className="w-full h-full items-start shrink-0 gap-[22.29px] flex">
                <div className="w-1/3 aspect-square rounded-2xl shrink-0 overflow-hidden relative bg-stone-300">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/e5f1/c231/96d9c17181e09c0c069fb92abf5dcd9b?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d0tt1M-~cJJK5yeNSqhOosCaOy0Cr5gHFeI2Nqgy8P8LnRCBajnfpgTR2o9gsaOw5GbVA6wgGhKUYRswddZNLDuuEKvMBpe5t3P69887rWQby6X0nwE0-6Vjc0ic7d452O80U9xtm7cs2vmXQ8gcZLN7G0tDoW6jFrc-B2jP46Bm52KaJYlVHzs1dkcqIrbxT-Lg-L8sHd8DMlfRydGIUI2s~nKxvnpzOS3LzoC5LNO23gbPEnpFJ50FqyT1XuT-uqPGrnPpyTpiTIB~P15wJU3II3-OweUGqaG~PuHYvEuE41Hl860e9AM3QyccNhe-V4otdMoUIebKRjfsi3gQRQ__"
                    alt=""
                    className="size-full object-cover shrink-0"
                  />
                </div>
                <div className="flex-col w-2/3 justify-between h-full items-start 3xl:gap-2 gap-1 inline-flex">
                  <div className="text-black 3xl:text-2xl 2xl:text-xl lg:text-lg text-lg font-bold whitespace-nowrap">
                    {showDetails ? "Rajesh Ramayana" : "Ra***"}
                  </div>
                  <div className="flex-col justify-start items-start gap-[4.68px] flex">
                    <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                      {params?.username ? params?.username : "Username"}
                    </div>
                    <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                      UI/UX Designer{" "}
                    </div>
                  </div>
                  {/* <div className="w-[72.45px] h-[25.03px] pl-[9.82px] pr-[8.63px] pt-[4.91px] pb-[5.12px] bg-gray-200 rounded-xl justify-center items-center inline-flex">
                    <div className="text-zinc-700 text-[13px] font-normal font-['Work Sans']">
                      Available
                    </div>
                  </div> */}
                  <div className="px-2 py-1 bg-black rounded-xl justify-center items-center gap-1 inline-flex">
                    <div className="text-white text-base font-normal whitespace-nowrap">
                      Faridabad, Haryana
                    </div>
                    <IoLocationOutline className="text-white" />
                  </div>
                  <div className="justify-start items-start gap-2 inline-flex">
                    <BsStarFill className="w-[21.14px] h-[20.25px] text-orange-500 relative" />
                    <div className="w-[81px] text-black text-base leading-normal">
                      4.2
                    </div>
                  </div>
                </div>
              </div>
              {showDetails && (
                <div className="w-full flex-col justify-start items-start gap-7 flex">
                  <div className="flex-col w-full justify-start items-start gap-0.5 flex">
                    <div className="text-black text-xl font-bold">
                      Phones Number
                    </div>
                    <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal flex justify-between items-center w-full">
                      {"+918585992535".slice(0, 7) + "..."}
                      <button
                        type="button"
                        className="px-7 py-1 border border-black rounded-xl text-black"
                      >
                        Request Contact
                      </button>
                    </div>
                  </div>
                  <div className="flex-col justify-start items-start gap-0.5 flex">
                    <div className="text-black text-xl font-bold">
                      Email Address
                    </div>
                    <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                      randomemail@gmail.com
                    </div>
                  </div>
                  <div className="w-full text-3xl justify-start items-start gap-[18px] inline-flex">
                    <FaGithub />
                    <FaLinkedinIn />
                    <FaBehance />
                  </div>
                </div>
              )}
              {/* <div className=" px-5 space-y-9">
                <div className="w-full relative justify-end items-end py-5 text-end ">
                  {!showDetails && (
                    <div
                      className="relative inline-block"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <FaInfoCircle className="w-4 h-4 text-blue-600 cursor-pointer" />
                      {showTooltip && (
                        <div className="absolute right-6 w-[270px] p-2 space-y-4 bottom-full bg-white  rounded shadow-lg">
                          <h2 className="font-semibold text-sm text-center ">
                            How to get contact information?
                          </h2>
                          <p className=" text-xs text-center ">
                            There are a lot of things you can do in space, and
                            space essentially is unlimited resources.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div> */}
            </div>
            {!showDetails ? (
              <button
                className="bg-black w-full text-white flex justify-center items-center p-3 rounded-lg "
                onClick={openModal}
              >
                Reveal Contact Information
              </button>
            ) : null}
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="max-w-[295px] text-stone-500 text-base font-normal leading-[27px]">
                  Service Provided
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  {services?.map((service, index) => (
                    <div
                      key={index}
                      className="px-[12.95px] pt-[4.35px] pb-[3.52px] rounded-[20.03px] border border-stone-950 justify-center items-center inline-flex"
                    >
                      <p className="text-stone-950 text-sm leading-normal">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="max-w-[295px] text-stone-500 text-base font-normal leading-[27px]">
                  Skills
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  {services?.map((service, index) => (
                    <div
                      key={index}
                      className="px-[12.95px] pt-[4.35px] pb-[3.52px] rounded-[20.03px] border border-stone-950 justify-center items-center inline-flex"
                    >
                      <p className="text-stone-950 text-sm leading-normal">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {notFound ? (
              <div className="flex flex-col w-2/3 space-y-10 h-[650px] overflow-hidden justify-center items-center space-x-10 bg-white p-10 rounded-[20px]">
                404 Not Found
              </div>
            ) : ( */}
        <div className="flex flex-col rounded-xl w-full">
          {/* <div className="flex overflow-hidden aspect-video size-full relative px-10 pt-12 pb-8 max-md:px-5 max-md:max-w-full"> */}
          <ImageComponent
            src={image[0]}
            alt=""
            className="object-cover aspect-[2/1] size-full rounded-xl"
          />
          {/* <div className="flex relative justify-center items-center px-6 py-7 bg-white mt-[487px] rounded-[60px] w-[76px] max-md:px-5 max-md:mt-10">
                <ImageComponent
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b34758469970af54f152102a9eac40ed30f83b12bf512b468331bdb999e271e4?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
                  alt="Profile icon"
                  className="w-full aspect-[1.05]"
                />
              </div> */}
          {/* </div> */}
          <div>
            <h2 className="mt-8 w-full text-3xl font-bold text-neutral-800 max-md:max-w-full">
              About Me
            </h2>
            <p className="mt-2.5 w-full text-lg leading-7 text-neutral-600 max-md:max-w-full">
              Design a futuristic 3D skeleton model with a dynamic RGB lighting
              system set against a captivating space-themed background. Craft
              the skeleton to have a sleek, futuristic aesthetic, incorporating
              intricate details and streamlined features. Implement an RGB
              lighting scheme that pulsates or transitions smoothly across the
              skeleton, creating an engaging visual effect. Ensure compatibility
              with real-time rendering engines to maximize interactivity. The
              space-themed background should complement the futuristic theme,
              with stars, nebulae, or cosmic elements. Prioritize a balance
              between creativity and functionality, delivering a visually
              stunning 3D model ready for use in various digital or multimedia
              applications.
            </p>
          </div>
          {/* Experience */}
          <div className="flex-col justify-start items-start gap-2.5 mt-7 inline-flex">
            <div className="text-neutral-800 text-[32px] font-bold">
              Experience
            </div>
            <div className="flex-col justify-start items-start gap-5 flex">
              <div className="px-[30px] py-5 rounded-[10px] border border-zinc-300 flex-col justify-start items-start gap-2.5 flex">
                <div className="text-indigo-500 text-2xl leading-[27px]">
                  AERATE (Car Blog Website)
                </div>
                <div className="self-stretch text-neutral-600 text-lg font-normal leading-[27px]">
                  Design a futuristic 3D skeleton model with a dynamic RGB
                  lighting system set against a captivating space-themed
                  background. Craft the skeleton to have a sleek, futuristic
                  aesthetic, incorporating intricate details and streamlined
                  features.{" "}
                </div>
                <button
                  type="button"
                  className="px-7 py-2.5 rounded border border-black justify-center items-center gap-2.5 inline-flex"
                >
                  <div className="text-black text-lg font-bold font-['Helvetica Neue'] leading-7">
                    Look At the Project
                  </div>
                  <FaAngleRight />
                </button>
              </div>
              <div className="px-[30px] py-5 rounded-[10px] border border-zinc-300 flex-col justify-start items-start gap-2.5 flex">
                <div className="text-indigo-500 text-2xl leading-[27px]">
                  AERATE (Car Blog Website)
                </div>
                <div className="self-stretch text-neutral-600 text-lg font-normal leading-[27px]">
                  Design a futuristic 3D skeleton model with a dynamic RGB
                  lighting system set against a captivating space-themed
                  background. Craft the skeleton to have a sleek, futuristic
                  aesthetic, incorporating intricate details and streamlined
                  features.{" "}
                </div>
                <button
                  type="button"
                  className="px-7 py-2.5 rounded border border-black justify-center items-center gap-2.5 inline-flex"
                >
                  <div className="text-black text-lg font-bold font-['Helvetica Neue'] leading-7">
                    Look At the Project
                  </div>
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
          {showImage ? (
            <div
              style={{
                margin: 0,
              }}
              className="grid grid-cols-1 justify-center py-7 items-center w-full gap-2"
            >
              {image?.slice(1, image?.length)?.map((data, i) => (
                <div key={i} className={`relative`}>
                  <ImageComponent
                    loading="lazy"
                    className="size-full cursor-pointer object-cover aspect-[2/1] rounded-xl"
                    src={data}
                    alt=""
                    onClick={() => openImageModal(data)}
                  />
                </div>
              ))}

              {modalImageUrl && (
                <ImageModal
                  imageUrl={modalImageUrl}
                  closeModal={closeImageModal}
                />
              )}
            </div>
          ) : null}

          {/* Feedback Section */}
          <section className="space-y-8 p-7 bg-white rounded-xl">
            <header className="text-3xl font-bold text-black max-md:max-w-full">
              Client Feedback
            </header>
            {feedbacksData ? (
              feedbacksData.map((feedbackData, index) => (
                <FeedBackCard key={index} {...feedbackData} />
              ))
            ) : (
              <div>No Feedbacks</div>
            )}
            {showDetails ? (
              <button
                onClick={() => setAddFeedback(!addFeedBack)}
                className="justify-center w-full items-center px-16 py-2.5 mt-7 text-sm font-bold text-white whitespace-nowrap bg-black rounded-md border border-solid border-neutral-200 max-md:px-5 max-md:max-w-full"
              >
                Give Feedback
              </button>
            ) : (
              <button className="justify-center w-full items-center px-16 py-2.5 mt-7 text-sm font-bold text-black whitespace-nowrap bg-gray-100 rounded-md border border-solid border-neutral-200 max-md:px-5 max-md:max-w-full">
                Load More
              </button>
            )}
          </section>
        </div>
        {/* )} */}
      </div>
      {addFeedBack && (
        <FeedBackModal
          feedbackData={() => {}}
          close={() => setAddFeedback(!addFeedBack)}
        />
      )}
      {showModal && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default SellerDetails;
