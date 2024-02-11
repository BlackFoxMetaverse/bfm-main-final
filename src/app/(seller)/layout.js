import { Inter } from "next/font/google";
import Footer from "@/components/layouts/Footer/Footer";
import Header from "@/components/layouts/Header/Header";
import ".././globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Black Fox Metaverse | Seller",
  description: "BFM Location service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} flex flex-col min-h-screen`}
      >
        <Header isSeller />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
