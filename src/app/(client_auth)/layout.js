import React from "react";

export const metadata = {
  title: "BFM | Client | Login",
  description: "Loggin in the user",
};

export default function layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
        <div className="absolute inset-0 w-full h-screen overflow-hidden -z-10">
          <img
            src="https://images.unsplash.com/photo-1594289765464-d4d8b4dcf42d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            loading="eager"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </body>
    </html>
  );
}
