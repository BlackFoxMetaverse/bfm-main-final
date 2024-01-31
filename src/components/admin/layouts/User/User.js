"use client";
import React, { useEffect, useState } from "react";
import UserCount from "../../Modules/UserCount/UserCount";
import UserList from "../../layouts/UserList/UserList";
const User = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://form.blackfoxmetaverse.io/api/admin/getAllUsers",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              admintoken:
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NjI5NzU5NmJiNWQ4N2NjOTc2Y2E2YmY0Mzc3NGE3YWE5OTMxMjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmZtLWxvY2F0aW9uIiwiYXVkIjoiYmZtLWxvY2F0aW9uIiwiYXV0aF90aW1lIjoxNzA2NzA1MDM4LCJ1c2VyX2lkIjoiSzN0NWhKTUNZR1Y3dEhuODFYQUo3bzJxaWVCMiIsInN1YiI6IkszdDVoSk1DWUdWN3RIbjgxWEFKN28ycWllQjIiLCJpYXQiOjE3MDY3MDUwMzgsImV4cCI6MTcwNjcwODYzOCwicGhvbmVfbnVtYmVyIjoiKzkxODcwOTM2MDU0MyIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxODcwOTM2MDU0MyJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.F0GZe3gzq4-hvZebpGd3ZOjX7mkgpg6lVfieeOkY0fyo1X5IItRqyulfxOtfgjmHMEl82dzIzuzbDhmpWxyQHrsvxc5dTCExRAHEaSFoqf32ehSSgZYQnM7oK4-vjlOePyHrOJhsQSYCgL-0ZFOh1MDo06L1AKqY8IkoUIJSIykn9k3mfMnofNARkFKRUUCPNg_0nDlEuUCC2DqCt28l5m6voMqW7aRfd6PLDvrwwJF4NmAExZLYJy4iY9CYyOAZ9qgqyHh4v5j08zHepfJeOkdEiR-vVUWiw8BqKzK5rVrOGVi3N79T9nLo8luOQykBFZ7CTbRMBV_EPzZBxUdEbQ",
            },
          }
        );
        const data = await response.json();
        console.log(data.users);
        setUserData(data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(userData?.length);
  return (
    <div className=" ">
      <div className="w-full p-5 bg-gray-200 ">
        <p className="flex text-[#7F63F4] text-xl not-italic font-semibold ">
          BFM Management Dashboard
        </p>
      </div>
      <div className="flex gap-4 px-8 py-4 ">
        <UserCount
          title="total user"
          number={userData?.length}
          percent="100%"
          day="Today"
          color="#FE5722"
        />

        <UserCount
          title="total client"
          number="0"
          percent="0%"
          day="Month"
          color="#00AFA5"
        />
        <UserCount
          title="total sellers"
          number="2"
          percent="100%"
          day="Today"
          color="#794DF6"
        />
        <UserCount
          title="daily sales of tokens"
          number="0"
          percent="0%"
          color="#BC01CD"
        />
      </div>
      <div className=" p-8">
        <UserList data={userData} />
      </div>
    </div>
  );
};

export default User;
