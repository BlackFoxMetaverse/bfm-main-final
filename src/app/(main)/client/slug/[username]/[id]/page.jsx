import SellerDetails from "@/components/client/layout/SellerDetails/SellerDetails";
import React from "react";

const page = ({ params }) => {
  return (
    <div>
      <SellerDetails params={params} />
    </div>
  );
};

export default page;
