import React from "react";
import dynamic from "next/dynamic";

const SellerData = dynamic(
  () => import("@/components/admin/layouts/SellerData/SellerData"),
  { ssr: false }
);
const page = ({ params }) => {
  return <SellerData name={params.name} id={params.id} />;
};

export default page;
