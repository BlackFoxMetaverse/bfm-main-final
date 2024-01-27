import React from "react";
import UserCount from "../../Modules/UserCount/UserCount";
import UserList from "../../layouts/UserList/UserList";
const User = () => {
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
          number="50,000"
          percent="4.6%"
          day="Today"
          color="#FE5722"
        />

        <UserCount
          title="total cient"
          number="20,000"
          percent="2.6%"
          day="Month"
          color="#00AFA5"
        />
        <UserCount
          title="total sellers"
          number="30,000"
          percent="10%"
          day="Today"
          color="#794DF6"
        />
        <UserCount
          title="daily sales of tokens"
          number="7,932"
          percent="4.6%"
          color="#BC01CD"
        />
      </div>
      <div className=" p-8">
        <UserList />
      </div>
    </div>
  );
};

export default User;
