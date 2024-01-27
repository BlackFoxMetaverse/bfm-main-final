import Header from "@/components/admin/Modules/Header/Header";
import React from "react";
import SideNavBar from "@/components/admin/Modules/SideNavBar/SideNavBar";

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body className="" suppressHydrationWarning>
        <Header />
        <div className="flex w-full ">
          <div className="max-w-80 w-1/6">
            <SideNavBar />
          </div>
          <div className="w-5/6 bg-[#F3F6F9]">

          {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default layout;
