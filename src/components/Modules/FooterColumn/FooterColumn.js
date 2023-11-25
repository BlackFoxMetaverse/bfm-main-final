import React from "react";

const FooterColumn = ({ heading, content }) => {
  return (
    <div className="p-5">
      <ul>
        <p className="text-white font-bold text-2xl pb-4">{heading}</p>
        {content.map((text) => {
          return (
            <li key={text} className="text-gray-500 lg:text-base text-sm text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterColumn;