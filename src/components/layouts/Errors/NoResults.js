import React from "react";

const HeaderImage = () => (
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a516d0277a925a5a4cc4250a4330af8b77dcde343e5939a3ede5d6b104ebfda?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
    alt="No results found illustration"
    className="w-full aspect-[2] max-md:max-w-full"
  />
);

const SectionTitle = ({ children }) => (
  <h2 className="self-center mt-16 text-5xl whitespace-nowrap text-slate-800 max-md:mt-10 max-md:text-4xl">
    {children}
  </h2>
);

const SectionDescription = ({ children }) => (
  <p className="mx-5 mt-6 text-2xl font-light text-center text-slate-800 text-opacity-50 max-md:mr-2.5 max-md:max-w-full">
    {children}
  </p>
);

const ActionButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="justify-center self-center px-14 py-3.5 mt-12 text-lg leading-5 text-white capitalize whitespace-nowrap bg-indigo-500 rounded font-[450] max-md:px-5 max-md:mt-10"
    tabindex="0"
  >
    {children}
  </button>
);

const NoResultsFound = ({ onClick }) => (
  <article className="flex flex-col items-center justify-center mx-auto my-5 max-w-[613px]">
    <HeaderImage />
    <SectionTitle>No Result Found!</SectionTitle>
    <SectionDescription>
      Sorry, we came up empty-handed. Let&quot;s broaden our search and help you
      find what you&quot;re looking for.
    </SectionDescription>
    <ActionButton onClick={onClick}>Search Again</ActionButton>
  </article>
);

export default NoResultsFound;
