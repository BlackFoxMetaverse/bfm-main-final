import * as React from "react";

function OffLine() {
  return (
    <section className="flex flex-col items-center justify-center h-screen max-w-[538px] mx-auto p-4">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/81c8b711b3c7d2175af6c060fd65ce1d89090f05090b24cc5a266e88f64b4f83?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
        alt="Connection lost illustration"
        className="w-full aspect-[1.45] max-w-[490px] md:max-w-full"
      />
      <h1 className="mt-16 text-5xl whitespace-nowrap text-slate-800 md:mt-10 md:text-4xl">
        {" "}
        Connection Lost!{" "}
      </h1>
      <p className="self-stretch mt-6 w-full text-2xl font-light text-center text-slate-800 text-opacity-50 md:max-w-full">
        {" "}
        Oops! Looks like our connection got lost. Sorry, it looks like
        you&apos;re off the grid.{" "}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="justify-center px-8 py-3.5 mt-12 text-lg leading-5 text-white capitalize whitespace-nowrap bg-indigo-500 rounded font-[450] md:px-5 md:mt-10"
        tabIndex="0"
      >
        {" "}
        Reload{" "}
      </button>
    </section>
  );
}

export default OffLine;
