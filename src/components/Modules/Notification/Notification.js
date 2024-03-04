import React from "react";

const NotificationItem = ({
  imageSrc,
  altText,
  title,
  description,
  buttonText,
  buttonClassName,
  time,
}) => (
  <section className="flex gap-3.5 items-start self-center px-5 max-md:flex-wrap max-md:max-w-full">
    <img
      loading="lazy"
      src={imageSrc}
      alt={altText}
      className="w-11 aspect-square"
    />
    <div className="flex flex-col flex-1 self-stretch max-md:max-w-full">
      <div className="leading-[140%] text-slate-700 max-md:max-w-full">
        <strong>{title}</strong> {description}
      </div>
      <div className="flex gap-2 self-start py-0.5 mt-2.5 whitespace-nowrap font-[450] leading-[150%]">
        <div
          className={`grow justify-center px-5 py-1.5 text-white rounded ${buttonClassName}`}
        >
          {buttonText}
        </div>
      </div>
    </div>
    <div className="flex flex-col whitespace-nowrap basis-0 leading-[150%] text-slate-600">
      <div>{time}</div>
    </div>
  </section>
);

const Notification = ({ notifications }) => {
  return (
    <div className="flex absolute top-full translate-y-5 right-0 w-full flex-col rounded lg:min-w-[753px] sm:min-w-[400px] min-w-[260px] bg-white p-5 overflow-scroll min-h-24">
      <header className="justify-center items-start py-6 pr-16 pl-7 w-full text-lg font-bold leading-7 whitespace-nowrap text-slate-800 max-md:px-5 max-md:max-w-full">
        Notifications
      </header>
      {/* <div className="flex flex-col justify-center px-7 w-full font-bold whitespace-nowrap border-solid border-b-[1.105px] border-b-gray-100 leading-[120%] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-0 justify-between pr-20 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex flex-col flex-1">
            <div className="flex gap-1.5 justify-between px-5 py-2.5 rounded-md">
              <div className="text-sm text-slate-800">All</div>
              <div className="justify-center px-1.5 py-0.5 text-xs text-center bg-gray-100 rounded-xl mix-blend-multiply aspect-[1.31] text-slate-700">
                {" "}
                1{" "}
              </div>
            </div>
            <div className="shrink-0 bg-blue-600 rounded-2xl h-[3px]" />
          </div>
          <div className="grow justify-center px-6 py-3 text-sm text-slate-500 max-md:px-5">
            {" "}
            Mentions{" "}
          </div>
        </div>
      </div> */}
      <main className="">
        {notifications?.map((item, index) => (
          <NotificationItem key={index} {...item} />
        ))}
      </main>
    </div>
  );
};

export default Notification;
