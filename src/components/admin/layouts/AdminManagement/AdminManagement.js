import React from "react";
import UserList from "../UserList/UserList";

const AdminManagement = () => {
  return (
    <div>
      <div className="p-4">
        <p className="text-black  text-2xl not-italic font-bold leading-[normal]">
          Add Admin
        </p>
        <p className="text-[color:var(--Foundation-Grey-grey-300,#6A6A6A)] text-xs not-italic font-light leading-6">
          Enter admin details to grant access. Data is securely stored in the
          admin database.
        </p>
        <div className="flex w-full justify-between items-center gap-10 p-5 px-10 bg-white rounded-2xl">
          <div className="w-full">
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border-gray-600 outline-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter name..."
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter phone number..."
              />
            </div>
          </div>
          <div className="w-full">
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter email..."
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <select
                className="mt-1 p-2 block w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue=""
              >
                <option disabled value="">
                  Select a designation
                </option>
                <option value="HR">HR</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
          </div>
          <div>
            <button className="p-8 rounded-3xl bg-blue-500 text-white">
              + Add Admin
            </button>
          </div>
        </div>
      </div>
      <div className=" p-5">
        <UserList />
      </div>
    </div>
  );
};

export default AdminManagement;
