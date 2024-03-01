"use client";

import Hero from "@/components/client/layout/Hero/Hero";
import { Suspense } from "react";
const page = () => {
  return (
    <Suspense>
      <Hero />;
    </Suspense>
  );
};

export default page;
