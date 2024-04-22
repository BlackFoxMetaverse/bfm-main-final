"use client";
import Header from "@/components/admin/Modules/Header/Header";
import React, { useEffect, useState } from "react";
import SideNavBar from "@/components/admin/Modules/SideNavBar/SideNavBar";

const layout = ({ children }) => {
  const [isSellerPage, setIsSellerPage] = useState(false);
  useEffect(() => {
    if (window.location.pathname.includes("seller")) {
      setIsSellerPage(true);
    }
  }, []);

  return (
    <html lang="en">
      <body className="" suppressHydrationWarning>
        {!isSellerPage && <Header />}
        <div className="flex w-full ">
          {/* Conditionally render SideNavBar based on the URL */}
          {!isSellerPage && (
            <div className="max-w-80 w-1/6">
              <SideNavBar />
            </div>
          )}
          <div className={isSellerPage ? "w-full" : "w-5/6 bg-[#F3F6F9]"}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default layout;
