import AfterLogin from "@/components/Modules/AfterLogin/AfterLogin";
import React from "react";

const page = ({ params }) => {
  return <AfterLogin check={params} />;
};

export default page;
