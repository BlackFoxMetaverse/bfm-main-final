import React from "react";
import { FaHeart } from "react-icons/fa6";

const ServicesCard = () => {
  return (
    <div className="flex flex-col items-start w-full shadow-[0px_6px_12px_0px_rgba(41,41,41,0.08)] bg-transparent rounded-[18px] overflow-hidden">
      <div className="flex h-[233px] w-full items-center overflow-hidden relative">
        <img
          src="https://s3-alpha-sig.figma.com/img/9d1b/b6a8/f94738f9819bb89d42b4a348158051c9?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CTkEHb~LnCYoJphUfx0uiZ5cvWXI9wXkkeIY0Cm5-p4k79ZxRvFjYJxkCsVwBR1fzuSqTe94P~G5LBadzQn1YYAga0Uy1HhyvmTfRAKsApp01hGscvrDHhN6JKY9v9TAZmgE9ePMwBZhNIl~csAch0KBlf0sWhLoVefX9PvRR-ee8G41HAYhkb0Dwaly9VUcan-JJwfpY68DmP6WHn6~Md7rriRwrDjKbI0uyXK27JxQ8C1XbbPaDi3oGKYJOSRaJ5V5F8xaOodqZbuBQTdgAebxvOeuPN0uDO6UPOP3H2NMtNkSxQgp8lThHeYempIQ1UQ3gSBJW7uWADDQsIoWFw__"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute flex gap-2 items-center h-fit w-fit inset-4">
          <FaHeart className="text-red-500" />
          <p className="text-white text-sm">3022</p>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
