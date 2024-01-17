"use client";

import Hero from "@/components/layouts/Hero/Hero";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/about")
  // }, [router])

  return (
    <div>
      <Hero />
    </div>
  );
}
