"use client";

import axios from "@/utils/axios";
import React, { useEffect, useState } from "react";
import UserCount from "../../Modules/UserCount/UserCount";
import UserList from "../../layouts/UserList/UserList";
import { useRouter } from "next/navigation";
const SeperateSellerData = () => {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("bfm-admin-token");

    const fetchData = async () => {
      try {
        const response = await axios.get("/super_user/users", {
          headers: {
            token: accessToken,
          },
        });
        console.log(response.data.message);
        if (response.data.message === "token is required !!!") {
          router.replace("/admin/auth/login");
        }
        setUserData(response.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" ">
      <div className="w-full p-5 bg-gray-200 ">
        <p className="flex text-[#7F63F4] text-xl not-italic font-semibold ">
          BFM Management Dashboard
        </p>
      </div>
      <div className="flex gap-4 px-8 py-4 w-full">
        <UserCount
          title="total user"
          number={userData?.length}
          percent={(userData?.length * 100) / userData?.length}
          day="Today"
          color="#FE5722"
        />

        {/* <UserCount
          title="total client"
          number="0"
          percent="0"
          day="Month"
          color="#00AFA5"
        /> */}
        <UserCount
          title="total sellers"
          number={userData?.length}
          percent={(userData?.length * 100) / userData?.length}
          day="Today"
          color="#794DF6"
        />
        <UserCount
          title="daily sales of tokens"
          number="0"
          percent="0"
          color="#BC01CD"
        />
      </div>
      <div className=" p-8">
        <UserList data={userData} />
      </div>
    </div>
  );
};

export default SeperateSellerData;
