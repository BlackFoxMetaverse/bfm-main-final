"use client";

import { Inter } from "next/font/google";
import ReactGA from "react-ga4";
import "./globals.css";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import OffLine from "@/components/layouts/Errors/OffLine";
import getCity from "@/utils/getCity";

const inter = Inter({ subsets: ["latin"] });

const helvetica = localFont({
  src: "../../public/fonts/Helvetica Neue LT 65 Medium.ttf",
  // variable: "helvetica"
});

// export const metadata = {
//   title: "Black Fox Metaverse",
//   description: "BFM Location service",
// };

export default function RootLayout({ children }) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    console.log("Initializing Google Analytics...");

    // Initialize Google Analytics
    ReactGA.initialize("G-L4LNX64KCQ");

    // Track the initial pageview
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: document.title,
    });

    console.log("Google Analytics initialized. Tracking initial pageview.");
  }, []);

  useEffect(() => {
    window.addEventListener("online", () => {
      setIsOffline(false);
    });

    window.addEventListener("offline", () => {
      setIsOffline(true);
    });
  }, [isOffline]);

  useEffect(() => {
    getCity()
      .then((data) => sessionStorage.setItem("address", data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning className={helvetica.className}>
        {isOffline ? <OffLine /> : children}
      </body>
    </html>
  );
}
