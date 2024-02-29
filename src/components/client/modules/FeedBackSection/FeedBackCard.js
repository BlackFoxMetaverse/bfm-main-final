import React from "react";
import { BsStarFill } from "react-icons/bs";
import Moment from "react-moment";

const ratingIcons = [1, 2, 3, 4, 5];

const FeedBackCard = ({ image, name, description, rating, dateTime }) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_OBJ_URL;

  return (
    <article className="flex flex-col bg-white rounded-lg w-11/12 mx-auto">
      <section className="flex gap-2 self-start mt-7 w-full">
        <div className="flex gap-2 flex-grow items-center text-lg font-bold text-black whitespace-nowrap">
          {image && (
            <img
              loading="eager"
              src={s3Url + image}
              alt={`${name}'s profile picture`}
              className="w-10 rounded-full aspect-square"
            />
          )}
          <p className="grow my-auto">{name}</p>
        </div>
        <Moment format="DD MMM YYYY">{dateTime}</Moment>
      </section>
      <p className="mt-4 text-base leading-7 text-black/60 max-md:max-w-full">
        {description}
      </p>
      <div className="flex gap-2.5 self-start px-3 py-2.5 mt-4 rounded-md bg-zinc-50">
        <div className="flex gap-1 my-auto">
          {ratingIcons.map((_, index) => (
            <BsStarFill
              key={index}
              className={`${
                index + 1 <= rating ? "text-orange-500" : "text-stone-300"
              }`}
            />
          ))}
        </div>
        <p className="grow text-sm font-bold leading-5 text-slate-500">
          {rating}/5
        </p>
      </div>
    </article>
  );
};

export default FeedBackCard;
