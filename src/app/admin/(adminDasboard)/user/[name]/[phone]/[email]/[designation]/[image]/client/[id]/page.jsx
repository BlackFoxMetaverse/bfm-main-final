import React from "react";
import dynamic from "next/dynamic";

const AdminClientData = dynamic(
  () => import("@/components/admin/layouts/AdminClientData/AdminClientData"),
  { ssr: false }
);

const page = ({ params }) => {
  return <AdminClientData {...params} />;
};

export default page;
