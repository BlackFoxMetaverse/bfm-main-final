import React from "react";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";

const Toast = ({ type, message }) => {
  const success = type === "success" ? true : false;
  const error = type === "error" ? true : false;
  const warning = type === "warning" ? true : false;
  return (
    <main
      className={`w-fit h-fit absolute top-10 right-20 rounded-t-md rounded-b-none bg-black border-b-2 ${
        warning && "border-yellow-500"
      } ${success && "border-green-500"} ${error && "border-red-500"}`}
    >
      <div className="min-w-52 w-full h-full px-7 py-3 max-h-10 text-white flex items-center justify-normal gap-4">
        {warning && (
          <BsExclamationCircleFill className="text-yellow-500 text-lg" />
        )}
        {success && <BsCheckCircleFill className="text-green-500 text-lg" />}
        {error && <IoCloseCircle className="text-red-500 text-lg" />}
        <p className="text-sm">{message}</p>
      </div>
    </main>
  );
};

export default Toast;
