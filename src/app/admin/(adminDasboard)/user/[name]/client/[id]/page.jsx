// import AdminClientData from "@/components/layouts/AdminClientData/AdminClientData";
import React from "react";
import dynamic from "next/dynamic";

const AdminClientData = dynamic(
  () => import("@/components/layouts/AdminClientData/AdminClientData"),
  { ssr: false }
);

const page = ({ params }) => {
  return <AdminClientData name={params.name} id={params.id} />;
};

export default page;
