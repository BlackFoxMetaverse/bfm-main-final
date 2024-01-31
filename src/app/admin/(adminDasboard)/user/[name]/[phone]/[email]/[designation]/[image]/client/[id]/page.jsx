// import AdminClientData from "@/components/layouts/AdminClientData/AdminClientData";
import React from "react";
import dynamic from "next/dynamic";

const AdminClientData = dynamic(
  () => import("@/components/admin/layouts/AdminClientData/AdminClientData"),
  { ssr: false }
);

const page = ({ params }) => {
  return (
    <AdminClientData
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
