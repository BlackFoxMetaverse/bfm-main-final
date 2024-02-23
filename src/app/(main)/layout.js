import { Inter } from "next/font/google";
import Footer from "@/components/layouts/Footer/Footer";
import Header from "@/components/layouts/Header/Header";
import ".././globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Black Fox Metaverse",
  description: "BFM Location service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#ecedee",
        }}
        suppressHydrationWarning
        // className="bg-[#ecedee]"
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
