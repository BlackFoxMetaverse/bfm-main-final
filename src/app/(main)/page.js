"use client";

import Hero from "@/components/client/layout/Hero/Hero";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  return <Hero />;
}
