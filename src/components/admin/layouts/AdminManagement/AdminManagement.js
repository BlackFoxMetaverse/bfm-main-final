"use client";
import React, { useState } from "react";
import UserList from "../UserList/UserList";
import axios from "../../../../utils/axios";

const AdminManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    role: 0,
  });
  const [permissions, setPermissions] = useState({
    read: false,
    update: false,
    delete: false,
    showUser: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddAdmin = () => {
    const access = localStorage.getItem("bfm-admin-token");
    const roleAsNumber = parseInt(formData.role);
    console.log("Form Data:", formData);
    console.log("Permissions:", permissions);
    const requestBody = {
      new_phone_number: formData.phoneNumber,
      new_name: formData.name,
      role_as: roleAsNumber,
      privileges: {
        user: {
          is: permissions.showUser,
          has: {
            create: false,
            read: permissions.read,
            update: permissions.update,
            delete: permissions.delete,
          },
        },
      },
    };

    axios
      .post("super_user/super_user", requestBody, {
        headers: {
          token: access,
        },
      })
      .then((response) => {
        console.log("Success:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
                name="name"
                value={formData.name}
                onChange={handleInputChange}
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
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter phone number..."
              />
            </div>
          </div>
          <div className="w-full">
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue=""
              >
                <option disabled value="">
                  Select a Role
                </option>
                <option value="2001">2001</option>
                <option value="2101">2101</option>
                <option value="2151">2151</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500"
                  name="showUser"
                  checked={permissions.showUser}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2 text-gray-700">Show User</span>
              </label>
            </div>

            {permissions.showUser && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Access
                </label>
                <div className="flex gap-5">
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      name="read"
                      checked={permissions.read}
                      onChange={handleCheckboxChange}
                    />
                    <span className="ml-2 text-gray-700">read</span>
                  </label>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      name="update"
                      checked={permissions.update}
                      onChange={handleCheckboxChange}
                    />
                    <span className="ml-2 text-gray-700">Update</span>
                  </label>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      name="delete"
                      checked={permissions.delete}
                      onChange={handleCheckboxChange}
                    />
                    <span className="ml-2 text-gray-700">Delete</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={handleAddAdmin}
              className="p-8 rounded-3xl bg-blue-500 text-white"
            >
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
