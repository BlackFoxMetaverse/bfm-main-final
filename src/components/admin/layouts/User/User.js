"use client";
import React, { useEffect, useState } from "react";
import UserCount from "../../Modules/UserCount/UserCount";
import UserList from "../../layouts/UserList/UserList";
const User = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("bfm-admin-token");
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://form.blackfoxmetaverse.io/api/admin/getAllUsers",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              admintoken: accessToken,
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
