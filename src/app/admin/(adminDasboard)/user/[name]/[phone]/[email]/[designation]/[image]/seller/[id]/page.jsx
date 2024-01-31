import React from "react";
import dynamic from "next/dynamic";

const SellerData = dynamic(
  () => import("@/components/admin/layouts/SellerData/SellerData"),
  { ssr: false }
);
const page = ({ params }) => {
  console.log(params);
  return (
    <SellerData
      name={params.name}
      phone={params.phone}
      email={params.email}
      designation={params.designation}
      image={params.image}
      id={params.id}
    />
  );
};

export default page;
