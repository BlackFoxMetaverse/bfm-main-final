import React from 'react'
import { BsStarFill } from 'react-icons/bs';

const ratingIcons = [1, 2, 3, 4, 5]

const FeedBackCard = ({
  imageSrc,
  authorName,
  feedback,
  ratingText,
}) => {
  return (
    <article className="flex flex-col bg-white rounded-lg max-md:px-5 p-8">
      <section className="flex gap-2 self-start mt-7 text-lg font-bold text-black whitespace-nowrap">
        <img
          loading="lazy"
          src={imageSrc}
          alt={`${authorName}'s profile picture`}
          className="w-10 rounded-full aspect-square"
        />
        <p className="grow my-auto">{authorName}</p>
      </section>
      <p className="mt-4 text-base leading-7 text-black text-opacity-60 max-md:max-w-full">
        {feedback}
      </p>
      <div className="flex gap-2.5 self-start px-3 py-2.5 mt-4 rounded-md bg-zinc-50">
        <div className="flex gap-1 my-auto">
          {ratingIcons.map((_, index) => (
            <BsStarFill key={index} className={`${index+1<=ratingText ? "text-orange-500" : "text-stone-300"}`} />
          ))}
        </div>
        <p className="grow text-sm font-bold leading-5 text-slate-500">
          {ratingText}/5
        </p>
      </div>
    </article>
  );
};

export default FeedBackCard
