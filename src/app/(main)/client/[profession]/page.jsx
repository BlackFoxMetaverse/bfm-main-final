import SellerLists from "@/components/client/layout/SellerLists/SellerLists";
import React from "react";

const page = ({ params }) => {
  return <SellerLists params={params.profession} />;
};

export default page;
