import Main from "@/components/client/layout/settings/Main";
import React from "react";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Main />
    </Suspense>
  );
};

export default page;
