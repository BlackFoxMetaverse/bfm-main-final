"use client";

import Image from "next/image";
import React, { useState } from "react";

const ReadBlog = () => {
  const [readBlog, setReadBlog] = useState(null);

  return (
    <main>
      <div className="w-full xl:aspect-[3/1] md:aspect-[2/1] sm:aspect-[1.5/1] aspect-square relative flex justify-center items-center">
        <Image
          src={require("../../../../public/clients_images/first.svg")} // Blog Image
          alt=""
          className="-z-10 absolute inset-0 object-cover size-full"
        />
        <div className="w-2/3 flex gap-3 flex-col items-center justify-center">
          {/* Blog Title */}
          <div className="max-w-[706.67px] max-h-[98.44px] text-center text-white 2xl:text-4xl sm:text-2xl text-xl font-bold capitalize">
            Richird Norton photorealistic rendering as real photos
          </div>
          {/* Blog Author */}
          <div className="max-w-[177.33px] h-[21.40px] text-center text-white text-xs font-bold leading-tight">
            By author
          </div>
        </div>
      </div>
      {/* Blog Content */}
      <div className="flex flex-col gap-7 w-11/12 md:w-5/6 mx-auto py-8">
        <div className="w-full text-zinc-600 text-sm font-normal font-['Neue Helvetica'] leading-[25px]">
          Seamlessly syndicate cutting-edge architectures rather than
          collaborative collaboration and idea-sharing. Proactively incubate
          visionary interfaces whereas premium benefits. Seamlessly negotiate
          ubiquitous leadership skills rather than parallel ideas. Dramatically
          visualize superior interfaces for best-of-breed alignments.
          Synergistically formulate performance based users through customized
          relationships. Interactively deliver cross-platform ROI via granular
          systems. Intrinsicly enhance effective initiatives vis-a-vis
          orthogonal outsourcing. Rapidiously monetize market-driven
          opportunities with multifunctional users. Collaboratively enhance
          visionary opportunities through revolutionary schemas. Progressively
          network just in time customer service without real-time scenarios.
          <br />
          <br />
          Synergistically drive e-business leadership with unique synergy.
          Compellingly seize market positioning ROI and bricks-and-clicks
          e-markets. Proactively myocardinate timely platforms through
          distributed ideas. Professionally optimize enabled core competencies
          for leading-edge sources. Professionally enhance stand-alone
          leadership with innovative synergy. Rapidiously generate backend
          experiences vis-a-vis long-term high-impact relationships.
        </div>
        <div className="w-full">
          <span className="text-zinc-600 text-sm font-normal font-['Neue Helvetica'] leading-[25px]">
            Efficiently empower seamless meta-services with impactful
            opportunities. Distinctively transition virtual outsourcing with
            focused e-tailers.
            <br />
            <br />
          </span>
          <span className="text-indigo-500 text-4xl font-bold font-['Neue Helvetica']">
            “ Monotonically seize superior mindshare rather than efficient
            technology. ”
          </span>
          <span className="text-zinc-600 text-4xl font-bold font-['Neue Helvetica']">
            {" "}
            <br />
          </span>
          <span className="text-zinc-600 text-sm font-normal font-['Neue Helvetica'] leading-[25px]">
            <br />
            Compellingly enhance seamless resources through competitive content.
            Continually actualize 24/365 alignments for resource-leveling
            platforms. Energistically enhance high standards in models and
            professional expertise. Intrinsicly iterate extensible metrics for
            prospective opportunities. Continually develop leading-edge
            experiences through quality e-services.
            <br />
            <br />
            Compellingly enhance seamless resources through competitive content.
            Continually actualize 24/365 alignments for resource-leveling
            platforms. Energistically enhance high standards in models and
            professional expertise. Intrinsicly iterate extensible metrics for
            prospective opportunities. Continually develop leading-edge
            experiences through quality e-services.
          </span>
        </div>
        <div className="w-full text-zinc-600 text-sm font-normal font-['Neue Helvetica'] leading-[25px]">
          Seamlessly syndicate cutting-edge architectures rather than
          collaborative collaboration and idea-sharing. Proactively incubate
          visionary interfaces whereas premium benefits. Seamlessly negotiate
          ubiquitous leadership skills rather than parallel ideas. Dramatically
          visualize superior interfaces for best-of-breed alignments.
          Synergistically formulate performance based users through customized
          relationships. Interactively deliver cross-platform ROI via granular
          systems. Intrinsicly enhance effective initiatives vis-a-vis
          orthogonal outsourcing. Rapidiously monetize market-driven
          opportunities with multifunctional users. Collaboratively enhance
          visionary opportunities through revolutionary schemas. Progressively
          network just in time customer service without real-time scenarios.
          <br />
          <br />
          Synergistically drive e-business leadership with unique synergy.
          Compellingly seize market positioning ROI and bricks-and-clicks
          e-markets. Proactively myocardinate timely platforms through
          distributed ideas. Professionally optimize enabled core competencies
          for leading-edge sources. Professionally enhance stand-alone
          leadership with innovative synergy. Rapidiously generate backend
          experiences vis-a-vis long-term high-impact relationships.
        </div>
      </div>
    </main>
  );
};

export default ReadBlog;
