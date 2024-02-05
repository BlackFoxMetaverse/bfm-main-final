import React from "react";

export const metadata = {
  title: "BFM | Client | Login",
  description: "Loggin in the user"
}

export default function layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
        <div className="absolute inset-0 w-full h-screen overflow-hidden -z-10">
          <img
            src="https://s3-alpha-sig.figma.com/img/bf6d/e06e/549c5fe8ba7bbd689c4c26ad77bbacdb?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E17PNa7Q5bO4Qsaj1rAxQooBGxrB3pfq23t1xR3mkUqomyrnE5bsonq8rDCk8bj4TURn2eu0Hrad4~Jo6JSEh8cOepBf7njHGwpvuJmIL0kK4QYyI8JPOzBhRhIYaa819t4B8rLUQuC83dZ~eELqnuEB2yL2ofKiy2-BRB0pom4fXYs~tch31RlJTfbLjmUClHVUkOIPsa-yhfEvjl6oXc8QToC3UtyRrolHVdhleKoN3KQ~crcAnmF1437XnOfjYf5UR~8e25DrY5WJxEiWOoVfpR6Z16ih04AFKu7GrR38Kx915X97xgM7Ok0iT7gReYsDEFKsPUe5t8z2AbL5-A__"
            loading="eager"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </body>
    </html>
  );
}
