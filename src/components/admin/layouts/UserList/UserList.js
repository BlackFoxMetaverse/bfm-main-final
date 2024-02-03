"use client";
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
const UserList = ({ data }) => {
  const route = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState("all");
  const [sortBy, setSortBy] = useState("all");

  // Function to handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle user type change
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  // Function to handle sort by changef
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };
  // const [userList, setUserList] = useState(data);
  console.log(data);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data?.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleRoute = (name, id, phone_numbe, email, profession, image) => {
    if (image) {
      route.push(
        `/admin/user/${name}/${phone_numbe}/${email}/${profession}/${image}/seller/${id}`
      );
    } else {
      route.push(
        `/admin/user/${name}/${phone_numbe}/${email}/${profession}/img/seller/${id}`
      );
    }
  };

  // JSX for rendering user profiles
  const renderUserProfiles = () => {
    return currentUsers?.map((user, index) => (
      <tr className=" text-center hover:bg-gray-100 cursor-pointer" key={index}>
        <td className=" py-4">{index + 1}</td>
        <td className=" py-4">{user?.name}</td>
        <td className=" py-4">{user?.userName}</td>
        <td className=" py-4">{user?.email}</td>
        <td className=" py-4">{user?.phone_number}</td>
        <td
          onClick={() =>
            handleRoute(
              user?.userName,
              user?.uid,
              user?.phone_number,
              user?.email,
              user?.profession,
              user?.image
            )
          }
          className="text-green-500"
        >
          Open profile
        </td>
      </tr>
    ));
  };

  // JSX for pagination buttons
  const renderPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data?.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(currentPage + 2, pageNumbers.length);

    if (currentPage <= 3) {
      endPage = Math.min(5, pageNumbers.length);
    }

    if (currentPage >= pageNumbers.length - 2) {
      startPage = Math.max(pageNumbers.length - 4, 1);
    }

    return (
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className=" bg-white border border-gray-300 p-2 rounded"
        >
          <FaAngleLeft className="w-5 h-5 text-gray-400" />
        </button>
        {startPage > 1 && (
          <>
            <button
              className=" bg-white border border-gray-300 p-2 rounded"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            <span>...</span>
          </>
        )}
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={
              currentPage === number
                ? "active bg-white border border-gray-300 p-2 rounded"
                : ""
            }
          >
            {number}
          </button>
        ))}
        {endPage < pageNumbers.length && (
          <>
            <span>...</span>
            <button
              className="bg-white border border-gray-300 p-2 rounded"
              onClick={() => handlePageChange(pageNumbers.length)}
            >
              {pageNumbers.length}
            </button>
          </>
        )}
        <button
          disabled={currentPage === Math.ceil(data?.length / usersPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
          className=" bg-white border border-gray-300 p-2 rounded"
        >
          <FaAngleRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    );
  };

  console.log(data);

  return (
    <div className="w-full space-y-4">
      <div className="flex w-full gap-x-5">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className=" p-2 w-[25%] bg-transparent outline-none shrink-0 border-[color:var(--Foundation-Grey-grey-100,#BABABA)] px-[20px] rounded-[15px] border-[1.5px] border-solid"
        />

        <select
          className="p-2 bg-transparent outline-none shrink-0 border-[color:var(--Foundation-Grey-grey-100,#BABABA)] px-[9px] rounded-[15px] border-[1.5px] border-solid"
          value={userType}
          onChange={handleUserTypeChange}
        >
          <option value="all">All</option>
          <option value="seller">Seller</option>
          <option value="client">Client</option>
        </select>

        <select
          className="p-2 bg-transparent outline-none shrink-0 border-[color:var(--Foundation-Grey-grey-100,#BABABA)] px-[9px]  rounded-[15px] border-[1.5px] border-solid"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="more">More</option>
        </select>
      </div>

      {/* User List Display */}
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="px-4 py-3">Sr</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">User Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-2">Contact Number</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white rounded border">
              {renderUserProfiles()}
            </tbody>
          </table>
        </div>
        <div className=" w-full flex justify-end py-10 px-10">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
};

export default UserList;
