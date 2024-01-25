import Image from "next/image";
import background from "../../../assets/backg.png";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="fixed inset-0 -z-10 flex justify-center items-center overflow-hidden">
          <Image
            src={background}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </body>
    </html>
  );
}
